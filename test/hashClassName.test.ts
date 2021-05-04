import hashClassName from '../index';
import TEST_DICTIONARY from './TEST_DICTIONARY';

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
});
