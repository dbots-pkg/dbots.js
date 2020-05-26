const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Discord Bot List service.
 * @see https://discordbotlist.com/api-docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotList extends ServiceBase {
  static get aliases() {
    return ['discordbotlist', 'discordbotlist.com', 'dbotlist'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discordbotlist.com';
  }

  static get name() {
    return 'Discord Bot List';
  }

  static get websiteURL() {
    return 'https://discordbotlist.com';
  }

  static get baseURL() {
    return 'https://discordbotlist.com/api/v1';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {CountResolvable} options.userCount The amount of users that the client cached
   * @param {CountResolvable} options.voiceConnections The amount of voice connections the client has
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, shard, userCount, voiceConnections }) {
    const data = { guilds: Util.resolveCount(serverCount) };
    if (shard)
      data.shard_id = shard.id;
    if (userCount)
      data.users = Util.resolveCount(userCount);
    if (voiceConnections)
      data.voice_connections = Util.resolveCount(voiceConnections);

    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: `Bot ${token}` },
      data
    });
  }
}

module.exports = DiscordBotList;
