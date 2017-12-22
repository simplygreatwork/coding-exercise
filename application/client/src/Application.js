
Application = Class.extend({
	
	initialize: function() {
		
		window.application = this;
		this.items = [];
		this.initializeView();
		this.initializeConnection(function() {
			this.read();
		}.bind(this));
	},
	
	initializeConnection: function(callback) {
		
		var io = window.io;
		this.socket = io.connect(window.location.host);
		this.socket.on('connect', function() {
			callback();
		}.bind(this));
		this.socket.on('disconnect', function() {
			this.items = [];
		}.bind(this));
	},
	
	initializeView : function() {
		
		this.views = {};
		this.views.main = new Vue({
			el: '#app',
			components: {
				'list-view': httpVueLoader('tags/list-view.vue'),
				'edit-view': httpVueLoader('tags/edit-view.vue')
			},
			data : application.data = {
				drawer : true,
				snackbar: false,
				y: 'bottom',
				x: null,
				mode: '',
				timeout: 5000,
				message: ''
			}
		});
	},
	
	read : function() {
		
		this.socket.emit('read', {}, function(result) {
			result.forEach(function(each) {
				this.items.push(each);
			}.bind(this));
		}.bind(this));
	},
	
	write : function() {
		
		this.socket.emit('write', this.items, function(result) {
			application.data.message = 'The changes have been saved.';
			application.data.snackbar = true;
		}.bind(this));
	}
});
