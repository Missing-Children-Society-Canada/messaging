module.exports = function(context, message) {
    //add more data
    context.bindings.augmentout = message;
    context.done();
};