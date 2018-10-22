"use strict";

let model = (userObject)=>{
	return {
		"first_name": userObject.firstName,
		"last_name": userObject.lastName,
		"email_id": userObject.email,
		"ph_no": userObject.phone,
		"whatsapp_no": userObject.whatsAppNo,
		"pin_no": userObject.pin? userObject.pin: "",
		"bank_account_no": userObject.accountNo? userObject.accountNo: ""
	}
}

let response = (userObject)=>{
	return {
		id: userObject.id? userObject.id: "",
		firstName: userObject.first_name? userObject.first_name: "",
		lastName: userObject.last_name? userObject.last_name: "",
		email: userObject.email_id? userObject.email_id: "",
		phone: userObject.ph_no? userObject.ph_no: "",
		pin: userObject.pin_no? userObject.pin_no: "",
		accountNo: userObject.bank_account_no? userObject.bank_account_no: ""
	}
}

module.exports = {
	model: model,
	response: response
}