module.exports = function(context, message) {
    //add more data
    message.latitude = -115.00002;
    message.longitude = 41.94000;
    message.photos = [];

    context.bindings.out = message;
    context.done();
};