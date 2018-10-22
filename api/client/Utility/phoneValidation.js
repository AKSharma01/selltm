"use strict";

let phoneValidation = (phoneNo)=>{
	var pattern = /^\d{10}$/;
	if(phoneNo.length >10)
		phoneNo = phoneNo.split("-").join("");
	return pattern.test(phoneNo);

}

module.exports = phoneValidation;