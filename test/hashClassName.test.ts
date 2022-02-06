import hashClassName from '../index';
// import hashClassName from '../dist/index.js';
import { TEST_DICTIONARY } from './TEST_DICTIONARY';

describe('hashClassName', () => {
  it('should be a function', () => {
    expect(hashClassName).toBeInstanceOf(Function);
  });

  describe('TEST_DICTIONARY', () => {
    for (const [key, val] of Object.entries(TEST_DICTIONARY)) {
      it(`should hash "${key}" as "${val}"`, () => {
        const actual = hashClassName(key);
        const expected = val;

        expect(actual).toBe(expected);

        expect(isValidClassName(actual)).toEqual(true);
      });
    }

    it(`should have no hash collisions for ${Object.keys(
      TEST_DICTIONARY,
    ).length.toLocaleString()} unique keys`, () => {
      const values: string[] = Object.values(TEST_DICTIONARY);
      const uniqueValues: string[] = Array.from(new Set(values));

      expect(values).toStrictEqual(uniqueValues);
    });
  });

  it('should maintain a dictionary', () => {
    const dictionary = {};

    hashClassName('container', dictionary);
    hashClassName('header', dictionary);
    hashClassName('navigation', dictionary);

    expect(dictionary).toStrictEqual({
      container: `Xwtuv`,
      header: `CZ5lT`,
      navigation: `ZFgu9`,
    });
  });
});

function isValidClassName(className: string): boolean {
  // https://stackoverflow.com/questions/17924445/js-regex-to-test-find-an-invalid-css-classname-that-begins-with-numbers
  if (!/^([a-z_]|-[a-z_-])[a-z\d_-]*$/i.test(className)) {
    return false;
  }

  return true;
}
