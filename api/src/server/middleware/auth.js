'use strict'
import response from '../../Response';
import utility from '../../client/Utility';
import routes from './routes.json';
import app from '../server';

let repository = utility.repository;

let auth = function(req, res, next){
	
	/* req._parsedUrl.pathname will return the api url.
	 */
	let authRequired = req._parsedUrl.pathname;
	let allow = routes.allow;
	let regexUrl = routes.regex;
	let verified = false;

	// let setPasswordUrlRegex = new RegExp("/api/haulers/setpassword(/?|/\w+)"); 
	for(let i=0 ; i<allow.length; i++){
		if(allow[i].url === authRequired){
			console.log("auth not required");
			verified = true;
			next();
			break;
		}
	}
	
	if(!verified){
		verifyUserToken(req, function(err, verified){
			if(err){
				res.statusCode = err.statusCode||err.status;
				res.json({
					error: {
						statusCode: err.statusCode||err.status,
						message: err.message||err.msg
					}
				});
			}else if(verified)
				next();
		});
	}
}

function verifyUserToken(request, callback){
	utility.jwt.jwtTokenVerify(request.headers.token, function(error, jwtResponse){
		if(error){
			console.log("jwt token expire or not valid");
			return callback({
				statusCode: 400,
				message: error.message
			}, null);
		}

		return tokenValidation(request, jwtResponse, callback);
	}, callback)
}


function tokenValidation(request, jwtResponse, callback){
	let userModel = app.models.user;
	if(!request.headers.userid)
		return callback({
			statusCode: 400,
			message: "user not found"
		});
	let query = {
		where: {
			_id: request.headers.userid,
			active: true
		}
	}
	repository.findOne(userModel, query, function(data){
		if(!data)
			return callback({
			statusCode: 401,
			message: "hauler not found"
		}, null);
		if(jwtResponse.user_id !== String(data.id)){
			console.log("token has not been verified");
			return callback({
				statusCode: 400,
				message: "token id mismatch"
			}, null)
		}
		request.headers.userid = jwtResponse.user_id;
		callback(null, true);
	}, callback);
}

module.exports = function () {
	return auth;
}