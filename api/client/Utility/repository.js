"use strict";

import response from "../../Response";

let errorResponse = Object(response.constant.connection_err);

let find = function (collection, query, callback, fcallback) {
	collection.find(query).toArray(function(err, result){
		if(err){
			console.log("Find Query Error: ", err.message);
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	})
}

let findOne = function(collection, query, callback, fcallback){
	collection.findOne(query, function(err, result){
		if(err){
			console.log("FindOne Query Error");
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	})
}

let insert = function(collection, query, callback, fcallback){
	collection.insert(query, function(err, result){
		if(err){
			console.log("Insert Query Error");
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	})
}

let update = function(collection, findQuery, updateQuery, callback, fcallback){
	updateQuery = {
		$set: updateQuery
	}
	
	collection.update(findQuery, updateQuery, function(err, result){
		if(err){
			console.log("Update Query Error");
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		/** this findOne function will return corresponding response if find query entity would't
		 * modified after update query
		 */
		findOne(collection, findQuery, callback, fcallback);
	})
}

let updateAll = function(collection, findQuery, updateQuery, callback, fcallback){
	updateQuery = {
		$set: updateQuery
	}
	
	collection.update(findQuery, updateQuery, { multi: true }, function(err, result){
		if(err){
			console.log("UpdateAll Query Error");
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	})
}

let create = function(collection, query, callback, fcallback){
	collection.create(query, function(err, result){
		if(err){
			console.log("Create Query Error", err.message);
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	})
}

let findOnlyField = function(collection, query, fields, callback, fcallback){
	collection.find(query, fields).toArray(function(err, result){
		if(err){
			console.log("FindOnlyFieldQuery Error", err.message);
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	})
}

let aggregate = function(collection, query, callback, fcallback){
	collection.aggregate(query).toArray(function(err, result){
		if(err){
			console.log("Aggregate Query Error", err.message);
			errorResponse.msg = err.message;
			return fcallback(errorResponse, null);
		}
		callback(result);
	});
}

// ========================================================================================================
/**
 * 	to call 
 * respository.find(Driver, query, function(result){
		//some logic
 * }, callback);
 */
// ========================================================================================================


module.exports = {
	find: find,
	findOne: findOne,
	insert: insert,
	create: create,
	update: update,
	aggregate: aggregate,
	updateAll: updateAll,
	findOnlyField: findOnlyField
}