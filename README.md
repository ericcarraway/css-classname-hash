# @ericcarraway/css-classname-hash

`css-classname-hash` is an opinionated string hashing function for minifying CSS class names in Node.js, intended for use in front-end build systems.

**INSTALLATION**

```
npm i --save-dev @ericcarraway/css-classname-hash
```

**USAGE**

```js
// note the `.default`
const hashClassName = require('@ericcarraway/css-classname-hash').default;

// an example BEM class name
hashClassName('block-name__elem-name_mod-name_mod-val') // 'YMpSk'

// other examples
hashClassName('container') // 'Xwtuv'
hashClassName('header') // 'CZ5lT'
hashClassName('navigation') // 'ZFgu9'
```

**DETAILS**

1. Creates a base64-encoded md5 hash using Node's built-in `crypto` module

2. Removes characters that are invalid for CSS class names

3. Ensures that the hashed CSS class name
    - Starts with a letter
    - Is five characters long

---

Bootstrapped with [TSDX](https://github.com/formium/tsdx)
