const snekfetch = require('snekfetch');

/*
{
	method: '',
	url: '',
	headers: { ... },
	body: { ... }
}
*/
module.exports = function FormatRequest(options) {
	if(!options.method) options.method = 'get';
	let request = snekfetch[options.method](options.url, { query: options.query });
	if(options.headers) Object.keys(options.headers).map(k => request.set(k, options.headers[k]));
	if(options.method === 'post') request.send(options.body);
	return request.end();
}