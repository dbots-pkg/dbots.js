# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

You can see the docs for every version at [here](https://dbots.js.org/#/docs).

## [Unreleased]

## [8.0.1] - 2021-03-04

### Fixed:

- Rename files as 8.0.0 should have done.

## [8.0.0] - 2021-03-04

### Changed:

- InfinityBotList is now called InfinityBots. Their aliases have changed too.

## [7.0.1] - 2021-02-25

### Fixed:

- DisTop: removed since they disappeared
- TopCord: update to new API version
- Blist: update to new API version

## [7.0.0] - 2021-02-25

### Removed:

You can refer to issue #58 for each of these lists

- LBots
- DBLista
- DiscordBotWorld
- MythicalBots: they became IdleDev, which is unreachable at the moment.

### Added:

- DiscordBotDirectory (#101)
- VoidBots (#102, #114)
- Disforge (#103)
- ParadiseBots (#104)
- BladeBotList (#115)
- DisTop (#121)
- Dbots (#122)

### Fixed:

- InfinityBotList: updated to new API version (#144)

## [6.1.0] - 2021-01-07

### Added:

- New service: Infinity Bot List (issue #99)

## [6.0.0] - 2021-01-05

We know the list of changes is huge, so here's the gist of it:

- If you only posted stats using the `Poster` class then nothing should change for you
- If you used one of the service classes, make sure that the property names you're accessing haven't changed (they shouldn't though)
- If you imported from any of the internal files of the package, make sure to check the list below for changes
- You can now use accurate TypeScript typings with this package

You can also refer to issue #71.

### Potentially breaking changes:

- `*` - The whole package is now written in TypeScript. The scripts have changed too.
- `*` - JSDoc annotation no longer have types, everything that can be moved to TS should no longer be written in JSDoc
  - `@private` tags can still be used when we want to mark something as "private" for the docs website, but it's not an actual private property
- `*` - In the whole package, internal `module.exports =` exports have been replaced by `default` exports
- `*` - In the whole package, functions and methods no longer return `null` when only `undefined` is documented; if they can return `null` it will be explicitly documented
- `*` - In the whole package, it's preferred to create a dedicated type/interface to document function argument, instead of using an "inline type"
- `index` - Each service class now has to be accessed via the `dbots.serviceClasses` constant, instead of directly from `dbots` (e.g. `dbots.Arcane` now becomes `dbots.serviceClasses.Arcane`)
- `index` - two functions have been renamed to camelCase (`formatRequest` and `ensurePromise`)
- `Utils/Constants` - In `PostRequestData`, multiple properties are now optional
- `Utils/Constants` - The supported `Poster` events have been renamed
- `Utils/DbotsError` - The exported `Error`, `TypeError`, and `RangeError` classes are now grouped under the `errors` exported constant (e.g. `dbotserror.Error` is now `dbotserror.errors.Error`)
- `Utils/FormatRequest` - In `RequestForm`, multiple properties are now optional
- `Utils/FormatRequest` - `FormatRequest` no longer supports aliases for some options; the correct option name is enforced by the type of the argument
- `Utils/Util` - added the `AnyObject` type and the `assert` function
- `Interface/ServiceBase` - The `ServiceBase.name` static property is now called `ServiceBase.serviceName`, in order to avoid conflicts with the `Function.name` property
- `Interface/Lists/*` - They all extend `ServiceBase`, and so they all have the change above
- `Interface/ClientFiller` - circular imports have been removed, the static class method is now a separate function
- `Interface/ClientFiller` - the new function to get client fillers does not support library aliases; the argument now uses the `Library` type
- `Service` has been renamed to `ServiceKey`
- `ServiceBase` has been renamed to `Service`

### Added:

- TypeScript support
- New service: AstroBotList
- New client: Paracord

## [5.2.0] - 2020-10-07

### Added:

- DiscordServices has been added.

## [5.1.0] - 2020-09-25

### Added:

- 5 new services have been added: DiscordLabs, Blist, TopCord, DiscordListology, and DiscordBotsCo.

## [5.0.4] - 2020-07-28

### Fixed:

- ServiceBase: fixed an issue that caused this file to throw an error when the `NODE_ENV` env variable was set to `production`.

## [5.0.3] - 2020-07-09

### Fixed:

- MythicalBots: updated URL for stats posting.

## [5.0.2] - 2020-07-04

### Fixed:

- SpaceBotList: updated website and API URL.

## [5.0.1] - 2020-06-29

### Fixed

- DiscordExtremeList: fixed endpoint for stats posting.

## [5.0.0] - 2020-06-27

### Added

- ServiceBase: added the `ServiceBase.getAll()` method, which returns all the loaded services.

### Changed

- **[BREAKING]** DiscordExtremeList: the API has been updated to v2, adding shard posting and removing the `.getWidgetURL()` method.

### Removed

- **[BREAKING]** BotsOfDiscord: the bot list has been closed, the whole class has been removed.

### Fixed

- Arcane: updated endpoints with the new URL.

## [4.1.0] - 2020-06-18

### Added

- Add new service: BotsDataBase

## [4.0.0] - 2020-06-07

### Added

- Add better error handling for when requests to services get rejected.

### Changed

- **[BREAKING]** ListMyBots: Update class methods, check the docs to see the new class.
- **[BREAKING]** GlennBotList: `.getProfile()` is now called `.getUser()` (we're skipping deprecation since we're publishing a major version anyway).

### Removed

- **[BREAKING]** DiscordBotList: removed the `.getWidgetURL()` method since the list has switched to [JavaScript widgets](https://docs.discordbotlist.com/javascript-widget).

### Fixed

- Update endpoints for ListMyBots, GlennBotList and DiscordBotList.

<!-- prettier-ignore -->
[Unreleased]: https://github.com/dbots-pkg/dbots.js/compare/v8.0.1...HEAD
[4.0.0]: https://github.com/dbots-pkg/dbots.js/compare/v3.0.1...v4.0.0
[4.1.0]: https://github.com/dbots-pkg/dbots.js/compare/v4.0.0...v4.1.0
[5.0.0]: https://github.com/dbots-pkg/dbots.js/compare/v4.1.0...v5.0.0
[5.0.1]: https://github.com/dbots-pkg/dbots.js/compare/v5.0.0...v5.0.1
[5.0.2]: https://github.com/dbots-pkg/dbots.js/compare/v5.0.1...v5.0.2
[5.0.3]: https://github.com/dbots-pkg/dbots.js/compare/v5.0.2...v5.0.3
[5.0.4]: https://github.com/dbots-pkg/dbots.js/compare/v5.0.3...v5.0.4
[5.1.0]: https://github.com/dbots-pkg/dbots.js/compare/v5.0.4...v5.1.0
[5.2.0]: https://github.com/dbots-pkg/dbots.js/compare/v5.1.0...v5.2.0
[6.0.0]: https://github.com/dbots-pkg/dbots.js/compare/v5.2.0...v6.0.0
[6.1.0]: https://github.com/dbots-pkg/dbots.js/compare/v6.0.0...v6.1.0
[7.0.0]: https://github.com/dbots-pkg/dbots.js/compare/v6.1.0...v7.0.0
[7.0.1]: https://github.com/dbots-pkg/dbots.js/compare/v7.0.0...v7.0.1
[8.0.0]: https://github.com/dbots-pkg/dbots.js/compare/v7.0.1...v8.0.0
[8.0.1]: https://github.com/dbots-pkg/dbots.js/compare/v8.0.0...v8.0.1
