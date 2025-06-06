const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const path = require('path');

module.exports = defineConfig({
  chromeWebSecurity: false,

  reporter: 'mochawesome', // adiciona o mochawesome como reporter
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report', // pasta dos relatórios
    overwrite: false,    // não sobrescrever relatórios anteriores
    html: true,         // desabilita relatório html direto (geramos depois)
    json: true,          // gera arquivos json (para merge)
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:5500',
    testIsolation: false,

    setupNodeEvents(on, config) {
      // Habilita suporte a aliases com Webpack
      on('file:preprocessor', webpack({
        webpackOptions: {
          resolve: {
            alias: {
              '@pages': path.resolve(__dirname, 'cypress/support/pages'),
              '@support': path.resolve(__dirname, 'cypress/support'),
              '@fixtures': path.resolve(__dirname, 'cypress/fixtures'),
            },
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
              },
            ],
          },
        },
      }));

      // Logs após a execução dos testes
      on('after:run', (results) => {
        console.log('⚙️ Todos os testes foram executados.');
        console.log(`✅ Passaram: ${results.totalPassed}`);
        console.log(`❌ Falharam: ${results.totalFailed}`);
      });

      on('task', {
        log(message) {
          console.log('📢 Log do Cypress:', message);
          return null;
        },
      });

      return config;
    },

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/_*.cy.{js,ts}'],
  },

  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1280,
  viewportHeight: 800,
});
