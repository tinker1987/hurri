define(['backbone', '../../song/SongModel'], function(Backbone, SongModel){
var ListenedCollection = Backbone.Collection.extend({
	model: SongModel
});

listenedCollection = new ListenedCollection();

return listenedCollection;	
});

