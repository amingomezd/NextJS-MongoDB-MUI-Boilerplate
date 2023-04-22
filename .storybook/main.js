const path = require('path');
module.exports = {
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-swc',
    'storybook-addon-next-router'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../pages/**/*.stories.js', '../components/**/*.stories.js'],
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../');
    return config;
  },
  docs: {
    autodocs: false
  }
};
