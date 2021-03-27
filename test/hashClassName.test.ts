import hashClassName from '../src';
import testDictionary from './test-dictionary';

describe('hashClassName', () => {
  it('should be a function', () => {
    expect(hashClassName).toBeInstanceOf(Function);
  });

  describe('test-dictionary.ts', () => {
    for (const [key, val] of Object.entries(testDictionary)) {
      it(`should hash "${key}" as "${val}"`, () => {
        const actual = hashClassName(key);
        const expected = val;

        expect(actual).toBe(expected);
      });
    }

    it('should have no hash collisions', () => {
      const values: string[] = Object.values(testDictionary);
      const uniqueValues: string[] = Array.from(new Set(values));

      expect(values).toStrictEqual(uniqueValues);
    });
  });
});
