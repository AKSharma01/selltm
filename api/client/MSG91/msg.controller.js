"use strict";

import utility from "../Utility";

let requestAPI = utility.requestAPI;

let sendOTP = (url, method)=>{
	requestAPI(url, method, {}, function(err, success){
		if(err)
			console.log("err: ", err);
		else
			console.log("success: ");
	})
}

module.exports = {
	sendOTP: sendOTP
}