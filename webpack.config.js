const path = require("path");

module.exports = {
    entry: {
        app: ["./demo/index.js"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                pathRewrite: {"^/api" : ""},
                secure: false,
                changeOrigin: true
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "demo/web"),
        publicPath: "/assets/",
        filename: "bundle.js"
    }
};
