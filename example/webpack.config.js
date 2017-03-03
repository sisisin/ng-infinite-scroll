module.exports = {
  entry: './main.ts',
  output: {
    filename: './bundle.js'
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts-loader'], exclude: /node_modules/ },
    ]
  }
};