"use strict";

import utility from "../Utility";
import response from "../../Response";
import transformer from "./transformer";


let ObjectId = utility.objectId;
let parameter = utility.parameter;
let repository = utility.repository;
let phoneValidation = utility.phoneValidation;
let emailValidation = utility.emailValidation;
let checkDuplicateModelEntity = utility.checkDuplicateModelEntity;

let updateProfile = function(User, request, body, callback) {
	User.getDataSource().connector.connect((err, db)=> {
		if(err)
			return callback(response.constant.connection_err, null)
		/**
		 * set all parameters 
		 */
		parameter.prototype.db = db;
		parameter.prototype.body = body;
		parameter.prototype.appModel = User;
		parameter.prototype.request = request;
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
	findUserProfile(args);
	
}

let findUserProfile = (args)=> {
	let userCollection = args.db.collection("user");
	let findQuery = {
		_id: ObjectId(args.request.headers.userid, args.callback),
		active: true
	}
	repository.findOne(userCollection, findQuery, function(userObject){
		if(!userObject)
			return args.callback(response.constant.user_not_found, null);
		args.optional["userObject"] = userObject;
		checkUserDuplication(args);
	}, args.callback);

}

let checkUserDuplication = (args)=>{
	let userModel = transformer.user.updateModel(args.body);
	args.optional["userModel"] = userModel;
	// orCondition is use to check the duplication except itself.
	let orCondition = transformer.user.queryMaker(args, userModel);
	let userCollection = args.db.collection("user");
	if(!orCondition.length)
		return args.callback(response.constant.user_already_updated, null)
	checkDuplicateModelEntity(userCollection, orCondition, function(err, ops){
		if(err){
			let errorResponse = Object(response.constant.user_profile_duplicate);
			errorResponse.msg = err.msg;
			return args.callback(errorResponse, null);
		}
		else
			updateUserProfile(args);
	}, args.callback);
}

let updateUserProfile = (args)=>{
	let userCollection = args.db.collection("user");
	repository.updateOne(userCollection, {
		_id: ObjectId(args.request.headers.userid, args.callback)
	}, args.optional.userModel, function(dbResponse){
		let successResponse = Object(response.constant.user_profile_updated);
		successResponse["data"] = transformer.user.response(dbResponse);
		args.callback(null, successResponse);
	}, args.callback);
}

module.exports = updateProfile;