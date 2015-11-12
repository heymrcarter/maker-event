var request = require('request');

return function (context, callback) {
	var requiredParams = [
		'MAKER_ENDPOINT'
	];
	
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
	
	for (var p in requiredParams) {
		if (!context.data[requiredParams[p]]) {
			return callback(new Error('The ' + requiredParams[p] + ' parameter must be provided'));
		}
	};
	
	request({
		method: 'POST',
		url: context.data.MAKER_ENDPOINT,
		json: true,
		body: getRequestBody()
	}, function (error, res, body) {
		callback(error, body);
	});
}