module.exports = function(context, message) {
    //add more data
    context.bindings.outMessage = message;
    context.done();
};