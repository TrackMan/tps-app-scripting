# SSE Azure Front Door Fix

**Issue:** Events stored in Table Storage immediately but take minutes to appear in UI even after SSE fix deployed.

## Root Cause

Azure Front Door (or Azure App Service ARR proxy) is still buffering SSE responses despite the `X-Accel-Buffering: no` header.

## Diagnosis Steps

### 1. Test SSE Connection Directly

Use the diagnostic tool:
```
https://app-scripting-editor.trackmangolfdev.com/sse-test.html
```

**Steps:**
1. Enter a webhook path (e.g., `test-debug`)
2. Click "Connect SSE"
3. Click "Send Test Event"
4. Check if event appears immediately in the log

**Expected:** Event appears within 1 second
**Actual:** Event delayed by minutes → Front Door buffering issue

### 2. Check Browser Network Tab

**F12 → Network → Filter by `stream`:**
- Look for `/api/webhook/{path}/stream` request
- Check if connection stays open
- Check response headers for `X-Accel-Buffering: no`
- Check if data arrives in chunks or buffered

### 3. Direct App Service Test (Bypass Front Door)

Get App Service direct URL:
```bash
az webapp show --name tps-app-scripting-editor --resource-group tps-app-scripting-rg --query defaultHostName -o tsv
```

Test SSE directly:
```bash
# Replace {app-service-url} with output from above
curl -N https://{app-service-url}/api/webhook/test/stream
```

**If this works immediately:** Front Door is the problem
**If this is also slow:** App Service proxy issue

## Solutions

### Solution 1: Azure Front Door Rule for SSE (Recommended)

Azure Front Door needs a routing rule to disable buffering for SSE endpoints.

**Azure Portal:**
1. Go to Front Door profile
2. **Endpoint manager** → Select your endpoint
3. **Origin groups** → Configure origin
4. **Rules** → Add rule:
   ```
   Name: SSE-No-Buffer
   Conditions:
     - URL path: Matches → /api/webhook/*/stream
   Actions:
     - Route configuration → Caching → Disabled
     - Response headers → Add header:
       X-Accel-Buffering: no
   ```

**Azure CLI:**
```bash
# Get Front Door profile name
az afd profile list --resource-group tps-app-scripting-rg

# Add rule to disable caching for SSE
az afd rule create \
  --resource-group tps-app-scripting-rg \
  --profile-name <your-front-door-profile> \
  --rule-set-name DefaultRuleSet \
  --rule-name SSENoBuffer \
  --order 1 \
  --match-variable UrlPath \
  --operator Contains \
  --match-values "/stream" \
  --action-name DisableCaching \
  --enable-caching false
```

### Solution 2: App Service Configuration

Ensure App Service is not buffering either:

```bash
az webapp config set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --http20-enabled true \
  --web-sockets-enabled true
```

Add Application Setting:
```bash
az webapp config appsettings set \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --settings \
    ASPNETCORE_HTTP2_ENABLE_GRACEFULSHUTDOWN=true \
    WEBSITE_DISABLE_OVERLAPPED_RECYCLING=true
```

### Solution 3: Alternative - WebSockets Fallback

If SSE continues to have issues, implement WebSocket fallback:

**server/src/webhook.ts:**
```typescript
import { WebSocketServer } from 'ws';

// Add WebSocket server alongside SSE
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  if (request.url?.startsWith('/api/webhook/') && request.url?.endsWith('/stream-ws')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      const pathMatch = request.url.match(/\/api\/webhook\/([^/]+)\/stream-ws/);
      if (!pathMatch) return ws.close();
      
      const userPath = pathMatch[1];
      // Store WS client similar to SSE
      // Broadcast events via ws.send()
    });
  }
});
```

**Frontend (WebhookInspector.tsx):**
```typescript
// Try WebSocket if EventSource fails repeatedly
const ws = new WebSocket(`wss://${window.location.host}/api/webhook/${userPath}/stream-ws`);
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle same as SSE
};
```

### Solution 4: Polling Fallback (Last Resort)

If real-time updates continue to fail, add polling:

```typescript
// Poll every 5 seconds when SSE disconnected
React.useEffect(() => {
  if (connected) return; // Don't poll if SSE connected
  
  const interval = setInterval(async () => {
    const r = await fetch(`/api/webhook/${userPath}/events?limit=10`);
    const j = await r.json();
    // Merge new events into existing
  }, 5000);
  
  return () => clearInterval(interval);
}, [connected, userPath]);
```

## Verification

After implementing Solution 1 or 2:

1. **Wait for Front Door rule propagation** (~15 minutes)
2. **Test with diagnostic tool:**
   ```
   https://app-scripting-editor.trackmangolfdev.com/sse-test.html
   ```
3. **Send test event and verify it appears within 1 second**
4. **Check browser console for SSE logs**

## Current Status

✅ Backend SSE fixes deployed (X-Accel-Buffering, keepalive, flush)
✅ Table Storage working (events appear immediately)
❌ Front Door/Proxy still buffering SSE responses
❌ Need to configure Front Door routing rule

## Next Steps

1. **Identify Front Door profile** - Check Azure Portal or ask DevOps
2. **Add SSE routing rule** - Disable caching for `/stream` endpoints
3. **Test with diagnostic tool** - Verify events appear immediately
4. **If still fails** - Consider WebSocket fallback

## Additional Debugging

### Check App Service Logs

```bash
az webapp log tail \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg
```

Look for:
```
SSE connected: path=<path> remote=<ip> clients=1
[webhook] minimal SSE sent path=<path> eventId=<id> elapsedMs=5
```

If you see these logs but UI doesn't update → **Definitely Front Door buffering**

### Check Front Door Logs

```bash
az monitor diagnostic-settings list \
  --resource /subscriptions/{sub}/resourceGroups/tps-app-scripting-rg/providers/Microsoft.Cdn/profiles/{profile}
```

Look for buffering or caching behavior on `/stream` URLs.

## References

- [Azure Front Door routing rules](https://docs.microsoft.com/en-us/azure/frontdoor/front-door-rules-engine)
- [Server-Sent Events spec](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [Azure App Service WebSocket support](https://docs.microsoft.com/en-us/azure/app-service/configure-common)
