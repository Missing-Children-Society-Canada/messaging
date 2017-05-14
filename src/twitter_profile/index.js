var util = require('util');
var twitter = require('twitter');

module.exports = function (context, message) {

    context.log(message);

    return twit.get(`users/show.json?screen_name=${message.twitter.username}`)
        .then(setOutputBinding)
        .then(log)

    function setOutputBinding(data) {
        context.bindings.out = data;
        return data;
    }

    function setOutputBinding(data) {
        context.log(data);
        return data;
    }
}