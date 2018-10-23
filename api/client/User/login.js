"use strict";

import msg91 from "../MSG91";
import utility from "../Utility";
import response from "../../Response";
import transformer from "./transformer";


let parameter = utility.parameter;
let repository = utility.repository;
let phoneValidation = utility.phoneValidation;
let emailValidation = utility.emailValidation;
let checkDuplicateModelEntity = utility.checkDuplicateModelEntity;

let login = function(User, body, callback) {
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
		validatePayload(args);
	});
}

function validatePayload(args){
	if(!phoneValidation(args.body.phone))
		return args.callback(response.constant.phone_fromat_err, null)
	findUserAndSendOtp(args);
	
}

let findUserAndSendOtp = (args)=>{
	let userCollection = args.db.collection("user");
	repository.findOne(userCollection, {
		ph_no: args.body.phone,
		active: true
	}, function(userObject){
		if(!userObject)
			return args.callback(response.constant.user_not_found, null);
		sendOtpOnMobile(args);
	}, args.callback);
}

let sendOtpOnMobile = (args)=>{
	let sendOTPObject = msg91.helper.urlSendOTP(args.body.phone);
	msg91.controller.OTPRequest(sendOTPObject.url, sendOTPObject.method, function(err, send){
		if(err){
			console.log("err: ", err);
			return args.callback({
				status: 417,
				msg: "msg sending error"
			});
		}
		else
			return args.callback(null, {
				status: 200,
				msg: "otp send successfully",
				data: null
			});
	});
}

module.exports = login;