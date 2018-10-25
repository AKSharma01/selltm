"use strict";

import utility from "../Utility";

let requestAPI = utility.requestAPI;

let OTPRequest = (url, method, callback)=>{
	requestAPI(url, method, {}, function(err, success){
		if(err){
			console.log("err: ", err);
			callback(err, null);
		}
		else{
			console.log("success: ");
			callback(null, success);
		}
	})
}

module.exports = {
	OTPRequest: OTPRequest
}