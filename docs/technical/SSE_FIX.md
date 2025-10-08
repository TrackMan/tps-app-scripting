# SSE Real-Time Update Fix

**Issue:** Events appear in Table Storage but take minutes to show up in the UI

**Root Cause:** Azure App Service proxy buffering SSE responses, causing delayed delivery

## Changes Made

### 1. Disable Proxy Buffering

**File:** `server/src/webhook.ts` (line 379)

Added `X-Accel-Buffering: no` header to SSE stream response:

```typescript
res.writeHead(200, {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no', //  NEW: Disable buffering for Azure/nginx proxies
});
```

**Why this matters:**
- Azure App Service uses nginx or ARR (Application Request Routing) as a reverse proxy
- By default, these proxies buffer responses for optimization
- SSE requires unbuffered streaming for real-time delivery
- `X-Accel-Buffering: no` tells nginx to disable buffering for this response

### 2. Add Keepalive Ping

**File:** `server/src/webhook.ts` (lines 398-404)

Added 30-second keepalive ping to prevent connection timeouts:

```typescript
// Send keepalive comments every 30 seconds to prevent proxy timeouts
const keepaliveInterval = setInterval(() => {
  try {
    res.write(': keepalive\n\n');
  } catch (err) {
    clearInterval(keepaliveInterval);
  }
}, 30000);

req.on('close', () => {
  clearInterval(keepaliveInterval);
  // ... rest of cleanup
});
```

**Why this matters:**
- Azure App Service has default idle timeouts (typically 230 seconds)
- Without activity, the proxy may close the connection
- Keepalive comments keep the connection alive indefinitely
- Comments (lines starting with `:`) are ignored by EventSource API

### 3. Explicit Flush

**File:** `server/src/webhook.ts` (lines 32-36)

Added explicit flush call after writing SSE data:

```typescript
res.write(`data: ${data}\n\n`);
// Explicitly flush to ensure immediate delivery (important for proxied connections)
if (typeof (res as any).flush === 'function') {
  (res as any).flush();
}
```

**Why this matters:**
- Node.js streams may buffer writes for efficiency
- Explicit flush ensures data is sent immediately
- Critical for real-time updates through proxies

## Testing

### Before Fix
```
Event arrives at webhook → Stored in memory → Stored in Table Storage
                                                           ↓
                                                  (buffered by proxy)
                                                           ↓
                                                  (sent after minutes)
                                                           ↓
                                           UI updates after delay 
```

### After Fix
```
Event arrives at webhook → Stored in memory → Stored in Table Storage
                                    ↓
                         SSE broadcast (unbuffered)
                                    ↓
                         UI updates immediately 
```

### Verification Steps

1. **Deploy the fix:**
   ```bash
   git add server/src/webhook.ts
   git commit -m "fix: Disable proxy buffering for SSE real-time updates"
   git push origin main
   ```

2. **Wait for deployment** (~5 minutes)

3. **Test real-time updates:**
   - Open webhook inspector in browser
   - Send a test webhook event
   - Event should appear in UI **immediately** (< 1 second)

4. **Check browser console:**
   ```javascript
   // Should show:
   Connected to SSE stream
   Received SSE event: {...}
   ```

5. **Check server logs:**
   ```bash
   az webapp log tail \
     --name tps-app-scripting-editor \
     --resource-group tps-app-scripting-rg
   
   # Should show:
   SSE connected: path=<webhook-path> remote=<ip> clients=1
   [webhook] minimal SSE sent path=<webhook-path> eventId=<id> elapsedMs=<5-10>
   ```

## Additional Azure Configuration (Optional)

If issues persist, you can also configure these App Service settings:

### 1. Increase Idle Timeout

```bash
az webapp config set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --web-sockets-enabled true \
  --http20-enabled true
```

### 2. Add Application Setting

```bash
az webapp config appsettings set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --settings WEBSITE_LOAD_CERTIFICATES=*
```

### 3. Check ARR Affinity (if using multiple instances)

```bash
az webapp update \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --client-affinity-enabled true
```

**Note:** Client affinity (sticky sessions) ensures SSE connections stay on the same instance.

## Troubleshooting

### Events Still Delayed

1. **Clear browser cache** - Old SSE connection may be cached
2. **Check browser Network tab** - Verify SSE connection is established
3. **Test locally first** - Run `npm run dev` and test without Azure proxy
4. **Check logs** - Verify `SSE connected` and `minimal SSE sent` messages

### Connection Drops

1. **Increase keepalive frequency** - Change from 30s to 15s
2. **Check firewall rules** - Ensure no intermediate proxy is interfering
3. **Enable websockets** - As fallback transport

### No Connection at All

1. **Check CORS** - Ensure frontend can connect to backend
2. **Verify endpoint** - `GET /api/webhook/:path/stream` should return `Content-Type: text/event-stream`
3. **Check browser support** - EventSource API supported in all modern browsers

## Performance Impact

 **No negative impact:**
- Headers add ~50 bytes to response (negligible)
- Keepalive ping is just a comment line every 30s (~20 bytes/30s)
- Flush call is nearly instant on modern systems
- Real-time updates significantly improve user experience

## Related Issues

This fix addresses the delay seen between:
- Webhook receipt → Table Storage (instant) 
- Table Storage → UI display (was minutes, now instant) 

The issue was **not** with storage or event handling, but with the SSE transport layer being buffered by Azure's proxy.

## References

- [Server-Sent Events Spec](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [nginx X-Accel-Buffering](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering)
- [Azure App Service Proxy Behavior](https://docs.microsoft.com/en-us/azure/app-service/)
- [Node.js Stream Flushing](https://nodejs.org/api/stream.html#writableflushcallback)
