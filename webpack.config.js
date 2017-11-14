const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');


let config = { 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'],
    alias: {
      images: path.resolve(__dirname, 'src/assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })),
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              pregressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // a directory or URL to serve html content from
    historyApiFallback: true,
    inline: true,
    open: true, // open browser when launching
  }
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new UglifyJsPlugin(),
    new OptimizeCSSAssets()
  )
}

