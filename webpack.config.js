const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      scriptLoading: 'module',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[fullhash].css',
    }),
    isDev ? undefined : new WorkboxPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
        {
          urlPattern: /^\/[^\/]+\.html$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html',
            expiration: {
              maxEntries: 10,
            },
          },
        },
        {
          urlPattern: /^https:\/\/storage\.googleapis\.com\/tfhub-tfjs-modules\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'tfjs',
            expiration: {
              maxEntries: 100,
            },
          },
        },
        {
          urlPattern: /^https:\/\/tfhub\.dev\/tensorflow\/tfjs-model\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'tfjs-302',
            expiration: {
              maxEntries: 100,
            },
          },
        }
      ],
    }),
  ].filter(v => v),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
