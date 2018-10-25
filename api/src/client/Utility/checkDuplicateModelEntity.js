import repository from './repository';

function formating(opts, callback){
	if(opts.length){
		let errorMsgList = [];
		let errorMsgString = "";
		for(let i = 0; i<opts.length; i++){
			let temp = opts[i];
			errorMsgList.push({
				key: temp._id,
				msg: `${temp._id} already exist`
			});
			errorMsgString = `${errorMsgString}'${temp._id}', `;
		}
		errorMsgString = `${errorMsgString}already exist`;
		return callback({
			msg: errorMsgString
		}, null);
	}else
		callback(null, {
			msg: ""
		});
}

function checkDuplicateEntity(collection, entityCheckerList, callback, fcallback, ops=[]) {
	if(!entityCheckerList.length)
		return formating(ops, callback);
	let currentQuery = entityCheckerList.pop();
	let key = Object.keys(currentQuery)[0];
	let query = [{
		$match: currentQuery
	}, {
		$group: {
			_id: "$"+key,
			count: {
				$sum: 1
			}
		}
	}]
	repository.aggregate(collection, query, function(result){
		if(result[0])
			ops.push(result[0]);
		checkDuplicateEntity(collection, entityCheckerList, callback, fcallback, ops);
	}, fcallback)
}

module.exports = checkDuplicateEntity;