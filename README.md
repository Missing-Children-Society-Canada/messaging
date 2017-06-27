# Missing Children Society of Canada

## Description
Data processing pipeline broken into microservices and run on Azure Functions.
Message Enters Queue (from trigger) -> Filter checks to see if user is 'known' -> Structure is called to format messages for Topic -> Context is added during Augment -> Finally Data is Stored
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

### Configuration (App Settings):
- AzureWebJobsServiceBus: Service Bus connection string
- DocumentDB: Cosmos DB connection string
- DocDb_Host: Cosmos DB host
- DocDb_AuthKey: Cosmos DB auth key
- TwitterConsumerKey: Twitter consumer key
- TwitterConsumerSecret: Twitter consumer secret
- TwitterAccessTokenKey: Twitter access token key
- TwitterAccessTokenSecret: Twitter access token secret
- IG_TOKEN_VERIFY: Instagram verification token
- APPINSIGHTS_INSTRUMENTATIONKEY: App Insights api key
- SendGridAPIKey: SendGrid api key
- NotifyEmailTo: email to
- NotifyEmailFrom: email from
- DashboardURL: dashboard url
- DashboardProfileURL: profile page in dashboard

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