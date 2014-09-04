var connection = require('../db/dbconnect.js');
var Artist = require('../schemas/artist.js');
var Repository = require('./generalRepository.js');

function ArtistRepository(){
	Repository.prototype.constructor.call(this);
	this.model = Artist;
}

//ArtistRepository.prototype = new Repository();

ArtistRepository.prototype.getById = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}).populate('albums_id');
	query.exec(callback);
};

ArtistRepository.prototype.getByName = function(name, limit, quick, callback) {
	console.log(limit);
	var model = this.model;
	var lim = limit || '';
	var q = quick || '';
	regexp = new RegExp(q+name, "i");
	var query = model.find({name: regexp}).limit(lim);
	query.exec(callback);
};



module.exports = new ArtistRepository();
