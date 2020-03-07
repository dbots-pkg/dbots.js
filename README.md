<div align="center">
  <p>
    <img src="static/logo.png" alt="dbots logo" width="200" align="left" />
  </p>
  <h1>dbots<i>.js</i></h1>
  <p>A poster/wrapper for Discord bot lists</p>
  <p>
    <a href="https://www.npmjs.com/package/dbots"><img src="https://img.shields.io/npm/v/dbots.svg?maxAge=3600&style=for-the-badge" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/dbots"><img src="https://img.shields.io/npm/dt/dbots.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/dbots-pkg/dbots.js"><img src="https://img.shields.io/david/dbots-pkg/dbots.js.svg?maxAge=3600&style=for-the-badge" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dbots/"><img src="https://nodei.co/npm/dbots.png" alt="NPM info" /></a>
  </p>
</div>

# Table of Contents
- [About](#about)
- [Installing](#installing)
- [Examples](#examples)
  - [Example with client](#example-with-client)
  - [Example without client](#example-without-client)
- [Supported Libraries](#supported-libraries)
- [Supported Services](#supported-services)
- [Other Links](#other-links)

## About
`dbots` helps [Discord](https://discordapp.com) bot developers group all your statistic posting needs into one poster, complete with seperate posting, API wrappers for supported lists, and an interval to post to all services every `n` seconds.

## Installing
You can install dbots by running this command:
```sh
# Stable
npm i dbots
yarn add dbots

# Master
npm i dbots-pkg/dbots.js#master
yarn add ssh://github.com/dbots-pkg/dbots.js#master
```

## Examples

## Example with client
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const dbots = require('dbots');
const poster = new dbots.Poster({
    client,
    apiKeys: {
        discordbotsgg: '…',
        topgg: '…',
        lsterminalink: '…',
        carbon: '…'
    },
    clientLibrary: 'discord.js'
});

poster.startInterval(); // starts an interval thats posts to all services every 30 minutes
```

## Example without client
```js
const dbots = require('dbots');
const poster = new dbots.Poster({
    apiKeys: {
        discordbotsgg: '…',
        topgg: '…',
        lsterminalink: '…',
        carbon: '…'
    }
});

poster.post('carbon') // if the service is undefined, it posts to all services provided with a key
```

## Supporting Libraries
Creator     | Name
----------- | -----
discordjs (originally from hydrabolt)   | [![npm](static/npm.png)](https://npmjs.com/discord.js) [![GitHub](static/github.png)](https://github.com/discordjs/discord.js) discord.js
izy521      | [![npm](static/npm.png)](https://npmjs.com/discord.io) [![GitHub](static/github.png)](https://github.com/izy521/discord.io) discord.io
qeled       | [![npm](static/npm.png)](https://npmjs.com/discordie) [![GitHub](static/github.png)](https://github.com/qeled/discordie) discordie
abalabahaha | [![npm](static/npm.png)](https://npmjs.com/eris) [![GitHub](static/github.png)](https://github.com/abalabahaha/eris) eris

## Supporting Services
 - [top.gg (formerly discordbots.org)  `topgg` or `discordbotsorg`](https://top.gg)*
 - [discord.bots.gg `discordbotsgg`](https://discord.bots.gg)
 - [discordapps.dev `discordappsdev`](https://discordapps.dev)
 - [carbonitex.net `carbon`](http://carbonitex.net/discord/bots)
 - [botsfordiscord.com `botsfordiscord`](http://botsfordiscord.com)
 - [bots.ondiscord.xyz `botsondiscord`](http://bots.ondiscord.xyz)
 - [discordbotlist.com `discordbotlist`](https://discordbotlist.com)
 - [divinediscordbots.com `divinediscordbots`](https://divinediscordbots.com)
 - [discord.boats `discordboats`](https://discord.boats)
 - [botlist.space `botlistspace`](https://botlist.space)
 - [discordbot.world `discordbotworld`](https://discordbot.world)
 - [glennbotlist.xyz `glennbotlist`](https://glennbotlist.xyz)

\* discordbots.org is currently rebranding to top.gg: they will gradually make changes to add new functionalities, you can find more info [here](https://medium.com/discord-bots/announcing-top-gg-the-next-phase-of-discord-bots-2ac3eb3b81bd).  
To ensure backwards compatibility we will keep the `discordbotsorg` service active, but only as a reference to `topgg`, keeping it in a "deprecated" state; when the rebranding will be completed, we'll publish a major version update deleting any remains of the old name. If you're reading this, please switch to the classes of the new service ;)

## Contribution
Any contribution may be useful for the package! Make sure when making issues or PRs that the issue has not been addressed yet in a past issue/PR.

## Other Links
- [NPM](https://npmjs.org/package/dbots)
- [Yarn](https://yarn.pm/dbots)
- [JSDelivr](https://www.jsdelivr.com/package/npm/dbots)
- [David (Dependency Watcher)](https://david-dm.org/dbots-pkg/dbots.js)
- [Website](https://dbots.js.org) ([source](https://github.com/dbots-pkg/dbots-pkg.github.io))
- [Documentation](https://dbots.js.org/#/docs)
- [dbots GitHub Organization](https://github.com/dbots-pkg)
