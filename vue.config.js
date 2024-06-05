const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
});
const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  },
};
module.exports = {
  devServer: {
    host: '192.168.1.117',
    port: 8081,
    hot: true,
    client: {
      webSocketURL: 'ws://192.168.1.117:8081/ws',
    },
  },
};
