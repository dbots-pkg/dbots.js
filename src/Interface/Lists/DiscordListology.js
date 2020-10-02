const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the DiscordListology service.
 * @see https://discordlistology.com/developer/documentation
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordListology extends ServiceBase {
  static get aliases() {
    return ['discordlistology'];
  }

  static get logoURL() {
    return 'https://discordlistology.com/idiscord.png';
  }

  static get name() {
    return 'DiscordListology';
  }

  static get websiteURL() {
    return 'https://discordlistology.com/';
  }

  static get baseURL() {
    return 'https://discordlistology.com/api/v1';
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
        {
          servers: Util.resolveCount(serverCount),
          shards: shard.count
        } :
        { servers: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the bot's stats listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotStats(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/stats` });
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} userID The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  userVotedBot(id, userID) {
    return this._request({ url: `/bots/${Util.resolveID(userID)}/hasvoted/${Util.resolveID(id)}` });
  }

  /**
   * Gets the guild's stats listed on this service.
   * @param {IDResolvable} id The guild's ID
   * @returns {Promise<AxiosResponse>}
   */
  getGuildStats(id) {
    return this._request({ url: `/guilds/${Util.resolveID(id)}/stats` });
  }

  /**
   * Checks whether or not a user has voted for a guild on this service.
   * @param {IDResolvable} id The guild's ID
   * @param {IDResolvable} userID The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  userVotedGuild(id, userID) {
    return this._request({ url: `/guilds/${Util.resolveID(userID)}/hasvoted/${Util.resolveID(id)}` });
  }
}

module.exports = DiscordListology;
