const ServiceBase = require('../ServiceBase');

/**
 * Represents the discord.boats's service
 * @see https://discord.boats/api/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBoats extends ServiceBase {
  static get baseURL() {
    return 'https://discord.boats/api/v2';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {Number} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBot(id) {
    return this._request({ url: `/bot/${id}` });
  }

  /**
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   * @returns {Promise}
   */
  getUser(id) {
    return this._request({ url: `/user/${id}` });
  }

  /**
   * Whether or not a user has voted for a bot
   * @param {string} id The bot's ID.
   * @param {string} userID The user's ID.
   * @returns {Promise}
   */
  userVoted(id, userID) {
    return this._request({
      url: `/bot/${id}/voted`,
      query: { id: userID }
    });
  }

  /**
   * Gets the widget URL for this bot
   * @param {string} id The bot's ID.
   * @param {Object} [query] The querystring that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/widget/${id}`, query);
  }
}

module.exports = DiscordBoats;
