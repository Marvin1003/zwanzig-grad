const path = require('path');
const withOffline = require('next-offline');
const withManifest = require('next-manifest');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer(withManifest(withOffline({
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  manifest: {
    icons: {
      src: 'static/images/Logo.png',
      cache: true
    }
  },
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp|js|json|ttf|woff)$/,
        handler: 'cacheFirst'
      }
    ]
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
      const ImageminPlugin = require('imagemin-webpack-plugin').default
      const CleanWebpackPlugin = require('clean-webpack-plugin');
      config.plugins.push(
        new CleanWebpackPlugin('.next'),
        new ImageminPlugin({
          pngquant: {
            quality: '95-100'
          }
        })
      )
    }
    return config;
  }
})));
