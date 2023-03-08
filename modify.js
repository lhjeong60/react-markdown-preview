const fs = require('fs');

let index = fs.readFileSync('lib/index.js', 'utf8');
let reservedMeta = fs.readFileSync('lib/plugins/reservedMeta.js', 'utf8');
index = index.replace(`require("react-markdown")`, `( async () => await import("react-markdown"))()`);
index = index.replace(`require("remark-gfm")`, `( async () => await import("remark-gfm"))()`);
index = index.replace(`require("rehype-raw")`, `( async () => await import("rehype-raw"))()`);
index = index.replace(`require("rehype-slug")`, `( async () => await import("rehype-slug"))()`);
index = index.replace(
  `require("rehype-autolink-headings")`,
  `( async () => await import("rehype-autolink-headings"))()`,
);
index = index.replace(`require("rehype-attr")`, `( async () => await import("rehype-attr"))()`);
index = index.replace(`require("rehype-ignore")`, `( async () => await import("rehype-ignore"))()`);
index = index.replace(`require("rehype-prism-plus")`, `( async () => await import("rehype-prism-plus"))()`);
index = index.replace(`require("rehype-rewrite")`, `( async () => await import("rehype-rewrite"))()`);

reservedMeta = reservedMeta.replace(`require("unist-util-visit")`, `(async () => await import("unist-util-visit"))()`);

fs.writeFileSync('lib/index.js', index, 'utf8');
fs.writeFileSync('lib/plugins/reservedMeta.js', reservedMeta, 'utf8');

console.log('Modify Done');
