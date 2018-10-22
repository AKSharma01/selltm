"use strict";

let failedResponse = function(statusCode, message, callback){
	callback({
		statusCode: statusCode,
		message: message,
		type: "failure"
	}, null);
}

module.exports = failedResponse;