module.exports = function (context, message) {
    //fliter on twitter handle
    context.bindings.out = message;
    context.done();
};