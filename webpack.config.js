const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'cypress/support/pages'),
      '@commands': path.resolve(__dirname, 'cypress/support/commands'),
    //   '@utils': path.resolve(__dirname, 'cypress/support/utils'),
      '@fixtures': path.resolve(__dirname, 'cypress/fixtures'),
    },
    extensions: ['.js', '.json']
  }
};