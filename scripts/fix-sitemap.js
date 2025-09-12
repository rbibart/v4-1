const fs = require('fs');
const path = require('path');

// Paths
const sitemapDir = path.join(__dirname, '..', 'public', 'sitemap.xml');
const sitemapFile = path.join(sitemapDir, 'sitemap-0.xml');
const targetFile = path.join(__dirname, '..', 'public', 'sitemap-fixed.xml');

try {
  // Check if the sitemap directory exists
  if (fs.existsSync(sitemapDir) && fs.lstatSync(sitemapDir).isDirectory()) {
    
    // Check if sitemap-0.xml exists
    if (fs.existsSync(sitemapFile)) {
      
      // Read the sitemap content
      const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
      
      // Write to the root as sitemap.xml (remove directory first)
      fs.rmSync(sitemapDir, { recursive: true, force: true });
      fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemapContent);
      
      console.log('✅ Sitemap moved from directory to file: /public/sitemap.xml');
    } else {
      console.log('❌ sitemap-0.xml not found in directory');
    }
  } else if (fs.existsSync(path.join(__dirname, '..', 'public', 'sitemap.xml'))) {
    console.log('✅ Sitemap already exists as file');
  } else {
    console.log('❌ No sitemap found');
  }
} catch (error) {
  console.error('❌ Error fixing sitemap:', error.message);
}