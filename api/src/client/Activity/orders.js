"use strict";

import utility from "../Utility";
import response from "../../Response";

let ObjectId = utility.objectId;
let parameter = utility.parameter;
let repository = utility.repository;

let orders = function(Activity, request, body, callback) {
	Activity.getDataSource().connector.connect((err, db)=> {
		if(err)
			return callback(response.constant.connection_err, null)
		/**
		 * set all parameters 
		 */
		parameter.prototype.db = db;
		parameter.prototype.body = body;
		parameter.prototype.appModel = Activity;
		parameter.prototype.request = request;
		parameter.prototype.callback = callback;
		parameter.prototype.optional = {};
		let args = new parameter();
		getAllOrders(args);
	});
}

let getAllOrders = (args)=> {
	let activityCollection = args.db.collection("activity");
	repository.find(activityCollection, {
		user_id: ObjectId(args.request.headers.userid, args.callback)
	}, function(activityList){
		return args.callback(null, {
			data: activityList,
			status: 200,
			msg: "all activity list"
		});
	}, args.callback);
}

module.exports = orders;