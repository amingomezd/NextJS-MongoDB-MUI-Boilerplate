const path = require("path");

module.exports = {
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  stories: ['../pages/**/*.stories.js', '../components/**/*.stories.js'],
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../');
    return config;
  },
};