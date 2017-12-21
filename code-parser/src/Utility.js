
Utility = module.exports = {
    
    Array : {
        last : function(array) {
            return array[array.length - 1];
        }
    },

    String : {
        substitute : function(string, substitute, begin, end) {
            return string.substring(0, begin) + substitute + string.substring(end);
        }
    }
};
