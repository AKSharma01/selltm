"use strict";

let successResponse = function (data, statusCode, message, callback) {
	callback(null, {
		data: data,
		statusCode: statusCode,
		message: message,
		type: "success"
	});
}

module.exports = successResponse;