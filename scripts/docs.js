const fs = require('fs');
const {join } = require('path');

// Update docs/general/welcome.md to track README.md
const README = fs.readFileSync(join(__dirname, '../README.md'), {encoding: 'utf8'});
fs.writeFileSync(join(__dirname, '../docs/general/welcome.md'), README);
