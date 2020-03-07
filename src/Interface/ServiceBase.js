const FormatRequest = require('../Utils/FormatRequest');
const buildURL = require('axios/lib/helpers/buildURL');

/**
 * Represents a service
 * @constructor
 * @param {string} token The token/key for the service
 */
class ServiceBase {
  constructor(token) {
    /**
     * The token that will be used for the service
     * @type {string}
     * @private
     */
    this.token = token;
  }

  /**
   * The base URL of the service's API
   * @type {string}
   */
  static get baseURL() {
    return '';
  }

  /**
   * Gets a service from a key
   * @param {string} key - The name of the service to get
   * @returns {?ServiceBase}
   */
  static get(key) {
    switch (key) {
    case 'botlistspace':
    case 'botlist.space':
    case 'bls': {
      return BotListSpace;
    }

    case 'botsfordiscord':
    case 'botsfordiscord.com':
    case 'bfd': {
      return BotsForDiscord;
    }

    case 'botsondiscord':
    case 'bots.ondiscord.xyz':
    case 'bod': {
      return BotsOnDiscord;
    }

    case 'carbonitex':
    case 'carbonitex.net':
    case 'carbon': {
      return Carbon;
    }

    case 'discordappsdev':
    case 'discordapps.dev':
    case 'discordapps':
    case 'dapps': {
      return DiscordAppsDev;
    }

    case 'discordboats':
    case 'discord.boats':
    case 'dboats': {
      return DiscordBoats;
    }

    case 'discordbotlist':
    case 'discordbotlist.com':
    case 'dbotlist': {
      return DiscordBotList;
    }

    case 'discordbotsgg':
    case 'discord.bots.gg':
    case 'botsgg':
    case 'bots.gg':
    case 'dbots': {
      return DiscordBotsGG;
    }

    case 'discordbotworld':
    case 'discordbot.world':
    case 'dbotworld':
    case 'dbw': {
      return DiscordBotWorld;
    }

    case 'divinediscordbots':
    case 'divinediscordbots.com':
    case 'divinedbots':
    case 'divine':
    case 'ddb': {
      return DivineDiscordBots;
    }

    case 'glennbotlist':
    case 'glennbotlist.xyz':
    case 'glennbotlist.gg':
    case 'glenn': {
      return GlennBotList;
    }

    case 'topgg':
    case 'top.gg':
    case 'top': {
      return TopGG;
    }

    default: {
      return null;
    }
    }
  }

  /**
   * Posts statistics to this service
   * Internally, this is supposed to be overridden in extended classes
   * @param {Object} form The request form
   * @param {boolean} [appendBaseURL] Whether to append the service's base API url
   * @private
   */
  static _post(form, appendBaseURL = true) {
    if (this.name === 'ServiceBase')
      return Promise.reject(new Error('This function needs to be called by an extended class'));
    if (this.baseURL && appendBaseURL)
      form.url = this.baseURL + form.url;
    return FormatRequest(form);
  }

  /**
   * Sends a request for the service interface
   * @param {Object} form The request form
   * @param {Object} options The options of this request
   * @param {boolean} [options.requiresToken] Whether the request requires a token
   * @param {boolean} [options.appendBaseURL] Whether to prepend the service's base API url
   * @private
   */
  _request(form, { requiresToken = false, appendBaseURL = true } = {}) {
    if (requiresToken && !this.token)
      return Promise.reject(new Error('This function requires a token'));
    if (this.constructor.baseURL && appendBaseURL)
      form.url = this.constructor.baseURL + form.url;
    return FormatRequest(form);
  }

  /**
   * Appends query string to a URL
   * @param {string} url The URL to modify
   * @param {Object} query The query to append
   * @param {boolean} appendBaseURL Whether to prepend the service's base API url
   * @returns {string} The modified URL
   * @private
   */
  _appendQuery(url, query, appendBaseURL = true) {
    if (this.constructor.baseURL && appendBaseURL)
      url = this.constructor.baseURL + url;
    return buildURL(url, query);
  }
}

module.exports = ServiceBase;

// Circular import
const BotListSpace = require('./Lists/BotListSpace');
const BotsForDiscord = require('./Lists/BotsForDiscord');
const BotsOnDiscord = require('./Lists/BotsOnDiscord');
const Carbon = require('./Lists/Carbon');
const DiscordAppsDev = require('./Lists/DiscordAppsDev');
const DiscordBoats = require('./Lists/DiscordBoats');
const DiscordBotList = require('./Lists/DiscordBotList');
const DiscordBotsGG = require('./Lists/DiscordBotsGG');
const DiscordBotWorld = require('./Lists/DiscordBotWorld');
const DivineDiscordBots = require('./Lists/DivineDiscordBots');
const GlennBotList = require('./Lists/GlennBotList');
const TopGG = require('./Lists/TopGG');
