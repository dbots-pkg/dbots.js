const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the LBots service.
 * @see https://lbots.org/api/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class LBots extends ServiceBase {
  static get aliases() {
    return ['lbots', 'lbotsorg', 'lbots.org'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=lbots.org';
  }

  static get name() {
    return 'LBots';
  }

  static get websiteURL() {
    return 'https://lbots.org/';
  }

  static get baseURL() {
    return 'https://lbots.org/api/v1';
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
      headers: { Authorization: token },
      data: shard ?
        { guild_count: Util.resolveCount(serverCount),
          shard_id: shard.id,
          shard_count: shard.count } :
        { guild_count: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Invalidates the token being used in the request.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  invalidate(id) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/invalidate`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the list of people who favorited this bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotFavorites(id) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}/favorites`,
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Checks whether or not a user has favorited a bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} userID The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  userFavorited(id, userID) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/favorites/user/${Util.resolveID(userID)}`,
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Updates the guilds on the bot's panel.
   * @param {IDResolvable} id The bot's ID
   * @param {Object} data The data being posted
   * @returns {Promise<AxiosResponse>}
   */
  updatePanelGuilds(id, data) {
    return this._request({
      method: 'post',
      url: `/panel/${Util.resolveID(id)}/guilds`,
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets a guilds settings from the bot's panel.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} guildID The guild's ID
   * @returns {Promise<AxiosResponse>}
   */
  getPanelGuildSettings(id, guildID) {
    return this._request({
      url: `/panel/${Util.resolveID(id)}/guild/${Util.resolveID(guildID)}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets a guilds settings from the bot's panel.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} guildID The guild's ID
   * @param {Object} data The data being posted
   * @returns {Promise<AxiosResponse>}
   */
  updatePanelGuildSettings(id, guildID, data) {
    return this._request({
      url: `/panel/${Util.resolveID(id)}/guild/${Util.resolveID(guildID)}/update`,
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
  }
}

module.exports = LBots;
