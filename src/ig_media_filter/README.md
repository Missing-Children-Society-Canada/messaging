Handles user & tag filtering for ig.

1. Searches document db for a user with user_id and returns their access token if found.
2. Uses access token to look up media_id from instagram.
3. Filters media with #hfm tag
4. Sends message to store service bus queue

