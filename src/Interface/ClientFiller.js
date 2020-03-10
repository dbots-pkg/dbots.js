/**
 * A class that gets certain values from a client.
 * @private
 * @class
 */
class ClientFiller {
  /**
   * @param {Object} client The client that will be used
   */
  constructor(client) {
    /**
     * The client that will be used for the filler.
     * @type {Object}
     * @private
     */
    this.client = client;
  }

  /**
   * Gets a client filler from a library.
   * @param {string} libraryName The name of the library to get
   * @param {Object} client The client that the library made
   * @returns {ClientFiller}
   * @private
   */
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
   * Gets the amount of users the bot has cached.
   * @type {number}
   * @readonly
   * @private
   */
  get userCount() {
    return 0;
  }

  /**
   * Gets the amount of servers the bot has cached.
   * @type {number}
   * @readonly
   * @private
   */
  get serverCount() {
    return 0;
  }

  /**
   * Gets the amount of voice connectinos the bot is using.
   * @type {number}
   * @readonly
   * @private
   */
  get voiceConnections() {
    return 0;
  }

  /**
   * Gets the client ID (technically the user ID) of the bot.
   * @type {?string}
   * @readonly
   * @private
   */
  get clientID() {
    return null;
  }

  /**
   * Gets the shard of the bot.
   * @type {?Shard}
   * @readonly
   * @private
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
