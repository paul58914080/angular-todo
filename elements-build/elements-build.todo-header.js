const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/todo-header/runtime-es2015.js',
    './dist/todo-header/polyfills-es2015.js',
    './dist/todo-header/scripts.js',
    './dist/todo-header/main-es2015.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/todo-header.js');
  await fs.copyFile(
    './dist/todo-header/styles.css',
    'elements/todo-header.styles.css'
  );
})();
