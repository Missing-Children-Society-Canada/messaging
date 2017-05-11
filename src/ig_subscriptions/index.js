module.exports = function (context, req) {
    if (req.method === "GET") {
        // handle new subscription request
        let mode = req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let verify = req.query["hub.verify_token"];

        if (verify === process.env.IG_VERIFY_TOKEN) {
            // if verification matches, return challenge
            context.res.raw(challenge);
        } else {
            context.res.sendStatus(400);
        }
    } else {
        // map all updates to array of user_id & media_id messages, sent to queue
        var subscription_updates = req.body.map(item => JSON.stringify({
            user_id: item.object_id,
            media_id: item.data.media_id
        }));

        context.bindings.out = subscription_updates;
        context.res.sendStatus(200);
    }
};