module.exports = {
  baseUrl: '',
  devServer: {
    proxy: {
      '/host': {
        target: 'http://172.100.113.34:2990',
        changeOrigin: true,
        pathRewrite: { '^/host': '' }
      }
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  pages: {
    login: {
      entry: 'src/pages/login/main.js',
      title: '登录'
    },
    index: {
      entry: 'src/main.js',
      title: '出行福利管理'
    },
    org: {
      entry: 'src/pages/org/main.js',
      title: '服务商管理'
    },
    welfare: {
      entry: 'src/pages/welfare/main.js',
      title: '出行福利管理'
    },
    trade: {
      entry: 'src/pages/trade/main.js',
      title: '交易管理'
    },
    oper: {
      entry: 'src/pages/oper/main.js',
      title: '运营管理'
    }
  }
}
