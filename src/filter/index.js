module.exports = function (context, message) {
    //fliter on twitter handle
    context.bindings.filterout = JSON.stringify(message);
    context.done();
};