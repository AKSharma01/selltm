"use strict";

import msg91 from "../MSG91";
import utility from "../Utility";
import response from "../../Response";
import transformer from "./transformer";


let jwt = utility.jwt;
let parameter = utility.parameter;
let repository = utility.repository;
let phoneValidation = utility.phoneValidation;


let verify = function(User, body, callback) {
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
	verifyOtp(args);
}

let verifyOtp = (args)=>{
	let sendOTPObject = msg91.helper.urlVerifyOTP(args.body.phone, args.body.otp);
	msg91.controller.OTPRequest(sendOTPObject.url, sendOTPObject.method, function(err, verify){
		if(err){
			let errorResponse = {
				status: 417,
				msg: err
			}
			args.callback(errorResponse, null);
		}else {
			let otpResponse = JSON.parse(verify.data.body);
			console.log("otpResponse: ", otpResponse);
			if(otpResponse.type == "success"){
				console.log("active user");
				jwtToken(args)
			}else{
				// jwtToken(args)
				args.callback({
					status: 400,
					msg: otpResponse.message
				}, null);
			}
		}
	});
}

let jwtToken = (args)=>{
	let userCollection = args.db.collection("user");
	repository.findOne(userCollection, {
		ph_no: args.body.phone
	}, function(userObject){
		if(!userObject)
			return args.callback(response.constant.user_not_found, null);
		let userId = String(userObject._id);
		jwt.jwtTokenGenerator(userId, function(token){
			return args.callback(null, token);
		}, args.callback)
	}, args.callback);
}

module.exports = verify;