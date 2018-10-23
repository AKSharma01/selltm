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

module.exports = {
	model: model,
	response: response
}