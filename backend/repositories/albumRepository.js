var connection = require('../db/dbconnect.js');
var Album = require('../schemas/album.js');
var Repository = require('./generalRepository.js');
var Artist = require('../schemas/artist.js');

function AlbumRepository(){
	Repository.prototype.constructor.call(this);
	this.schema = Album;
	this.model = Album;
}

//AlbumRepository.prototype = new Repository();

AlbumRepository.prototype.getById = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}).populate('singer').populate('tracks');
	query.exec(callback);
};

AlbumRepository.prototype.getAll = function(genre, callback) {
	var model = this.model;
	console.log(genre);
	var query = model.find({genres: {$in : [genre]}}).populate('singer').populate('tracks').limit(50);
	query.exec(callback);
};

AlbumRepository.prototype.getByTitle = function(name, limit, quick, callback) {
	var model = this.model;
	var lim = limit || '';
	var q = quick || '';
	regexp = new RegExp(q + name, "i");
	var query = model.find({title: regexp}).populate('singer').populate('tracks').limit(lim);
	query.exec(callback);
};

AlbumRepository.prototype.getCover = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}, 'cover');
	query.exec(callback);
};

AlbumRepository.prototype.getSinger = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}, 'singer').populate('singer');
	query.exec(callback);
};

AlbumRepository.prototype.getGenres = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}, 'genres');
	query.exec(callback);
};

AlbumRepository.prototype.getTracks = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}, 'tracks').populate('tracks');
	query.exec(function(err, data){
		var opts = [
			{ path: 'singer', model: 'Artist' }
		];
		Artist.populate(data.tracks, opts, callback);
	});
};

AlbumRepository.prototype.getComments = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id}, 'comment').populate('comment.user_auth_id').exec(callback);
};

AlbumRepository.prototype.addComments = function(id, body, callback) {
	var model = this.model;
	var query = model.findOneAndUpdate({_id: id},{$push: {comment:body}} );
	query.exec(callback);
};

module.exports = new AlbumRepository();