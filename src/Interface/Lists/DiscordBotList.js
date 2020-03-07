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
   */
  getBotWidget(id) {
    return this._request({ url: `https://discordbotlist.com/bots/${id}/widget` }, false, false);
  }
}

module.exports = DiscordBotList;
