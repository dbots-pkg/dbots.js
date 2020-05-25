const fs = require('fs');
const { join: path } = require('path');

// Update docs/general/welcome.md to track README.md
const README = fs.readFileSync(path(__dirname, '../README.md'), {encoding: 'utf8'})
  .replace(/https:\/\/dbots\.js\.org\/#([\w/]+)/, '#$1');
fs.writeFileSync(path(__dirname, '../docs/general/welcome.md'), README);

// Update docs/general/changelog.md to track CHANGELOG.md
const CHANGELOG = fs.readFileSync(path(__dirname, '../CHANGELOG.md'), { encoding: 'utf8' })
  .replace(/https:\/\/dbots\.js\.org\/#([\w/]+)/, '#$1');
fs.writeFileSync(path(__dirname, '../docs/general/changelog.md'), CHANGELOG);

// Update docs/general/services.md to reflect source changes
var interfaceFolder = path(__dirname, '../src/Interface/Lists');
const listClasses = fs.readdirSync(interfaceFolder);
var services = `# Supported Services (${listClasses.length})`;
for (const filename of listClasses) {
  const { aliases, logoURL, name, websiteURL } = require(path(interfaceFolder, filename));
  const className = filename.replace(/.js/, '');
  var ref;
  if (process.env.GITHUB_REF) {
    const arr = process.env.GITHUB_REF.split('/');
    ref = arr[arr.length - 1];
  }
  services += `

<div align=center>
  <p>
    <img src="${logoURL}" alt="${aliases[0]} logo" width="100" align="left" />
  </p>
  ${aliases.map(key => `<i id="${key}"></i>`).join('\n  ')}
  <a href="${websiteURL}"><h1>${name}</h1></a>

Keys: ${aliases.map(key => `\`${key}\``).join(', ')}  
Class: [dbots.${className}](${ref ? `/#/docs/main/${ref}/class/${className}` : ''})  
Website: ${websiteURL}
</div>`;
}
fs.writeFileSync(path(__dirname, '../docs/general/services.md'), services);
