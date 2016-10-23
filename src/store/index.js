module.exports = function (context, message) {

    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    var social_site = message.social_site == 1 ? 'Twitter' : 'unknown';

    var content = {
        id: message.tweetid,
        social_site: social_site,
        content: message.tweettext
    };

    var data = {
        id: id,
        registered_account_id: message.userid,
        is_archived: false,
        archived_by: 0,
        last_update: new Date(),
        created_date: new Date(),
        log: message.longitude,
        lat: message.latitude,
        profilepic: message.profileimageurl,
        photos: [],
        social_content: [content]
    };

    context.bindings.out = data;

    context.done();
};