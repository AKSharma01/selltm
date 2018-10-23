"use strict";

import jwt from 'jsonwebtoken';
import config from '../../env.json';
import response from "../../Response";

function jwtTokenGenerator(id, callback, fcallback){
	let request = {
		user_id: id
	}
	let key = config.jwt.secret;
	let timeOut = {
		expiresIn: config.jwt.expiry_days
	}
	jwt.sign(request, key, timeOut, function (err, token) {
		if(err){
			console.log("JWT Error");
			return fcallback(response.constant.jwt_err, null);
		}
		callback(token);
	})
}

function jwtTokenVerify(token, callback){
	jwt.verify(token, config.jwt.secret, function (err, decoded) {
		if (err) {
			console.log("JWT Token Verification Error");
			return callback({
				message: "JWT Token Verification Error"
			}, null);
		}
		callback(null, decoded);
	});
}

module.exports = {
	jwtTokenVerify: jwtTokenVerify,
	jwtTokenGenerator: jwtTokenGenerator
}