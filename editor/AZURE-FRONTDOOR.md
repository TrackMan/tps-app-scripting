# Azure Front Door Cache Configuration

This application is optimized for Azure Front Door with proper cache-busting and CDN configuration.

## Cache Strategy

### Immutable Assets (Long Cache - 1 year)
- **JavaScript**: `/assets/*-[hash].js` - Cached for 1 year with `immutable` flag
- **CSS**: `/assets/*-[hash].css` - Cached for 1 year with `immutable` flag  
- **Images**: `/assets/images/*-[hash].*` - Cached for 1 year with `immutable` flag

### Semi-Static Assets (Medium Cache - 30 days)
- **Images without hash**: `*.png, *.jpg, *.svg` etc. - Cached for 30 days

### Dynamic Content (No Cache)
- **HTML**: `*.html` - Never cached, always fresh from origin
- **Service Worker**: Always fresh

## Build Process

Every build generates:
- Unique filenames with content-based hashes
- Source maps for debugging
- Optimized bundles for modern browsers (ES2022)

## Azure Front Door Benefits

1. **Automatic Cache Invalidation**: New builds get new filenames, so no manual cache purging
2. **Global CDN**: Assets served from edge locations worldwide
3. **Compression**: Gzip/Brotli compression for smaller payloads
4. **HTTP/2**: Faster loading with multiplexed connections

## Build Version Indicator

The app includes a build version indicator in the top-right corner showing:
- Version number
- Git commit hash (7 chars)
- Build timestamp

This helps verify which version is currently deployed and when cache updates take effect.