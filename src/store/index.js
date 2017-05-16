module.exports = function (context, message) {

    context.bindings.out = message;

    context.done();
};