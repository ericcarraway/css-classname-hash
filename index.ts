import { createHash } from 'crypto';

// creates a base64-encoded md5 hash of the original class name
// and removes chars that are invalid for CSS class names
const md5 = (originalClassName: string) =>
  createHash('md5')
    .update(originalClassName)
    .digest('base64')
    .replace(/\/|\+|==/g, '');

const TARGET_HASH_LENGTH: number = 4;

const isLetter = (char: string): boolean => /[a-zA-Z]/.test(char);

const isLetterOrNumber = (char: string): boolean => /[A-Za-z0-9]/.test(char);

const getIndexOfRightmostLetter = (str: string): number => {
  for (let i: number = str.length - 1; i > 0; i -= 1) {
    if (isLetter(str[i])) {
      return i;
    }
  }

  return 0;
};

const capitalizeCharAtIndex = (str: string, idx: number): string =>
  `${str.substr(0, idx)}${str.charAt(idx).toUpperCase()}${str.substr(idx + 1)}`;

const capitalizeRightmostLetter = (str: string): string =>
  capitalizeCharAtIndex(str, getIndexOfRightmostLetter(str));

const stringHasLessThanTwoLetters = (str: string): boolean => {
  let numberOfLetters: number = 0;

  for (let i: number = 0; i < str.length; i += 1) {
    if (isLetter(str[i])) {
      numberOfLetters += 1;

      if (numberOfLetters > 1) {
        return false;
      }
    }
  }

  return true;
};

const hashClassName = (originalClassName: string): string => {
  const rawHash: string = md5(originalClassName);

  let cssClass: string = '';
  let idx: number = 0;

  while (cssClass.length < TARGET_HASH_LENGTH) {
    const char: string = rawHash[idx];
    const lastChar: string = cssClass[cssClass.length - 1];

    // our hashed CSS class name should start with a letter
    // and then continue with either a letter or digit
    if (cssClass.length && isLetterOrNumber(char) && char !== lastChar) {
      cssClass = `${cssClass}${char}`;
    } else if (!cssClass.length && isLetter(char)) {
      cssClass = char;
    }
    // else, skip `char`

    idx += 1;

    // if this would be the last iteration
    // and the number of letters is less than 2,
    // remove the number we just added
    // then iterate through the loop again
    // until the string ends with a letter
    if (
      cssClass.length === TARGET_HASH_LENGTH &&
      stringHasLessThanTwoLetters(cssClass)
    ) {
      cssClass = cssClass.slice(0, -1);
    }
  }

  // if the hashed class name is all upper case,
  // lowercase the first char/letter
  if (cssClass === cssClass.toUpperCase()) {
    cssClass = `${cssClass.charAt(0).toLowerCase()}${cssClass.slice(1)}`;
  } else if (cssClass === cssClass.toLowerCase()) {
    // if the hashed class name is all lower case,
    // upper case the rightmost letter
    cssClass = capitalizeRightmostLetter(cssClass);
  }

  return cssClass;
};

export default hashClassName;
