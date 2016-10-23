module.exports = function (context, message) {
    //fliter on twitter handle
    context.filterout = message;
    context.done();
};