const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');
const { Package } = require('../../Utils/Constants');

/**
 * Represents the Discord Bots service.
 * @see https://discord.bots.gg/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotsGG extends ServiceBase {
  /**
   * @param {string} token The token/key for the service
   * @param {Object} options The options of the service. Providing this is highly recommended.
   * @param {string} options.library The bot's library
   * @param {IDResolvable} options.clientID The bot ID for the user agent
   */
  constructor(token, { library = 'unknown', clientID = '000000000000000' } = {}) {
    super(token);

    /**
     * The user agent options for this service.
     * @type {string}
     * @private
     */
    this.agent = { library, clientID };
  }

  static get aliases() {
    return ['discordbotsgg', 'discord.bots.gg', 'botsgg', 'bots.gg', 'dbots'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discord.bots.gg';
  }

  static get name() {
    return 'Discord Bots';
  }

  static get websiteURL() {
    return 'https://discord.bots.gg';
  }

  static get baseURL() {
    return 'https://discord.bots.gg/api/v1';
  }

  /**
   * Creates a compliant user agent to use for any API calls to Discord Bots.
   * @param {IDResolvable} botID The ID of the bot that the agent will be identified with
   * @param {string} [library] The library the agent is using
   * @returns {string}
   */
  static userAgent(botID, library = 'unknown') {
    return `dbots-0000/${Package.version} (${library}; +https://github.com/dbots-pkg/dbots.js) DBots/${Util.resolveID(botID)}`;
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: {
        Authorization: token,
        'User-Agent': DiscordBotsGG.userAgent(clientID)
      },
      data: shard ? 
        { guildCount: Util.resolveCount(serverCount),
          shardId: shard.id,
          shardCount: shard.count } : 
        { guildCount: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @param {Boolean} [sanitized=false] Whether to sanitize descriptions
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id, sanitized = false) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}`,
      headers: {
        Authorization: this.token,
        'User-Agent': DiscordBotsGG.userAgent(this.agent.botID, this.agent.library)
      },
      query: { sanitized }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets a list of bots on this service.
   * @param {Query} [query] The query string that will be used in the request
   * @returns {Promise<AxiosResponse>}
   */
  getBots(query) {
    return this._request({
      url: '/bots',
      headers: {
        Authorization: this.token,
        'User-Agent': DiscordBotsGG.userAgent(this.agent.botID, this.agent.library)
      },
      params: query
    }, {
      requiresToken: true
    });
  }
}

module.exports = DiscordBotsGG;
