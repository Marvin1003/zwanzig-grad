const path = require('path');
const withOffline = require('next-offline');
const withManifest = require('next-manifest');
// const getRoutes = require('./routes');
// const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

// exportPathMap: getRoutes,
// useFileSystemPublicRoutes: false,
// withBundleAnalyzer({
  // analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  // analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  
module.exports = withManifest(withOffline({
  manifest: {
    icons: {
      src: 'static/images/Logo.png',
      cache: true
    }
  },
  webpack(config, { dev }) {
    config.module.rules.push(
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: 'file-loader'
      },
      {
        test: /\.(wwf|wwf2|otf|ttf)$/,
        use: 'file-loader'
      }
    );
    if(!dev) {
      const CleanWebpackPlugin = require('clean-webpack-plugin');
      config.plugins.push(
        new CleanWebpackPlugin('.next'),
      )
    }
    return config;
  }
}));