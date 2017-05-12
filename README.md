# Internal Systems Messaging
Data processing pipeline broken into microservices and run on Azure Functions.
Message Enters Queue -> Filter checks to see if user is 'tracked' -> Context is added during Augment -> Data is Stored

## Filter
Ensures that only register users are tracked; within geo-boundaries

## Augment
Additional Context added to messages for reporting.
- GPS or Lat/Long is critical
- Social context: friends, who, types of activity.
- Time: social patterns, location patterns etc.

Required Function app settings:
1. GeoCoderProvider // e.g. Google 
2. GeoCoderApiKey // Google Map API key
3. TwitterConsumerKey
4. TwitterConsumerSecret
5. TwitterAccessTokenKey
6. TwitterAccessTokenSecret
7. TweetSearchRadius

## Store
Data is stored in DocumentDB (needs to be moved to SQL Database)

## Profile API
Get Profile data of missing persons that have initiated a call for help.