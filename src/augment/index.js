var config = require('./config');

module.exports = function(context, message) {
    context.bindings.myOutput = message;
    context.done();
};