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

## Store
Data is stored in DocumentDB (needs to be moved to SQL Database)

## Profile API
Get Profile data of missing persons that have initiated a call for help.