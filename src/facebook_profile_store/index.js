module.exports = function (context, message) {
    let data = message;
    data.id = data.id + '+facebook_profile';

    context.bindings.out = JSON.stringify(message);
};