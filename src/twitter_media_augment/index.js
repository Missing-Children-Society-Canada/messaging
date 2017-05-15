var twitter = require('twitter');
var NodeGeocoder = require('node-geocoder');

const gpsOptions = {
    provider: process.env.GeoCoderProvider,
    httpAdapter: 'https', // Default 
    apiKey: process.env.GeoCoderApiKey, // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {
    //context.log(JSON.stringify(message, null, 4));

    return twit.get(`statuses/show/${message.mediaid}`, { include_entities: true })
        .then(getLocation)
        .then(getImages)
        .then(getHistory)
        .then(setOutputBinding)
        //.then(logTweetHistory)

    function getLocation(message) {
        if (message.place != null) {
            var tweetLocation = message.place.full_name + ' ' + message.place.country_code;

            if (message.place.country_code == 'US') {//THIS SHOULD BE CONFIGURABLE
                // Get GPS from Tweet       
                if (message.coordinates != null && 2 <= message.coordinates.coordinates.length) {
                    message.latitude = message.coordinates.coordinates[0];
                    message.longitude = message.coordinates.coordinates[1];
                    context.log('Lon: ' + message.longitude, 'Lat: ' + message.latitude);
                }
                else if (message.place.full_name != null) { // Get GPS via 3rd party GeoLocation module
                    var geocoder = NodeGeocoder(gpsOptions);

                    return new Promise((resolve, reject) => {
                        geocoder.geocode(tweetLocation, function (err, res) {
                            if (err)
                                return reject(err);
                            message.latitude = res[0].latitude;
                            message.longitude = res[0].longitude;
                            context.log('Lon: ' + message.longitude, 'Lat: ' + message.latitude);
                            resolve(message);
                        });
                    });
                }
            }
        }
        return message;
    }

    function getImages(message) {
        // Add photo urls
        message.photourls = [];
        if (message.entities != null && message.entities.media != null) {
            if (message.entities.media.length > 0) {
                message.entities.media.forEach(function (item) {
                    message.photourls.push(item.media_url);
                });
            }

            // Print photo urls
            // message.photourls.forEach(function (photourl) {
            //     context.log(photourl);
            // });
        }

        return message;
    }

    // Get all past tweets that contains user's handle
    function getHistory(message) {
        message.tweethistory_ids = [];
        var params = {
            q: message.user.screen_name,  // REQUIRED
            result_type: 'mixed',
            lang: 'en',
            max_id: message.tweetid
        };

        if (message.latitude && message.longitude) {
            params.geocode = `${message.latitude},${message.longitude},${process.env.TweetSearchRadius}km`;
        }

        return twit.get('search/tweets', params)
            .then(historyData => {
                message.tweethistory_ids = historyData.statuses
                    .map(statusItem => statusItem.id_str);

                return message;
            });
    }

    function setOutputBinding(message) {
        context.bindings.out = message;
        return message;
    }

    function logTweetHistory(message) {

        var loggingPromises = message.tweethistory_ids.map(historyId => {
            twit.get(`statuses/show/${historyId}`, { include_entities: true })
                .then(msg => {
                    context.log('tweethistory_id:' + historyId);
                    context.log(msg.text);
                });
        });

        return Promise.all(loggingPromises)
            .then(() => message);
    }
};