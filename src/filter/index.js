module.exports = function (context, message) {
    //fliter on twitter handle
    context.bindings.filterout = message;
    context.done();
};