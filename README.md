# Missing Children Society of Canada

## Description
Data processing pipeline broken into microservices and run on Azure Functions.
Message Enters Queue (from trigger) -> Filter checks to see if user is 'known' -> Context is added during Augment -> Finally Data is Stored
- Each Step the message is added to a queue for resiliance
- System is designed as an Event Sourcing Model; with each step being additive.

### Filter
Ensures that only register users are tracked

### Augment
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

### Store
Data is stored in CosmosDB

### Profile API
Get Profile data of missing persons that have initiated a call for help.

### Quick start
- Clone
- NPM Install
[Running Azure Functions Locally with the CLI and VS Code](https://blogs.msdn.microsoft.com/appserviceteam/2016/12/01/running-azure-functions-locally-with-the-cli/)