'use strict';

import user from "../../client/User";
import response from "../../Response";

module.exports = function(User) {
	/**
	 * registration for new user by the valid phone no.
	 * @param {object} body 
	 * @param {Function(Error, object)} callback
	 */

	User.register = function(body, callback) {
		user.register(User, body, function(errResponse, successResponse){
			if(errResponse)
				return response.failed(errResponse.status, errResponse.msg, callback);
			else
				return response.success(successResponse.data, successResponse.status, successResponse.msg, callback);
		})
	};
};
