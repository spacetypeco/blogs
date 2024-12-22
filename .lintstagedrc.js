// .lintstagedrc.js
const path = require("path");

module.exports = {
  "**/*.{js,json,md,mdx,ts,tsx,scss,yaml,yml}": ["npm run format"],
};
