
// Run this file with the command: npm test

const Class = require('../src/Class.js');
const Store = require('../src/Store.js');
const path = require('path');
const fs = require('fs');

Runner = Class.extend({
	
	initialize : function(properties) {
		
	    this.run();
	},
	
	run : function() {
		
		var runner = this;
		var test = require('tape');
        
		test('Read, update, and compare with an expected result.', function(assert) {
			
			var expected = fs.readFileSync('./tests/data/expected.h', 'utf8');
    		var store = new Store({
    			path : path.resolve('./tests/data/source.h')
    		});
    		var items = store.read();
    		items.forEach(function(each) {
    			each.value = each.value + '0';
    			each.comment = each.comment + '!';
    		});
    		store.update(items);
			assert.equals(store.source, expected, 'Does the rewritten source code match the expected result?');
			assert.end();
		});
		
		test.onFinish(function() {
			
			console.log('All tests have finished.');
			process.exit(0);
		});
	}
});

new Runner({});
