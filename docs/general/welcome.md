<div align="center">
  <p>
    <img src="/static/logo.png" alt="dbots logo" width="200" align="left" />
  </p>
  <h1>dbots</h1>
  <p>The universal count poster</p>
  <p>
    <a href="https://www.npmjs.com/package/dbots"><img src="https://img.shields.io/npm/v/dbots.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/dbots"><img src="https://img.shields.io/npm/dt/dbots.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/snazzah/dbots.js"><img src="https://img.shields.io/david/snazzah/dbots.js.svg?maxAge=3600" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dbots/"><img src="https://nodei.co/npm/dbots.png" alt="NPM info" /></a>
  </p>
</div>

## Example
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

## Example with a client
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const dbots = require('dbots');
const poster = new dbots.Poster({
    client, // Client MUST be logged in to be put into a poster
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

## Supporting Libraries
Creator     | Name
----------- | -----
hydrabolt   | [![npm](/static/npm.png)](https://npmjs.com/discord.js) [![GitHub](/static/github.png)](https://github.com/hydrabolt/discord.js) discord.js
izy521      | [![npm](/static/npm.png)](https://npmjs.com/discord.io) [![GitHub](/static/github.png)](https://github.com/izy521/discord.io) discord.io
qeled       | [![npm](/static/npm.png)](https://npmjs.com/discordie) [![GitHub](/static/github.png)](https://github.com/qeled/discordie) discordie
abalabahaha | [![npm](/static/npm.png)](https://npmjs.com/eris) [![GitHub](/static/github.png)](https://github.com/abalabahaha/eris) eris

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
