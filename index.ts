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

const hashClassName = (originalClassName: string): string => {
  const rawHash: string = md5(originalClassName);

  let cssClass: string = '';
  let idx: number = 0;

  while (cssClass.length < TARGET_HASH_LENGTH) {
    const char: string = rawHash[idx];

    // our hashed CSS class name should start with a letter
    // and then continue with either a letter or digit
    if (cssClass.length && isLetterOrNumber(char)) {
      cssClass = `${cssClass}${char}`;
    } else if (!cssClass.length && isLetter(char)) {
      cssClass = char;
    }
    // else, skip `char`

    idx += 1;
  }

  return cssClass;
};

type Dictionary = { [key: string]: string };

const hashClassNameWithCache = (
  originalClassName: string,
  dictionary?: Dictionary,
): string => {
  if (!dictionary) {
    return hashClassName(originalClassName);
  }

  const cached = dictionary[originalClassName];

  if (cached) {
    return cached;
  }

  const cssClass = hashClassName(originalClassName);

  dictionary[originalClassName] = cssClass;

  return cssClass;
};

export default hashClassNameWithCache;
