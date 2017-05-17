module.exports = function (context, message) {

    let data = message;

    data.store = {
        storedOn: new Date()
    };

    context.bindings.out = data;

    context.done();
};