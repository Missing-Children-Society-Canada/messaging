module.exports = function(context, message) {
    //add more data
    context.bindings.out = message;
    context.done();
};