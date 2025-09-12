const fs = require('fs');
const path = require('path');

console.log('📦 Running Cloudflare Pages post-build optimizations...');

const publicDir = path.join(__dirname, '..', 'public');

try {
  // Ensure _headers file exists in public directory
  const headersSource = path.join(publicDir, '_headers');
  if (fs.existsSync(headersSource)) {
    console.log('✅ _headers file found in public directory');
  } else {
    console.log('❌ _headers file missing');
  }

  // Verify sitemap.xml is a file (not directory)
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const stats = fs.lstatSync(sitemapPath);
    if (stats.isFile()) {
      console.log('✅ sitemap.xml is correctly a file');
    } else {
      console.log('❌ sitemap.xml is still a directory');
    }
  }

  // Check robots.txt
  const robotsPath = path.join(publicDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    console.log('✅ robots.txt found');
  }

  // Create manifest for Cloudflare
  const manifest = {
    generated: new Date().toISOString(),
    sitemap: '/sitemap.xml',
    robots: '/robots.txt',
    pages: fs.readdirSync(publicDir)
      .filter(file => file.endsWith('.html') || fs.lstatSync(path.join(publicDir, file)).isDirectory())
      .length
  };

  fs.writeFileSync(
    path.join(publicDir, '_manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('✅ Post-build optimizations completed successfully');
  console.log(`📄 Found ${manifest.pages} pages/directories`);

} catch (error) {
  console.error('❌ Post-build optimization failed:', error.message);
  // Don't fail the build, just warn
  process.exit(0);
}