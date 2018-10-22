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

let register = function(User, body, callback) {
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
		validateUserObject(args);
	});
}

function validateUserObject(args){
	if(!phoneValidation(args.body.phone))
		return args.callback(response.constant.phone_fromat_err, null)
	else if(!emailValidation(args.body.email))
		return args.callback(response.constant.email_fromat_err, null)
	checkUserDuplication(args);
	
}

let checkUserDuplication = (args)=>{
	let entityChecker = [{
		email_id: args.body.email
	}, {
		ph_no: args.body.phone
	}, {
		whatsapp_no: args.body.whatsAppNo
	}]
	let userCollection = args.db.collection("user");
	checkDuplicateModelEntity(userCollection, entityChecker, function(err, ops){
		if(err){
			let errorResponse = Object(response.constant.user_profile_duplicate);
			errorResponse.msg = err.msg;
			return args.callback(errorResponse, null);
		}
		else
			createUser(args);
	}, args.callback);
}

let createUser = (args)=>{
	let userModel = transformer.user.model(args.body);
	repository.create(args.appModel, userModel, function(dbResponse){
		let successResponse = Object(response.constant.user_profile_created);
		successResponse["data"] = transformer.user.response(dbResponse);
		sendOtpOnMobile(args);
		args.callback(null, successResponse);
	}, args.callback);
}

let sendOtpOnMobile = (args)=>{
	let sendOTPObject = msg91.helper.urlSendOTP(args.body.phone);
	msg91.controller.sendOTP(sendOTPObject.url, sendOTPObject.method);
}

module.exports = register;