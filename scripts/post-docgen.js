const fs = require('fs');
const { join: path } = require('path');

const replaceMap = {
  // Replace TS Record<> type with regular Object.<>
  'Record': 'Object.'
};

const docsPath = path(__dirname, '../docs/docs.json');
const originalDocs = fs.readFileSync(docsPath, { encoding: 'utf8 '});

var docs = originalDocs;

for (const key in replaceMap) {
  const regex = new RegExp(key, 'g');
  docs = docs.replace(regex, replaceMap[key]);
}

fs.writeFileSync(docsPath, docs);
