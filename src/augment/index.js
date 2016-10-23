module.exports = function(context, message) {
    context.bindings.outMessage = message;
    context.done();
};