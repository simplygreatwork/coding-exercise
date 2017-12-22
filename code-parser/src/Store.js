
const Class = require('./Class.js');
const Utility = require('./Utility.js');
const { Document } = require('tree-sitter');
const C = require('tree-sitter-c');
const fs = require('fs');

Store = module.exports = Class.extend({
    
    initialize: function(properties) {
        
        Object.assign(this, properties);
    },
    
    read: function() {
        
        this.array = [];
        this.state = [];
        var document = new Document();
        document.setLanguage(C);
        this.source = fs.readFileSync(this.path, 'utf8');
        document.setInputString(this.source);
        document.parse();
        this.walk(document.rootNode);
        return this.array;
    },
    
    write : function(array) {
        
        this.update(array);
        fs.writeFileSync(this.path, this.source, 'utf8');
    },
    
    walk: function(node) {
        
        if (node.type == 'declaration') {
            this.state = [];
        }
        if (node.type == 'const') {
            this.state.push('const');
            this.array.push(this.item = {
                _metadata: {}
            });
        }
        if (Utility.Array.last(this.state) == 'const') {
            if (node.type.indexOf('_type') > -1) {
                this.item.type = this.resolve(node);
                this.item._metadata.type = node;
            }
            if (node.type == 'init_declarator') {
                this.state.push('init_declarator');
            }
        }
        if (Utility.Array.last(this.state) == 'init_declarator') {
            this.item.name = this.resolve(node.children[0]);
            this.item._metadata.name = node.children[0];
            this.item.value = this.resolve(node.children[2]);
            this.item._metadata.value = node.children[2];
            this.state.pop();
        }
        if (this.state[0] == 'const') {
            if (node.type == 'comment') {
                this.item.comment = this.resolve(node);
                this.item._metadata.comment = node;
            }
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach(function(each) {
                this.walk(each);
            }.bind(this));
        }
    },
    
    update: function(array) {
        
        for (var i = array.length - 1; i >= 0; i--) {
            var item = array[i];
            if (item._metadata.comment.startIndex > item._metadata.value.startIndex) {
                this.source = Utility.String.substitute(this.source, item.comment, item._metadata.comment.startIndex, item._metadata.comment.endIndex);
                this.source = Utility.String.substitute(this.source, item.value, item._metadata.value.startIndex, item._metadata.value.endIndex);
            } else {
                this.source = Utility.String.substitute(this.source, item.value, item._metadata.value.startIndex, item._metadata.value.endIndex);
                this.source = Utility.String.substitute(this.source, item.comment, item._metadata.comment.startIndex, item._metadata.comment.endIndex);
            }
        }
    },
    
    resolve: function(node) {
        
        return this.source.substring(node.startIndex, node.endIndex);
    }
});
