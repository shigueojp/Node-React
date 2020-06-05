const path = require('path')

module.exports = {
    //  => Arquivo de Entrada
    entry: path.resolve(__dirname, 'src', 'index.js'),
    //  => Arquivo de Saída
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // => 
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },
    module: {
        // Todo JS o BABEL TRANSPILA
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        // Todo CSS o 
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'}, 
                    // -> Usado para importar outros CSS dentro de um CSS, ou arquivos
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /.*\.(gif|png|jpe?g|)$/i,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    }
}