var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
	_id : Schema.Types.ObjectId,
    title : String,
    cover : String,
    duration : Number,
    release_date : Date,
    singer : { singer_id : Schema.Types.ObjectId },
    genres : [String],
    comment : [{_id : Schema.Types.ObjectId, user_auth_id : Schema.Types.ObjectId, comment : String, date : Date}],
    tracks : [Schema.Types.ObjectId]
})