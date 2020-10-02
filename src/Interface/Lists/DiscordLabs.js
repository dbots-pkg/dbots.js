const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Discord Labs service.
 * @see https://docs.discordlabs.org/docs/api/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordLabs extends ServiceBase {
  static get aliases() {
    return ['discordlabs', 'discord-labs', 'discordlabs.org', 'bots.discordlabs.org'];
  }

  static get logoURL() {
    return 'https://avatars2.githubusercontent.com/u/54491479?v=4';
  }

  static get name() {
    return 'Discord Labs';
  }

  static get websiteURL() {
    return 'https://bots.discordlabs.org/';
  }

  static get baseURL() {
    return 'https://bots.discordlabs.org/v2';
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
      data: shard
        ? {
          token,
          server_count: Util.resolveCount(serverCount),
          shard_count: shard.count
        }
        : {
          token,
          server_count: Util.resolveCount(serverCount)
        }
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
}

module.exports = DiscordLabs;
