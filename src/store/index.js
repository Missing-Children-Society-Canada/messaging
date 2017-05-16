module.exports = function (context, message) {

    context.bindings.out = JSON.stringify(message);

    context.done();
};