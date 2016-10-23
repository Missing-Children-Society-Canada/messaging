module.exports = function(context, message) {
    //Pull Lat/Long from Twitter, based on Tweet
    message.latitude = -115.00002;
    message.longitude = 41.94000;

    //Pull in X # of Photos from Twitter
    message.photos = [];

    context.bindings.out = message;
    context.done();
};