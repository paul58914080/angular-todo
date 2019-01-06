const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/todo-header/runtime.js',
    './dist/todo-header/polyfills.js',
    './dist/todo-header/scripts.js',
    './dist/todo-header/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/todo-header.js');
  await fs.copyFile(
    './dist/todo-header/styles.css',
    'elements/todo-header.styles.css'
  );
})();
