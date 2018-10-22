"use strict";

import parameter from "./parameter";
import repository from "./repository";
import generateOTP from "./generateOTP";
import phoneValidation from "./phoneValidation";
import emailValidation from "./emailValidation";
import checkDuplicateModelEntity from "./checkDuplicateModelEntity";

module.exports = {
	parameter: parameter,
	repository: repository,
	generateOTP: generateOTP,
	phoneValidation: phoneValidation,
	emailValidation: emailValidation,
	checkDuplicateModelEntity: checkDuplicateModelEntity
}