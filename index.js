var request = require('request');

module.exports = function (context, callback) {
	var requiredParams = [
		'MAKER_KEY',
		'MAKER_URL',
		'MAKER_EVENT'
	];
	
	function getMakerEndpoint () {
		/* ************************************* 
		Maker endpoints take the following form:
		https://maker.ifttt.com/trigger/{event}/with/key/{key}
		************************************* */
		var endpoint = context.data.MAKER_URL;
		var lastUrlChar = endpoint.substring(endpoint.length() + 1);
		
		if (lastUrlChar !== '/') {
			endpoint += '/';	
		}
		
		endpoint += context.data.MAKER_EVENT + '/with/key/' + context.data.MAKER_KEY;
		
		return endpoint;		
	}
	
	function getRequestBody () {
		/* *************************************
		Maker endpoints can only accept 3 optional 
		"values" in the request body.
		************************************* */
		
		var body = {};
		
		if (context.data.value1) {
			body.value1 = context.data.value1;
		}
		
		if (context.data.value2) {
			body.value2 = context.data.value2;
		}
		
		if (context.data.value3) {
			body.value3 = context.data.value3;
		}
		
		return body;
	}
	
	requiredParams.forEach(function (p) {
		if (!context.data[requiredParams[p]]) {
			return callback(new Error('The ' + requiredParams[p] + 'parameter must be provided'));
		}
	});
	
	request({
		method: 'POST',
		url: getMakerEndpoint(),
		json: true,
		body: getRequestBody()
	}, function (error, res, body) {
		callback(error, body);
	});
};