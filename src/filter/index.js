var config = require('./config');

//confirm messasges should be processed
module.exports = function(context, message) {
    context.bindings.myOutput = message;
    context.done();
};