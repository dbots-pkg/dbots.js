const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the BotsDataBase service.
 * @see https://docs.botsdatabase.com/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsDataBase extends ServiceBase {
  static get aliases() {
    return ['botsdatabase', 'bdb'];
  }

  static get logoURL() {
    return 'https://botsdatabase.com/images/icons/favicon-96x96.png';
  }

  static get name() {
    return 'BotsDataBase';
  }

  static get websiteURL() {
    return 'https://botsdatabase.com';
  }

  static get baseURL() {
    return 'https://api.botsdatabase.com/v1';
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: { servers: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/users/${Util.resolveID(id)}` });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes(id) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/votes`,
      headers: { Authorization: this.token }
    }, { requiresToken: true });
  }
}

module.exports = BotsDataBase;
