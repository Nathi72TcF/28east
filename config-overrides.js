module.exports = function override(config, env) {
    // Disable source map warnings
    config.module.rules = config.module.rules.map(rule => {
      if (rule.use) {
        rule.use = rule.use.map(loader => {
          if (loader.loader === 'source-map-loader') {
            loader.options = {
              ...loader.options,
              silent: true,
            };
          }
          return loader;
        });
      }
      return rule;
    });
    return config;
  };
  