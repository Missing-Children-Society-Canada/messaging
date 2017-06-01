# Missing Children Society of Canada

## Description
Data processing pipeline broken into microservices and run on Azure Functions.
Message Enters Queue (from trigger) -> Filter checks to see if user is 'known' -> Context is added during Augment -> Finally Data is Stored
- Each Step the message is added to a queue for resiliance
- System is designed as an Event Sourcing Model; with each step being additive.

**Diagram**
![Diagram](https://github.com/Missing-Children-Society-Canada/messaging/raw/master/docs/system-overview.PNG)

### Filter
Ensures that only register users are tracked

### Structure
Pulls out message property and adds them to brokered message so that Topic Subscriptions can filter on key values

### Augment
**Items**
- Facebook Media
- Facebook Profile
- Instagram Media
- Instagram Profile
- Twitter Media
- Twitter Profile

Configuration (App Settings):
1. GeoCoderProvider // e.g. Google 
2. GeoCoderApiKey // Google Map API key
3. TwitterConsumerKey
4. TwitterConsumerSecret
5. TwitterAccessTokenKey
6. TwitterAccessTokenSecret
7. TweetSearchRadius

### Store
All data is stored to Cosmos DB.

### Notify
DESCRIPTION NEEDED

### Notify Police
DESCRIPTION NEEDED

### Validate Token
DESCRIPTION NEEDED

### Quick start
- Clone
- NPM Install
- [Running Azure Functions Locally with the CLI and VS Code](https://blogs.msdn.microsoft.com/appserviceteam/2016/12/01/running-azure-functions-locally-with-the-cli/)