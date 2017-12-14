const FormatRequest = require('../Utils/FormatRequest')

/**
 * Represents a service
 * @constructor
 * @param {String} token The token/key for the service
 */
class ServiceBase {
	constructor(token){
		this.token = token;
	}
	_request(form, requiresToken){
		if(requiresToken && !this.token) throw new Error('This function requires a token')
		return FormatRequest(form);
	}
}

module.exports = ServiceBase;