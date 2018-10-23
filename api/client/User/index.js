"use strict";

import login from "./login";
import resend from "./resend";
import verify from "./verify";
import register from "./register";
import activateOrReturn from "./activateOrReturn";

module.exports = {
	login: login,
	resend: resend,
	verify: verify,
	register: register,
	activateOrReturn: activateOrReturn,
}