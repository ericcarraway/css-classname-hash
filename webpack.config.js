const path = require(`path`);

const outputFilename = `index.js`;
// const outputPath = path.resolve(__dirname, `./dist`);
const outputPath = path.resolve(__dirname, `.`);

module.exports = {
  entry: `./index.ts`,
  module: {
    rules: [
      {
        loader: `ts-loader`,
        test: /\.ts$/,
      },
    ],
  },
  output: {
    filename: outputFilename,
    path: outputPath,
  },
  resolve: {
    extensions: [`.ts`, `.js`],
    fallback: {
      crypto: false,
    },
  },
};
