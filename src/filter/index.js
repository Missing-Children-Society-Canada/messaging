module.exports = function (context, message) {
    //fliter on twitter handle
    context.bindings.outMessage = message;
    context.done();
};