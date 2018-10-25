"use strict";

let model = (userObject)=>{
	let dateTime = new Date();
	return {
		"first_name": userObject.firstName,
		"last_name": userObject.lastName,
		"email_id": userObject.email,
		"ph_no": userObject.phone,
		"whatsapp_no": userObject.whatsAppNo,
		"pin_no": userObject.pin? userObject.pin: "",
		"bank_account_no": userObject.accountNo? userObject.accountNo: "",
		"active": false,
		"active_at": dateTime,
		"created_at": dateTime,
		"updated_at": dateTime,
		"deleted_at": null
	}
}

let updateModel = (userObject)=> {
	let dateTime = new Date();
	return {
		"first_name": userObject.firstName,
		"last_name": userObject.lastName,
		"email_id": userObject.email,
		"ph_no": userObject.phone,
		"whatsapp_no": userObject.whatsAppNo,
		"pin_no": userObject.pin,
		"bank_account_no": userObject.accountNo,
		"updated_at": dateTime
	}
}

let response = (userObject)=>{
	return {
		id: userObject.id||userObject._id? userObject.id||userObject._id: "",
		firstName: userObject.first_name? userObject.first_name: "",
		lastName: userObject.last_name? userObject.last_name: "",
		email: userObject.email_id? userObject.email_id: "",
		phone: userObject.ph_no? userObject.ph_no: "",
		pin: userObject.pin_no? userObject.pin_no: "",
		accountNo: userObject.bank_account_no? userObject.bank_account_no: "",
		active: userObject.active? userObject.active: false,
		activeAt: userObject.active_at? userObject.active_at: null,
		createdAt: userObject.created_at? userObject.created_at: null,
		updatedAt: userObject.updated_at? userObject.updated_at: null,
		deletedAt: userObject.deleted_at? userObject.deleted_at: null
	}
}

let queryMaker = (args, userModel) => {
	let orCondition = [];
	userModel.first_name && userModel.first_name != args.optional.userObject.first_name? orCondition.push({
		first_name: userModel.first_name
	}): "";
	userModel.last_name && userModel.last_name != args.optional.userObject.last_name? orCondition.push({
		last_name: userModel.last_name
	}): "";
	userModel.email_id && userModel.email_id != args.optional.userObject.email_id? orCondition.push({
		email_id: userModel.email_id
	}): "";
	userModel.ph_no && userModel.ph_no != args.optional.userObject.ph_no? orCondition.push({
		ph_no: userModel.ph_no
	}): "";
	userModel.whatsapp_no && userModel.whatsapp_no != args.optional.userObject.whatsapp_no? orCondition.push({
		whatsapp_no: userModel.whatsapp_no
	}): "";
	userModel.pin_no && userModel.pin_no != args.optional.userObject.pin_no? orCondition.push({
		pin_no: userModel.pin_no
	}): "";
	userModel.bank_account_no && userModel.bank_account_no != args.optional.userObject.bank_account_no? orCondition.push({
		bank_account_no: userModel.bank_account_no
	}): "";
	return orCondition;
}

module.exports = {
	model: model,
	response: response,
	queryMaker: queryMaker,
	updateModel: updateModel
}