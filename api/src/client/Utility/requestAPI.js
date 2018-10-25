"use strict";
import request from 'request';
import response from '../../Response';

function get(url, optional={}, callback){
	request.get(url, optional, function(err, data){
		if(err)
			return callback(err, null)
		else
			callback(null, {
				data: data,
				message: "success"
			});
	});
}

function post(url, optional={}, callback){
	request.post({
		url: url,
		headers: optional.headers,
		body: optional.body
	}, function(err, data){
		if(err){
			return callback({
				data: null,
				message: err.message
			}, null)
		}
		else{
			return callback(null, {
				data: data,
				message: "success"
			});
		}
	});
}


let requestAPI = function (url, method, optional, callback) {
	try{
		switch(method){
			case 'get':
			case 'GET': get(url, optional, callback);
				break;
			case 'post':
			case 'POST': post(url, optional, callback);
				break;
			default: throw "Yet get and post is defined"
		}
	}catch(exception){
		console.log("Exception: ", exception);

		callback({
			data: null, 
			message: exception.message
		}, null);
	}
}

module.exports = requestAPI;