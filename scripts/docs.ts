import fs from 'fs'
import path from 'path'
import { runGenerator } from 'ts-docgen'

// Update docs/general/welcome.md to track README.md
const README = fs
  .readFileSync(path.join(__dirname, '../README.md'), { encoding: 'utf8' })
  .replace(/https:\/\/dbots\.js\.org\/#([\w/]+)/, '#$1')
fs.writeFileSync(path.join(__dirname, '../docs/general/welcome.md'), README)

// Update docs/general/changelog.md to track CHANGELOG.md
const CHANGELOG = fs
  .readFileSync(path.join(__dirname, '../CHANGELOG.md'), { encoding: 'utf8' })
  .replace(/https:\/\/dbots\.js\.org\/#([\w/]+)/, '#$1')
fs.writeFileSync(
  path.join(__dirname, '../docs/general/changelog.md'),
  CHANGELOG
)

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
  var ref
  if (process.env.GITHUB_REF) {
    const arr = process.env.GITHUB_REF.split('/')
    ref = arr[arr.length - 1]
  }
  services += `

<div align=center>
  <p>
    <img src="${logoURL}" alt="${aliases[0]} logo" width="100" align="left" />
  </p>
  ${aliases.map((key: string) => `<i id="${key}"></i>`).join('\n  ')}
  <a href="${websiteURL}"><h1>${serviceName}</h1></a>

Keys: ${aliases.map((key: string) => `\`${key}\``).join(', ')}  
Class: [dbots.${className}](${
    ref ? `/#/docs/main/${ref}/class/${className}` : ''
  })  
Website: ${websiteURL}
</div>`
}
fs.writeFileSync(path.join(__dirname, '../docs/general/services.md'), services)

runGenerator({
  // source: ['src'/* , path.join(__dirname, '../src/Interface/Lists')*/],
  existingOutput: '.tmp/typedoc-out.json',
  custom: 'docs/index.yml',
  output: 'docs/docs.json'
})
