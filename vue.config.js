const path = require('path')
module.exports = {
    devServer: {
        proxy: 'http://localhost:4000'
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.module
                .rule('eslint')
                .use('eslint-loader')
                .loader('eslint-loader')
                .tap(options => {
                    options.fix = true
                    return options
                })
        }
    }
}