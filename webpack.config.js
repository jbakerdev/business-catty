const path = require('path')
module.exports = {
    entry: [
        "./index.js"
    ],
    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: './',
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                }
            ]
        },
        {
            test: /\.ts|\.tsx$/,
            loader: "ts-loader",
        },
        {
            test: /sw.(j|t)s$/,
            use: [{
                loader: 'file-loader',
            }]
        },
        {
            test: /\.(png|svg|jpg|gif|mp3)$/,
            use: [{
                loader: 'file-loader',
                options: {
                  outputPath: './'
                },
              }]
        },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, use: ['url-loader?limit=100000'] },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }
    ],
    },
};