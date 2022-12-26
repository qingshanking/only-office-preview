const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 8001,
    //https: true,
    // proxy: {
    //   "/api": {
    //     // 本地服务接口地址
    //     target: "http://localhost:1801",
    //     ws: true,
    //     pathRewrite: {
    //       "^/api": "/",
    //     },
    //   },
    // },
  }
})
