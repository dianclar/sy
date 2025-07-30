module.exports = {
  devServer: {
    proxy: {
      '/api': { // 代理前缀
        target: 'http://uat.banlu.xuexiluxian.cn', // 目标服务器
        changeOrigin: true, // 允许跨域
      }
    }
  }
}