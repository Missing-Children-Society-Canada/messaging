module.exports = function (context, message) {
    
    let err = null;

    var documents = context.bindings.documents;

    let userdata = documents[0];
    
    if (!userdata || userdata == undefined) {
        context.log('Not tracking user');

        err = new Error('Not tracking user');
        return;
    }

    if ((!userdata.twitter || userdata.twitter == undefined)
        && (!userdata.facebook || userdata.facebook == undefined)
        && (!userdata.instagram || userdata.instagram == undefined)) {
        context.log('No social profiles');

        err = new Error('No social profiles');
        return;
    }

    if (!userdata.id) {
        context.log('No user id');

        err = new Error('No social profiles');
        return;
    }

    context.bindings.out = {
        requestid: guid(),
        user: userdata,
        request: message,
        triggeredOn: new Date()
    };

    context.done(err);

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
};