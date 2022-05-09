const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
},
};

module.exports = (env) => ({
  mode: env.development ? 'development' : 'production',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]bundle.js',
  },
  module: {
    rules: [
    //   // CSS, PostCSS, Sass
    //   {
    //     test: /\.(scss|css)$/,
    //     use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    // },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
    },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      title: 'webpack KeyBoard',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CleanWebpackPlugin({ }),
  ],
  devtool: 'eval',
  ...devServer(env.development)
});