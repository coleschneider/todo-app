var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'public/build/bundle.js',
        sourceMapFilename: 'public/build/bundle.map'
    },
    devtool: '#source-map',
    node: {
        fs: 'empty'
      },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?(\.erb)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: [
                    'es2015',
                    'react',
                    'stage-2'
                  ]
                
              }
            },
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=app/images/[name].[ext]"},
            {
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" },
                ],
              },
        
        ]
    }
}