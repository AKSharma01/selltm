"use strict";

import msg91 from "../MSG91";
import utility from "../Utility";
import response from "../../Response";


let parameter = utility.parameter;
let repository = utility.repository;
let phoneValidation = utility.phoneValidation;


let resend = function(User, body, callback) {
	User.getDataSource().connector.connect((err, db)=> {
		if(err)
			return callback(response.constant.connection_err, null)
		/**
		 * set all parameters 
		 */
		parameter.prototype.db = db;
		parameter.prototype.body = body;
		parameter.prototype.appModel = User;
		parameter.prototype.callback = callback;
		parameter.prototype.optional = {};
		let args = new parameter();
		validatePhoneNo(args);
	});
}


let validatePhoneNo = (args)=>{
	if(!phoneValidation(args.body.phone))
		return args.callback(response.constant.phone_fromat_err, null)
	sendOtpAgain(args);
}

let sendOtpAgain = (args)=>{
	let sendOTPObject = msg91.helper.urlReSendOTP(args.body.phone);
	msg91.controller.OTPRequest(sendOTPObject.url, sendOTPObject.method, function(err, send){
		if(err){
			let errorResponse = {
				status: 417,
				msg: err
			}
			args.callback(errorResponse, null);
		}else {
			args.callback(null, {
				data: {
					phone: args.body.phone
				},
				status: 200,
				msg: "send successfully"
			});
		}
	});
}

module.exports = resend;