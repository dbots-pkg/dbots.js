<div align="center">
  <p>
    <img src="static/logo.png" alt="dbots.js logo" width="200" />
  </p>
  <p>A stats poster and API wrapper for all botlists.</p>
  <p>
    <a href="https://www.npmjs.com/package/dbots"><img src="https://img.shields.io/npm/v/dbots.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://github.com/dbots-pkg/dbots.js/network/dependents?package_id=UGFja2FnZS0zNzA1MzQ1MA%3D%3D"><img src="https://api.snaz.in/badges/v1/github/used-by/dbots-pkg/dbots.js" alt="GitHub repos used by" /></a>
    <a href="https://www.npmjs.com/package/dbots"><img src="https://img.shields.io/npm/dt/dbots.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/dbots-pkg/dbots.js"><img src="https://img.shields.io/david/dbots-pkg/dbots.js.svg?maxAge=3600" alt="Dependencies" /></a>
    <br/>
    <a href="https://github.com/dbots-pkg/dbots.js/actions?query=workflow%3A%22Source+code+linting%22"><img src="https://github.com/dbots-pkg/dbots.js/workflows/Source%20code%20linting/badge.svg" alt="Linting state" /></a>
    <a href="https://github.com/dbots-pkg/dbots.js/actions?query=workflow%3A%22TS+definitions%22"><img src="https://github.com/dbots-pkg/dbots.js/workflows/TS%20definitions/badge.svg" alt="Typings state" /></a>
    <a href="https://lgtm.com/projects/g/dbots-pkg/dbots.js/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/dbots-pkg/dbots.js.svg?label=Code%20quality" alt="LGTM Code Quality" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dbots/"><img src="https://nodei.co/npm/dbots.png" alt="NPM info" /></a>
  </p>
</div>

<!-- omit in toc -->
# Table of Contents
- [About](#about)
- [Installing](#installing)
- [Examples](#examples)
  - [Example with client](#example-with-client)
  - [Example without client](#example-without-client)
- [Supported Libraries](#supported-libraries)
- [Supported Services](#supported-services)
- [Changelog](#changelog)
- [Contribution](#contribution)
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

### Example with client
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

### Example without client
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

## Supported Libraries
Creator     | Name
----------- | -----
discordjs (originally from hydrabolt)   | [![npm](static/npm.png)](https://npmjs.com/discord.js) [![GitHub](static/github.png)](https://github.com/discordjs/discord.js) discord.js
izy521      | [![npm](static/npm.png)](https://npmjs.com/discord.io) [![GitHub](static/github.png)](https://github.com/izy521/discord.io) discord.io
qeled       | [![npm](static/npm.png)](https://npmjs.com/discordie) [![GitHub](static/github.png)](https://github.com/qeled/discordie) discordie
abalabahaha | [![npm](static/npm.png)](https://npmjs.com/eris) [![GitHub](static/github.png)](https://github.com/abalabahaha/eris) eris

## Supported Services
The supported services list has been moved into the website.  
You can see a full (and automatically updated) list of usables services [here](https://dbots.js.org/#/docs/main/latest/general/services).

## Changelog
You can see the changelog for every version [here](https://dbots.js.org/#/docs/main/latest/general/changelog).

## Contribution
Any contribution may be useful for the package! Make sure when making issues or PRs that the issue has not been addressed yet in a past issue/PR.

## Other Links
- [NPM](https://npmjs.org/package/dbots)
- [Yarn](https://yarn.pm/dbots)
- [JSDelivr](https://www.jsdelivr.com/package/npm/dbots)
- [David (Dependency Watcher)](https://david-dm.org/dbots-pkg/dbots.js)
- [Website](https://dbots.js.org) ([source](https://github.com/dbots-pkg/dbots-pkg.github.io))
- [Documentation](https://dbots.js.org/#/docs)
- [Dbots GitHub Organization](https://github.com/dbots-pkg)
