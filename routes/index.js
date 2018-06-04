
/*
 * routes/index.js
 *
 * Routes contains the functions (callbacks) associated with request urls.
 */

// our db model
var Information = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

exports.index = function(req, res) {

	var data = {
		status: 'OK',
		message: 'Welcome to the Web 1 - UNICEN v1 API'
	}

	// respond back with the data
	res.json(data);

}

function processSave(res, err,data){
	// if err saving, respond back with error
	if (err){
		var jsonData = {status:'ERROR', message: 'Error saving information'};
		return res.json(jsonData);
	}

	// now return the json data of the new person
	var jsonData = {
		status: 'OK',
		information: data
	}

	return res.json(jsonData);

}

/**
 * POST '/api/thing'
 * Receives a POST request of the new thing and group, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.create = function(req,res){

	// pull out the name and location
	var name = req.body.group;
	var thing = req.body.thing;

	if (!name || !thing){
		var jsonData = {status:'ERROR', message: 'You must send information to save.'};
		return res.status(400).json(jsonData)
	}

	var information = Information({
		group: name,
		thing: thing
	});

	// now, save that person to the database
	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save
	information.save(function(err,data) {
		processSave(res, err, data)
	});

}


/**
 * POST '/api/thing'
 * Receives a POST request of the new thing and group, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.createInGroup = function(req,res){
	var name = req.params.group;
	// pull out the location
	var thing = req.body.thing;
	console.log("Name ",name);
	console.log("Thing ", thing);
	if (!name || !thing){
		var jsonData = {status:'ERROR', message: 'You must send information to save.'};
		return res.status(400).json(jsonData)
	}

	var information = Information({
		group: name,
		thing: thing
	});

	// now, save that person to the database
	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save
	information.save(function(err,data) {
		processSave(res, err, data)
	});

}

/**
 * GET '/api/thing/:id'
 * Receives a GET request specifying the thing to get
 * @param  {String} req.params.id. The userId
 * @return {Object} JSON
 */
exports.getOne = function(req,res){
	var requestedId = req.params.id;
	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
	Information.findById(requestedId, function(err,data){
		// if err or no user found, respond with error
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find that information'};
  		return res.json(jsonData);
  	}
  	// otherwise respond with JSON data of the user
  	var jsonData = {
  		status: 'OK',
  		information: data
  	}
  	return res.json(jsonData);
	})
}

/**
 * GET '/api/thing/group/:id'
 * Receives a GET request specifying the group to get all the thing for that group.
 * @param  {String} req.params.id. The userId
 * @return {Object} JSON
 */
exports.getByGroup = function(req,res){

	var requestedGroup = req.params.group;

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
	Information.find({ group: requestedGroup }, function(err,data){

		// if err or no user found, respond with error
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find that group'};
  		 return res.json(jsonData);
  	}
  	// otherwise respond with JSON data of the user
  	var jsonData = {
  		status: 'OK',
  		information: data
  	}
  	return res.json(jsonData);

	})


}

/**
 * GET '/api/thing'
 * Receives a GET request to get all the things.
 * @return {Object} JSON
 */

exports.getAll = function(req,res){

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
	Information.find(function(err, data){
		// if err or no users found, respond with error
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find information'};
  		return res.json(jsonData);
  	}

  	// otherwise, respond with the data

  	var jsonData = {
  		status: 'OK',
  		information: data
  	}

  	res.json(jsonData);

	})

}

/**
 * PUT '/api/:id'
 * Receives a PUT request with data of the thing to update, updates db, responds back
 * @param  {String} req.params.id. The userId to update
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.update = function(req,res){

	var requestedId = req.params.id;

	// pull out the group and thing
	//var group = req.body.group;
	var thing = req.body.thing;

	var dataToUpdate = {
		//group: group,
		thing: thing
	};

	Information.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
  	if (err){
  		var jsonData = {status:'ERROR', message: 'Error updating thing'};
  		return res.json(jsonData);
  	}

  	// now return the json data of the new person
  	var jsonData = {
  		status: 'OK',
  		person: data
  	}

  	return res.json(jsonData);
  });
}

/**
 * Delete '/api/thing/:id'
 * Receives a DELETE request specifying the thing to delete
 * @param  {String} req.params.id. The userId
 * @return {Object} JSON
 */

exports.remove = function(req,res){

	var requestedId = req.params.id;

	// Mongoose method, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
	Information.findByIdAndRemove(requestedId,function(err, data){
		if(err || data == null){
  		var jsonData = {status:'ERROR', message: 'Could not find that information to delete'};
  		return res.json(jsonData);
		}

		// otherwise, respond back with success
		var jsonData = {
			status: 'OK',
			message: 'Successfully deleted id ' + requestedId
		}

		res.json(jsonData);

	})

}


/**
 * GET '/api/html'
 * Receives a GET request to retrive a piece of HTML
 * @return {Object} HTML
 */

exports.getHTML = function(req,res){
  	res.send("<h1>PARTIAL RENDER</h1><p>Este texto fue cargado con partiarl render usando AJAX!!!</p><button type=\"button\" class=\"btn btn-default js-comportamiento\">Boton</button>");
}
