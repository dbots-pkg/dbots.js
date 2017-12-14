const ServiceBase = require('./ServiceBase')

/**
 * Represents the ls.terminal.inks service
 * @see https://ls.terminal.ink/docs/v1
 */
class lsTerminalInk extends ServiceBase {
	/**
	 * Tests the initialized token
	 * @param {string} id The ID of a bot that the token is in control of.
	 */
	test(id){
		return this._request({
			url: `https://ls.terminal.ink/api/v1/test/${id}`,
			headers: { Authorization: this.token }
		}, true)
	}

	/**
	 * Gets a list of bots on this service
	 */
	getBots(){
		return this._request({ url: `https://ls.terminal.ink/api/v1/bots` });
	}

	/**
	 * Gets the bot listed for this service
	 * @param {string} id The bot's ID.
	 */
	getBot(id){
		return this._request({ url: `https://ls.terminal.ink/api/v1/bots/${id}` });
	}

	/**
	 * Gets the embed picture for this bot
	 * @param {string} id The bot's ID.
	 * @param {Object} query The querystring that will be used in the request
	 */
	getBotEmbed(id, query){
		return this._request({ url: `https://ls.terminal.ink/api/v1/bots/${id}/embed`, query });
	}
}

module.exports = lsTerminalInk;