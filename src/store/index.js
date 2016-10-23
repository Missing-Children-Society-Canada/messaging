module.exports = function (context, message) {

    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    var content = {
        id: message.tweetid,
        social_site: "Twitter",
        content: message.tweettext
    };

    var data = {
        id: id,
        registered_account_id: message.userid,
        is_archived: false,
        archived_by: 1,
        last_update: "10/10/2016",
        created_date: "10/10/2016",
        log: 41.94000,
        lat: -115.00002,
        profilepic: message.profileimageurl,
        photos: [],
        social_content: [content]
    };

    context.bindings.out = data;

    context.done();
};