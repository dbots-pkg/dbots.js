import path from 'path'
import fs from 'fs'

const listsDir = '../src/Interface/Lists'
const services: Record<string, any> = {}
fs.readdirSync(path.join(__dirname, listsDir)).forEach(file => {
  const name = path.parse(file).name,
    filePath = path.join(listsDir, file)

  services[name] = filePath.replace(/\\/g, '/')
})

const fileStr = `// This is an auto-generated file, any edit will be overwritten
module.exports = {
${Object.entries(services)
    .map(([name, filePath]) => `  ${name}: require('${filePath}')`)
    .join(',\n')}
}
`

fs.mkdirSync(path.join(__dirname, '../.tmp'), { recursive: true })
const filePath = path.join(__dirname, '../.tmp/services-list.js')
fs.writeFileSync(filePath, fileStr)
