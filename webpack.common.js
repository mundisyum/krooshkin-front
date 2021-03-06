const Path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
  },
  devServer: {
    writeToDisk: true,
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [{
        test: /\.(woff2|png|svg|jpg|jpeg|gif)$/,
        loader: "file-loader",
        options: {
          esModule: false
        }
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          rootRelative: Path.resolve(__dirname, 'src/hbs') + '/',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          'style-loader',
          // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime'
            ],
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/',
        to: './assets'
      },
    ]),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/hbs/index.hbs'
    }),
    new HtmlWebpackPlugin({
      filename: './about/index.html',
      template: './src/hbs/about.hbs'
    }),
    new HtmlWebpackPlugin({
      filename: './contacts/index.html',
      template: './src/hbs/contacts.hbs'
    }),
  ]
};

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
