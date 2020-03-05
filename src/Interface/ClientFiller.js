/**
 * A class that gets certain values from a client
 * @private
 * @param {Object} client The client that will be used
 */
class ClientFiller {
  constructor(client) {
    /**
     * The client that will be used for the filler
     * @type {Object}
     */
    this.client = client;
  }

  static get(libraryName, client) {
    if (!client)
      throw new Error('No client was provided!');
    switch (libraryName) {
    case 'discordie':
    case 'die': {
      return new Discordie(client);
    }
    case 'discord.io':
    case 'discordio':
    case 'd.io': 
    case 'dio': {
      return new DiscordIO(client);
    }
    case 'discord.js':
    case 'discordjs':
    case 'd.js':
    case 'djs':
    case 'discord.js-commando':
    case 'discordjs-commando':
    case 'd.js-commando':
    case 'djs-commando':
    case 'commando': {
      return new DiscordJS(client);
    }
    case 'eris': {
      return new Eris(client);
    }
    default: {
      throw new Error(`Unknown client '${libraryName}'`);
    }
    }
  }

  /**
   * Gets the amount of users the bot has cached
   * @type {number}
   * @readonly
   */
  get userCount() {
    return 0;
  }

  /**
   * Gets the amount of servers the bot has cached
   * @type {number}
   * @readonly
   */
  get serverCount() {
    return 0;
  }

  /**
   * Gets the amount of voice connectinos the bot is using
   * @type {number}
   * @readonly
   */
  get voiceConnections() {
    return 0;
  }

  /**
   * Gets the client ID (technically the user ID) of the bot
   * @type {?string}
   * @readonly
   */
  get clientID() {
    return null;
  }

  /**
   * Gets the shard of the bot
   * @type {?Shard}
   * @readonly
   */
  get shard() {
    return null;
  }
}

module.exports = ClientFiller;

// Circular import
const Discordie = require('./Clients/Discordie');
const DiscordIO = require('./Clients/DiscordIO');
const DiscordJS = require('./Clients/DiscordJS');
const Eris = require('./Clients/Eris');
