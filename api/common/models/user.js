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

	User.resend = function(body, callback) {
		user.resend(User, body, function(errResponse, successResponse){
			if(errResponse)
				return response.failed(errResponse.status, errResponse.msg, callback);
			else
				return response.success(successResponse.data, successResponse.status, successResponse.msg, callback);
		})
	};

	User.verify = function(body, callback){
		user.verify(User, body, function(errResponse, jwtToken){
			if(errResponse)
				return response.failed(errResponse.status, errResponse.msg, callback);
			else{
				user.activateOrReturn(User, body, jwtToken, function(errResponse, successResponse){
					if(errResponse)
						return response.failed(errResponse.status, errResponse.msg, callback);
					else
						return response.success(successResponse.data, successResponse.status, successResponse.msg, callback);
				})
			}
		})
	};

	User.login = function(body, callback){
		user.login(User, body, function(errResponse, successResponse){
			if(errResponse)
				return response.failed(errResponse.status, errResponse.msg, callback);
			else
				return response.success(successResponse.data, successResponse.status, successResponse.msg, callback);
		})
	}

	User.updateProfile = (request, body, callback)=> {
		user.updateProfile(User, request, body, function(errResponse, successResponse){
			if(errResponse)
				return response.failed(errResponse.status, errResponse.msg, callback);
			else{
				console.log("successResponse: ", successResponse);
				return response.success(successResponse.data, successResponse.status, successResponse.msg, callback);
			}
		})
	}
};
