const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Space Bots List service.
 * @see https://spacebots.gitbook.io/tutorial-en/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class SpaceBotsList extends ServiceBase {
  static get aliases() {
    return ['spacebotslist', 'spacebotlist', 'spacebots', 'space-bot-list.org', 'space', 'sbl'];
  }

  static get logoURL() {
    return 'https://get.snaz.in/334CtqK.jpg';
  }

  static get name() {
    return 'Space Bots List';
  }

  static get websiteURL() {
    return 'https://space-bot-list.xyz/';
  }

  static get baseURL() {
    return 'https://space-bot-list.xyz/api';
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {CountResolvable} options.userCount The amount of users that the client cached
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, userCount }) {
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: {
        guilds: Util.resolveCount(serverCount),
        users: Util.resolveCount(userCount)
      }
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` });
  }
}

module.exports = SpaceBotsList;
