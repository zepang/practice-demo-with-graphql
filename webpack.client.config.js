const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.[id].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'static/[name].[hash:7].[ext]'
            }
          }
        }
      }
    ]
  },
  devServer: {
    port: 3000
  },
  plugins: [
    // new FriendlyErrorsWebpackPlugin({
    //   clearConsole: true,
    //   compilationSuccessInfo: {
    //     messages: ['You application is running here http://localhost:3000']
    //   }
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
