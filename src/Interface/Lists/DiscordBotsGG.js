const ServiceBase = require('../ServiceBase');

/**
 * Represents the bots.discord.pw service
 * @see https://discord.bots.gg/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotsGG extends ServiceBase {
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
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bots/${clientID}/stats`,
      headers: { Authorization: token },
      data: shard ? 
        { guildCount: serverCount, shardId: shard.id, shardCount: shard.count } : 
        { guildCount: serverCount }
    });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   * @param {Boolean} [sanitized=false] Whether to sanitize descriptions
   * @returns {Promise}
   */
  getBot(id, sanitized = false) {
    return this._request({
      url: `/bots/${id}`,
      headers: { Authorization: this.token },
      query: { sanitized }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets a list of bots on this service
   * @param {?Object} query The query string object to append to the endpoint
   * @returns {Promise}
   */
  getBots(query) {
    return this._request({
      url: '/bots',
      headers: { Authorization: this.token },
      params: query
    }, {
      requiresToken: true
    });
  }
}

module.exports = DiscordBotsGG;
