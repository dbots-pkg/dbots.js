const ServiceBase = require('../ServiceBase');

/**
 * Represents the Discord Bot List service
 * @see https://discordbotlist.com/api-docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotList extends ServiceBase {
  static get baseURL() {
    return 'https://discordbotlist.com/api';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {Number} options.serverCount The amount of servers that the client is in
   * @param {Number} options.userCount The amount of users that the client cached
   * @param {Number} options.voiceConnections The amount of voice connections the client has
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
   * Gets the widget for this bot
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBotWidget(id) {
    return this._request({ url: `https://discordbotlist.com/bots/${id}/widget` }, {
      appendBaseURL: false
    });
  }
}

module.exports = DiscordBotList;
