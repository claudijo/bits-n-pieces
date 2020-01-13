module.exports = function (api) {
  api.cache(true);

  const presets = [
    // Override in `.babelrc` in sub folder if needed.
    // Browserslist’s default browsers (> 0.5%, last 2 versions, Firefox ESR,
    // not dead).
    ['@babel/env', { targets: 'defaults' }],
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    'add-module-exports',
  ];

  return {
    presets,
    plugins,

    // Together with cli flag `--root-mode upward`, the following is required to
    // pick up `.babelrc` files in each individual package sub folder
    babelrcRoots: [
      '.',
      'packages/*',
    ],
  };
};
