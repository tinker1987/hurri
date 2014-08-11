var config = require('../config');

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');

if (config.db.mocked_db){
	console.log('Mockgoose...');
	var Mongoose = mongoose.Mongoose;
	mongoose = new Mongoose();
	mockgoose(mongoose);
	mongoose.mockgoose = mockgoose;
} 

module.exports = mongoose;
