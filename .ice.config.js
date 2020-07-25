const path = require('path')

module.exports = {
  entry: 'public/index.js',
  devServer: {
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: '/index.html',
      }],
    },
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  alias: {
    '@utils': path.resolve(process.cwd(), 'src/utils/'), // 配置文件路径别名
    '@components': path.resolve(process.cwd(), 'src/components/'),
    '@img': path.resolve(process.cwd(), 'public/images/'),
  },
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@alife/dpl-hisblue',
    }],
  ],
  chainWebpack: (config) => {
    config.output.crossOriginLoading('anonymous') // 模块加载跨域配置
  },
}
