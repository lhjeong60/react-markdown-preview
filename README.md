This package is a modified version of a `@uiw/react-markdown-preview`.

To use a `@uiw/react-markdown-preview` on the server side, I have modified `require()` to `(async () => await import())()` in some files.

``` js
// lib/index.js
// old
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

// new
var _reactMarkdown = _interopRequireDefault(( async () => await import("react-markdown"))());
```

I know this is a bad way, but I will use it until I find the right way.