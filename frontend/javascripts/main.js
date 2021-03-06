require.config({
	baseUrl: '/javascripts',

	paths: {
		jquery: '../../bower_components/jquery/dist/jquery.min',
		underscore: '../../bower_components/underscore/underscore',
		socketio: '../../bower_components/socket.io-client/socket.io',
		backbone: '../../bower_components/backbone/backbone',
		marionette: '../../bower_components/marionette/lib/backbone.marionette',
		localStorage: './libs/backbone.localStorage',
		clipboard: '../../bower_components/zeroclipboard/dist/ZeroClipboard',
		fetchCache: '../../bower_components/backbone-fetch-cache/backbone.fetch-cache',
		emojione: '../../bower_components/emojione/lib/js/emojione'
	},

	shim: {
		'clipboard': {
			exports: 'ZeroClipboard'
		},
		'emojione': {
			exports: 'emojione'
		}

	}
});

require(['../../bower_components/jquery-ui/ui/sortable', '../../bower_components/jquery-ui/ui/draggable', '../../bower_components/jquery-ui/ui/droppable', 'fetchCache', 'localStorage'], function(){
	var oldGetCache = Backbone.fetchCache.getCacheKey;
	Backbone.fetchCache.getCacheKey = function(){
		try{
			return oldGetCache.apply(this, [].slice.call(arguments));
		} catch(e) {

		}
	};
	require(['app/app']);
});