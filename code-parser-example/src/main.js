
var Class = require('./Class.js');
var parser = require('code-parser');
var Store = parser.Store;
var path = require('path');

Application = Class.extend({
	
	initialize : function() {
		
		var store = new Store({
			path : path.resolve('data/example.h')
		});
		var items = store.read();
		items.forEach(function(each) {
			each.value = each.value + '0';
			each.comment = each.comment + '!';
		});
		store.write(items);
		console.log('\r');
		console.log('RESULT WITH SUBSTITUTIONS');
		console.log('\r');
		console.log(store.source);
	}
});

new Application();
