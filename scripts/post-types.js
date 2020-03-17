const fs = require('fs');
const { join: path } = require('path');

const replaceMap = {
  'declare': 'export',
  'eventHandler = \\(result: any \\| object\\[\\]\\) => void': 
    'eventHandler = (result: object | object[]) => void'
};

const typesPath = path(__dirname, '../typings/index.d.ts');
const originalTypes = fs.readFileSync(typesPath, { encoding: 'utf8' });

var docs = originalTypes;

for (const key in replaceMap) {
  const regex = new RegExp(key, 'g');
  docs = docs.replace(regex, replaceMap[key]);
}

// docs = `declare module 'dbots' {
// ${docs.trim()}
// }`;

fs.writeFileSync(typesPath, docs);
