'use strict';

import response from "../../Response";
import activity from "../../client/Activity";

module.exports = function(Activity) {

	Activity.orders = (request, body, callback)=>{
		activity.orders(Activity, request, body, function(errResponse, successResponse){
			if(errResponse)
				return response.failed(errResponse.status, errResponse.msg, callback);
			else
				return response.success(successResponse.data, successResponse.status, successResponse.msg, callback);
		})
	}
	Activity.remoteMethod("orders", {
      "accepts": [
        {
          "arg": "request",
          "type": "object",
          "required": true,
          "description": "",
          "http": {
            "source": "req"
          }
        }, {
          "arg": "body",
          "type": "object",
          "required": true,
          "description": "",
          "http": {
            "source": "body"
          }
        }
      ],
      "returns": {
        "type": "object",
        "root": true
      },
      "description": "get all order detials",
      "http": [
        {
          "path": "/getAllOrder",
          "verb": "get"
        }
      ]
    });
};
