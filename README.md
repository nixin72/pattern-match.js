# pattern-match.js

This is a simple function to provide Haskell/Rust/etc like pattern matching to JavaScript and TypeScript.

This is a **work in progress**. Do not expect full pattern matching support, I'm still learning the rules of pattern matching myself :sweat_smile:

Basically, the first argument to the match function is what you're matching against. The second argument is an array of cases. Each case is made up of a condition and a function. The first case to yield a "match" against the first argument will have it's function called to be returned. If everything fails to match, the default case is called.

```typescript
let x = match("matchAgainst", [
  ["a string", () => "false"],
  [/a regex/, () => "false"],
  [["an array"], () => "false"]
], () => "a default case");

console.log(x); // "a default case"
```

## Install
```
$ npm install fs-match
```
