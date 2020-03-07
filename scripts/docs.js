const fs = require('fs');
const { join: path } = require('path');

// Update docs/general/welcome.md to track README.md
const README = fs.readFileSync(path(__dirname, '../README.md'), {encoding: 'utf8'});
fs.writeFileSync(path(__dirname, '../docs/general/welcome.md'), README);

// Update docs/general/services.md to reflect source changes
var services = '# Supported Services';
var interfaceFolder = path(__dirname, '../src/Interface/Lists');
const listClasses = fs.readdirSync(interfaceFolder);
for (const filename of listClasses) {
  const { aliases, logoURL, name, websiteURL } = require(path(interfaceFolder, filename));
  services += `

<div align=center>
  <p>
    <img src="${logoURL}" alt="${aliases[0]} logo" width="100" align="left" />
  </p>
  ${aliases.map(key => `<i id="${key}"></i>`).join('\n  ')}
  <a href="${websiteURL}"><h1>${name}</h1></a>

Keys: ${aliases.map(key => `\`${key}\``).join(', ')}  
Class: [dbots.${filename.replace(/.js/, '')}]()
</div>`;
}
fs.writeFileSync(path(__dirname, '../docs/general/services.md'), services);
