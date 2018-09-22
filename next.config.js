const withOffline = require("next-offline");
const withManifest = require("next-manifest");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer(
  withManifest(
    withOffline({
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static"
        },
        browser: {
          analyzerMode: "static"
        }
      },
      manifest: {
        icons: {
          // src: 'static/images/logo/logo-256x256.png',
          cache: true
        }
      },
      workboxOpts: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|js|json|ttf|woff)$/,
            handler: "cacheFirst"
          }
        ]
      },
      webpack(config, { dev }) {
        if (!dev) {
          const CleanWebpackPlugin = require("clean-webpack-plugin");

          config.module.rules.push({
            test: /\.svg$/,
            loaders: ["file-loader", "svgo-loader"]
          });

          config.plugins.push(new CleanWebpackPlugin(".next"));
        }
        return config;
      }
    })
  )
);
