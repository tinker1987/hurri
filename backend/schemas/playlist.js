var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var playlistSchema = new Schema({ 
	name : {
		type: String, 
		default: 'Playlist'
	},
	tracks : [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Track' 
	}],
	owner_id: { 
		type: Schema.Types.ObjectId, 
		ref: 'Userauth' 
	},
	duration : { type: Number, min: 0 },
	mood : {
		type: String, 
		default: 'unknown'
	},
	created: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String, 
		default: 'default'
	},
	genre: {
		type: String, 
		default: 'unknown'
	}
});

module.exports = playlistSchema;
