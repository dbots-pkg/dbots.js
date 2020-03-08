const ServiceBase = require('../ServiceBase');

/**
 * Represents the Discord Bot List service.
 * @see https://discordbotlist.com/api-docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotList extends ServiceBase {
  static get aliases() {
    return ['discordbotlist', 'discordbotlist.com', 'dbotlist'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discordbotlist.com';
  }

  static get name() {
    return 'Discord Bot List';
  }

  static get websiteURL() {
    return 'https://discordbotlist.com';
  }

  static get baseURL() {
    return 'https://discordbotlist.com/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @param {number} options.userCount The amount of users that the client cached
   * @param {number} options.voiceConnections The amount of voice connections the client has
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount, shard, userCount, voiceConnections }) {
    const data = { guilds: serverCount };
    if (shard)
      data.shard_id = shard.id;
    if (userCount)
      data.users = userCount;
    if (voiceConnections)
      data.voice_connections = voiceConnections;

    return super._post({
      method: 'post',
      url: `/bots/${clientID}/stats`,
      headers: { Authorization: `Bot ${token}` },
      data
    });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {string} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`https://discordbotlist.com/bots/${id}/widget`, query, false);
  }
}

module.exports = DiscordBotList;
