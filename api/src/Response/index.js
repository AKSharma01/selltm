"use strict";

import errorResponse from "./failed";
import successResponse from "./success";
import httpConstant from "./httpConstant";

module.exports = {
	failed: errorResponse,
	constant: httpConstant,
	success: successResponse
}