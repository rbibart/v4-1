#!/bin/bash

# Install yarn if not available
if ! command -v yarn &> /dev/null; then
    npm install -g yarn
fi

# Set proper npm configuration for Cloudflare Pages
npm config set strict-ssl false
npm config set timeout 300000
npm config set registry https://registry.npmjs.org/

# Alternative installation approach for Sharp
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_FORCE_GLOBAL_LIBVIPS=false
export SHARP_VENDOR_PATH=/tmp/vendor

# Install dependencies with timeout handling
timeout 600 yarn install --frozen-lockfile --network-timeout 300000 || {
    echo "Yarn install failed, trying npm..."
    npm install --timeout=300000 --maxsockets=1
}

# Run the build
npm run build:cf