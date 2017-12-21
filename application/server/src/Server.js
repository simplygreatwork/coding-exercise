
var Class = require('./Class.js');
var path = require('path');
var parser = require('code-parser');
var Store = parser.Store;

Server = module.exports = Class.extend({
	
	initialize: function(properties) {
		
		this.initializeData();
		this.initializeServer();
	},
	
	initializeData : function() {
		
		this.store = new Store({
			path : path.resolve('data/example.h')
		});
	},
	
	initializeServer : function() {
		
		var http = require('http');
		var Express = require('express');
		var express = Express();
		express.use('/', Express.static(path.join(process.env.PWD, '../client')));
		var server = http.createServer(express);
		var port = process.env.PORT || 8080;
		server.listen(port, process.env.IP);
		console.log('Listening on port: ' + port);
		var io = require('socket.io').listen(server);
		io.on('connection', function(socket) {
			socket.on('read', function(data, respond) {
				var items = this.store.read();
				respond(items);
			}.bind(this));
			socket.on('write', function(items, respond) {
				this.store.write(items);
				respond({});
			}.bind(this));
			socket.on('disconnect', function() {
				console.log('A client has disconnected.');
			}.bind(this));
		}.bind(this));
	}
});
