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
    return twit.get(`statuses/show/${message.request.mediaid}`, { include_entities: true })
        .then(getLocation)
        .then(getImages)
        .then(getHistory)
        .then((result) => { return setOutputBinding(result, message) })
        .catch((error) => { context.log(error) });

    function getLocation(message) {
        if (message.place != null) {
            var tweetLocation = message.place.full_name + ' ' + message.place.country_code;

            //if (message.place.country_code == 'US') {//THIS SHOULD BE CONFIGURABLE
            // Get GPS from Tweet       
            if (message.coordinates != null && 2 <= message.coordinates.coordinates.length) {
                message.latitude = message.coordinates.coordinates[0];
                message.longitude = message.coordinates.coordinates[1];
            }
            else if (message.place.full_name != null) { // Get GPS via 3rd party GeoLocation module
                var geocoder = NodeGeocoder(gpsOptions);

                return new Promise((resolve, reject) => {
                    geocoder.geocode(tweetLocation, function (err, res) {
                        if (err)
                            return reject(err);
                        message.latitude = res[0].latitude;
                        message.longitude = res[0].longitude;
                        resolve(message);
                    });
                });
            }
            // }
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
        message.tweetHistoryData = {
            statuses: []
        };

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
                message.tweetHistoryData.statuses = historyData.statuses;
                return message;
            });
    }

    function setOutputBinding(result, message) {
        let data = message;

        data.response = {
            platform: "twitter",
            type: "media",
            data: result
        };

        context.bindings.out = data;
        return data;
    }
};