const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Discord Boats service.
 * @see https://discord.boats/api/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBoats extends ServiceBase {
  static get aliases() {
    return ['discordboats', 'discord.boats', 'dboats'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discord.boats';
  }

  static get name() {
    return 'Discord Boats';
  }

  static get websiteURL() {
    return 'https://discord.boats';
  }

  static get baseURL() {
    return 'https://discord.boats/api/v2';
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
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` });
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/user/${Util.resolveID(id)}` });
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} userID The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  userVoted(id, userID) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}/voted`,
      query: { id: Util.resolveID(userID) }
    });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, query) {
    return this._appendQuery(`/widget/${Util.resolveID(id)}`, query);
  }
}

module.exports = DiscordBoats;
