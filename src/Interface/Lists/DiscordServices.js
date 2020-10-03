const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Discord Services service.
 * @see https://discordservices.net/docs/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordServices extends ServiceBase {
  static get aliases() {
    return ['discordservices', 'discordservices.net'];
  }

  static get logoURL() {
    return 'https://discordservices.net/icon.png';
  }

  static get name() {
    return 'Discord Services';
  }

  static get websiteURL() {
    return 'https://discordservices.net';
  }

  static get baseURL() {
    return 'https://api.discordservices.net';
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
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: shard ?
        {
          servers: Util.resolveCount(serverCount),
          shards: shard.count
        } :
        { servers: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Posts news to your bot page
   * @param {string} id The bot's ID
   * @param {string} title The title of the post
   * @param {string} content The content of the post
   */
  postNews(id, title, content) {
    return this._request({
      method: 'post',
      url: `/bot/${Util.resolveID(id)}/news`,
      headers: { Authorization: this.token },
      data: {
        title,
        content,
        error: false
      }
    }, { requiresToken: true });
  }

  /**
   * @typedef {Object} DiscordServicesCommandInfo
   * @property {string} command The command (include the prefix)
   * @property {string} desc The description for your command
   * @property {string} category The category of your command
   */

  /**
   * Posts commands info to your bot page
   * @param {string} id The bot's ID
   * @param {Array<DiscordServicesCommandInfo>} commands The command info to post
   * @param {string} content The content of the post
   */
  postCommands(id, commands) {
    return this._request({
      method: 'post',
      url: `/bot/${Util.resolveID(id)}/news`,
      headers: { Authorization: this.token },
      data: commands
    }, { requiresToken: true });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @param {string} [smallWidget] The sub-path name to turn the widget into a badge (i.e. owner)
   * @returns {string}
   */
  getWidgetURL(id, query, smallWidget = null) {
    const subPath = smallWidget ? `${smallWidget}/` : '';
    return this._appendQuery(`/widget/${subPath}${Util.resolveID(id)}.svg`, query);
  }
}

module.exports = DiscordServices;
