import path from 'path'
import fs from 'fs'

const sourcePath = path.join(__dirname, '../src/Interface/ListIndex.ts')
const listsPath = path.join(__dirname, '../src/Interface/Lists')

var before = '',
  after = '',
  state = 'before'
fs.readFileSync(sourcePath, { encoding: 'utf-8' })
  .split('\n')
  .map((l) => l + '\n')
  .forEach((line) => {
    if (line.startsWith('// <!-- generated:start')) state = 'middle'
    if (state == 'before') before += line

    if (state == 'after') after += line
    if (line.startsWith('// <!-- generated:end')) state = 'after'
  })

const files = fs.readdirSync(listsPath)

const content = `
// <!-- generated:start -->
// This section is automatically generated by the 'build:source' script, any change will be overwritten

${files
  .map((filename) => {
    const { name } = path.parse(filename)
    return `import ${name} from './Lists/${name}'`
  })
  .join('\n')}

// prettier-ignore
export const serviceList = {
${files
  .map((filename) => {
    const clarse = require(path.join('../src/Interface/Lists', filename))
      .default
    return clarse.aliases
      ?.map((alias: string) => `  '${alias}': ${path.parse(filename).name},`)
      .join('\n')
  })
  .join('\n')}
}
// <!-- generated:end -->
`

fs.writeFileSync(
  sourcePath,
  before.trimLeft() + content.trim() + '\n' + after.trimRight() + '\n'
)
