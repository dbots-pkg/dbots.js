import fs from 'fs'
import path from 'path'
import { runGenerator } from 'ts-docgen'

// Update docs/general/services.md to reflect source changes
var interfaceFolder = path.join(__dirname, '../src/Interface/Lists')
const listClasses = fs.readdirSync(interfaceFolder)
var services = `# Supported Services (${listClasses.length})`
for (const filename of listClasses) {
  const filePath = path.join(interfaceFolder, filename)
  const {
    aliases,
    logoURL,
    serviceName,
    websiteURL
  } = require(filePath).default
  const className = path.basename(filePath, '.ts')
  services += `

<div align=center>
  <p>
    <img src="${logoURL}" alt="${aliases[0]} logo" width="100" align="left" />
  </p>
  ${aliases.map((key: string) => `<i id="${key}"></i>`).join('\n  ')}
  <a href="${websiteURL}"><h1>${serviceName}</h1></a>

Keys: ${aliases.map((key: string) => `\`${key}\``).join(', ')}${
    '  ' /* This is just to avoid prettier deleting the spaces*/
  }
Class: [${className}](/#/docs/main/$$$ref/class/${className})${'  '}
Website: ${websiteURL}
</div>`
}
fs.writeFileSync(path.join(__dirname, '../docs/general/services.md'), services)

runGenerator({
  source: ['src'],
  tsconfig: 'tsconfig.json',
  custom: 'docs/index.yml',
  output: 'docs/docs.json'
})
