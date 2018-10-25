"use strict";

let mongoId = require('mongodb').ObjectID;

function ObjectID(id, callback) {
	try{
		return mongoId(id)
	}catch(exception){
		console.log("exception: ", exception);
		return callback({
			msg: "id is not valid",
			status: "400"
		});
	}
}

module.exports = ObjectID; 