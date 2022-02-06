// node scripts/update-dictionary.js > test/TEST_DICTIONARY.ts

const hashClassName = require(`../dist/index.js`).default;

const TEST_DICTIONARY = {};

const NEW_DICTIONARY = {};

Object.keys(TEST_DICTIONARY).forEach((key) => {
  NEW_DICTIONARY[key] = hashClassName(key);
});

console.log(NEW_DICTIONARY);
