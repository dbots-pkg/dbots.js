const fs = require('fs'),
  path = require('path');

const currentVersion = require('../package.json').version;
if (!currentVersion) throw new Error('Cant\'t detect library version.');

const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
const changelog = fs.readFileSync(changelogPath, { encoding: 'utf-8' });
if (changelog.includes(`## [${currentVersion}]`))
  throw new Error('Current version has already been documented.');
let futureChangelog = '';

// Add version section
let arr = changelog.split('## [Unreleased]');
arr[1] = `

## [${currentVersion}] - ${new Date().toISOString().slice(0, 10)}
### Removed:
- **[BREAKING]** ListName: description

### Added:
- 

### Fixed:
- ` + arr[1];
futureChangelog = arr.join('## [Unreleased]');

// Update footer
arr = futureChangelog
  .split('\n')
  .map(line => line.startsWith('[Unreleased]')
    ? `[Unreleased]: https://github.com/dbots-pkg/dbots.js/compare/v${currentVersion}...HEAD`
    : line);

// console.log(arr.reverse()[1].match(/\[([^\][]*)]/)[0]);
const lastVersion = [...arr].reverse()[1].match(/\[([^\][]*)]/)[0].replace(/[\[\]']+/g, '');
if (!lastVersion) throw new Error('Can\'t find last version in changelog.');

arr.push(`[${currentVersion}]: https://github.com/dbots-pkg/dbots.js/compare/v${lastVersion}...v${currentVersion}`);
futureChangelog = arr.join('\n');

fs.writeFileSync(changelogPath, futureChangelog);
