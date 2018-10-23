"use strict";

import msg91 from "../MSG91";
import utility from "../Utility";
import response from "../../Response";
import transformer from "./transformer";


let parameter = utility.parameter;
let repository = utility.repository;
let phoneValidation = utility.phoneValidation;


let activateOrReturn = function(User, body, token, callback) {
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
		parameter.prototype.optional = {
			token: token
		};
		let args = new parameter();
		findUser(args);
	});
}


let findUser = (args)=>{
	let userCollection = args.db.collection("user");
	repository.findOne(userCollection, {
		ph_no: args.body.phone
	}, function(userObject){
		args.optional["userObject"] = userObject;
		if(!userObject)
			return args.callback(response.constant.user_not_found, null);
		else if(!userObject.active){
			return activeUser(args);
		}
		return userResponse(args);
	}, args.callback)
}

let activeUser = (args)=> {
	let dateTime = new Date();
	let userCollection = args.db.collection("user");
	repository.updateOne(userCollection, {
		_id: args.optional.userObject._id
	}, {
		active: true,
		active_at: dateTime,
		updated_at: dateTime
	}, function(updatedUserObject){
		args.optional.userObject = updatedUserObject;
		userResponse(args);		
	}, args.callback)
}

let userResponse = (args)=>{
	let userResponse = transformer.user.response(args.optional.userObject);
	userResponse.token = args.optional.token;			
	let successResponse = Object(response.constant.phone_otp_verified);
	successResponse["data"] = userResponse;
	args.callback(null, successResponse);
}

module.exports = activateOrReturn;