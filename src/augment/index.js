module.exports = function(context, message) {
    //add more data
    context.bindings.augmentout = JSON.stringify(message);
    context.done();
};