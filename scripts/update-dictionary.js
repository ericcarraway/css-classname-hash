// node scripts/update-dictionary.js > test/TEST_DICTIONARY

const hashClassName = require(`../dist/index.js`).default;

const { TEST_DICTIONARY } = require(`../test/TEST_DICTIONARY.js`);

const NEW_DICTIONARY = {};

Object.keys(TEST_DICTIONARY).forEach((key) => {
  NEW_DICTIONARY[key] = hashClassName(key);
});

console.log(`const TEST_DICTIONARY = `);
console.log(NEW_DICTIONARY);

console.log(`\nmodule.exports = { TEST_DICTIONARY };`);
