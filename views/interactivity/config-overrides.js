// config-overrides.js
module.exports = function override(config) {
  // Modify the output to include everything in a single bundle
  config.output.filename = 'static/js/app.js'; // Main bundle filename

  // Disable code splitting
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
      vendors: false,
    },
  };
  config.optimization.runtimeChunk = false; // Prevent creating a separate runtime chunk

  const cssPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );
  if (cssPlugin) {
    cssPlugin.options.filename = 'static/css/app.css'; // CSS bundle filename
  }

  return config;
};
