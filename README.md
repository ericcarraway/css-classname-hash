# @ericcarraway/css-classname-hash

`css-classname-hash` is an opinionated string hashing function for minifying CSS class names in Node.js, intended for use in front-end build systems.

**DETAILS**

1. Creates a base64-encoded md5 hash using Node's built-in `crypto` module

2. Removes characters that are invalid for CSS class names

3. Ensures that the hashed CSS class name
    - Starts with a letter
    - Has at least two letters
    - Has at least one lower case letter
    - Has at least one upper case letter
    - Is four characters long
