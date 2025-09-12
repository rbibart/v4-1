const path = require('path');

// Override cache directory to prevent permission issues
process.env.GATSBY_CACHE_FOLDER_PATH = '/tmp/gatsby-cache';
process.env.GATSBY_DISABLE_CACHING = 'true';

// Disable all cache-related operations
const originalMkdirSync = require('fs').mkdirSync;
const originalMkdir = require('fs').mkdir;

// Intercept cache directory creation attempts
require('fs').mkdirSync = function(dirPath, options) {
  if (dirPath && dirPath.includes('/opt/build/cache')) {
    console.log(`Prevented cache directory creation: ${dirPath}`);
    return;
  }
  return originalMkdirSync.call(this, dirPath, options);
};

require('fs').mkdir = function(dirPath, options, callback) {
  if (dirPath && dirPath.includes('/opt/build/cache')) {
    console.log(`Prevented cache directory creation: ${dirPath}`);
    if (callback) callback();
    return;
  }
  return originalMkdir.call(this, dirPath, options, callback);
};

// Load original gatsby-config
const originalConfig = require('./gatsby-config.js');

module.exports = {
  ...originalConfig,
  flags: {
    ...originalConfig.flags,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PRESERVE_WEBPACK_CACHE: false,
    FAST_DEV: false,
    PRESERVE_TOUCH_NODE: false,
    DEV_SSR: false,
  },
  // Force disable all caching
  cache: false,
};