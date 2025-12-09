const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  // Custom resolver for react-native-reanimated-compat
  const originalResolveRequest = resolver.resolveRequest;
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    resolveRequest: (context, realModuleName, platform, moduleName) => {
      if (realModuleName === 'react-native-reanimated-compat') {
        return {
          filePath: path.resolve(__dirname, 'src/utils/reanimatedCompat.ts'),
          type: 'sourceFile',
        };
      }
      // Fall back to default resolver
      if (originalResolveRequest) {
        return originalResolveRequest(context, realModuleName, platform, moduleName);
      }
      // Use Metro's default resolution
      return context.resolveRequest(context, realModuleName, platform, moduleName);
    },
  };

  return config;
})();
