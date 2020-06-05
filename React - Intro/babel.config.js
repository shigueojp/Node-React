module.exports = {
    presets: [
        // Responsável pelo IMPORT/EXPORT nomenclatura para o browser entender
        "@babel/preset-env",
        // JSX para o browser entender
        "@babel/preset-react",
    ],
    plugins: [
        //  => Responsável pelo STATE sem precisar estar no constructor
        '@babel/plugin-proposal-class-properties'
    ]
};