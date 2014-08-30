define(['marionette', './SonglistView', '../app/context', './Behavior', '../playlist/PlaylistModel','../main/bars/playlist/PlaylistBarCollection'],
    function(Marionette, SonglistView, context, behavior, playlistModel,PlaylistBarCollection){

	var SonglistCollectionView = Marionette.CompositeView.extend({
		childView: SonglistView,
        template: '#sidebar-songlist-navi',
        behaviors: {
	        Sortable:{
	            containment:'parent' 
	        }
    	},

        childEvents: {
            'queue:recount': function (arg, num) {
                for (var i = 0; i < this.collection.length; i ++){
                    if (this.collection.models[i].attributes.queuepos > num )
                         this.collection.models[i].set({queuepos: this.collection.models[i].attributes.queuepos-1});
                }
            },
            'change-current': function(view, options){
               Backbone.trigger('scroll-to-top', options);
            }
        },
        events : {
            'click #unqueue' : 'unqueueSong',
            'click #save-playlist-from-queue' : 'savePlaylist'
        },

        unqueueSong: function(){
            playlistModel.set({queueNum : 0});
            for (var i = 0; i < this.collection.length; i ++){
                this.collection.models[i].set({queuepos: ''});
            }
        },

        savePlaylist: function(){
            var playlist = {
                name: "My playlist",
                tracks : [],
                duration : 0,
                mood : 'I like it!'
            };
            console.log(this.collection);
            for (var i = 0; i < this.collection.length; i ++){
               console.log( this.collection.models[i].get('_id') );
                playlist.tracks.push(this.collection.models[i].get('_id'));
            }
            Backbone.trigger('songlist:save-playlist', playlist);
        }
	});
	return SonglistCollectionView;
});

