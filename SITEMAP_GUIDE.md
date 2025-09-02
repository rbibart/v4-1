# Sitemap Configuration Guide

## Overview
This website now includes a fully functional sitemap that helps Google and other search engines index your site effectively.

## What's Included

### Sitemap Files
- **Main sitemap index**: `/sitemap/sitemap-index.xml`
- **Content sitemap**: `/sitemap/sitemap-0.xml`
- **robots.txt**: Points to the correct sitemap location

### Pages Included in Sitemap
- Homepage (/)
- About/Story page (/story/)
- Archive page (/archive/)
- Blog section (/pensieve/)
- Individual blog posts
- Tag pages and tag listings
- All content pages

### Configuration Features
- ✅ Properly configured `gatsby-plugin-sitemap`
- ✅ Correctly configured `gatsby-plugin-robots-txt`
- ✅ Excluded unnecessary pages (404, offline fallbacks)
- ✅ All URLs use the correct domain: `https://razvanbibart.com`
- ✅ Includes proper XML namespaces for search engines

## How to Submit to Google

### 1. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your website property if not already added
3. Navigate to "Sitemaps" in the left sidebar
4. Add a new sitemap with URL: `sitemap/sitemap-index.xml`
5. Click "Submit"

### 2. Verify Sitemap Access
- Sitemap Index: `https://razvanbibart.com/sitemap/sitemap-index.xml`
- Main Sitemap: `https://razvanbibart.com/sitemap/sitemap-0.xml`
- Robots.txt: `https://razvanbibart.com/robots.txt`

## Automatic Updates
The sitemap is automatically regenerated every time you build your site with `yarn build`. No manual maintenance required!

## Additional SEO Benefits
- **robots.txt**: Properly configured to allow all crawlers and point to sitemap
- **Change frequency**: Set to "daily" to encourage regular crawling
- **Priority**: All pages have appropriate priority (0.7)
- **Clean URLs**: No duplicate or unnecessary pages included

## Build Commands
```bash
# Clean and rebuild (recommended for production)
yarn clean && yarn build

# Quick rebuild
yarn build

# Serve locally to test
yarn serve
```

The sitemap will be automatically included in your production builds and deployments.