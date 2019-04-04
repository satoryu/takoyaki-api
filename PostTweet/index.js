const Twitter = require('twitter')

module.exports = async function (context, req) {
    const status = req.body.status
    const twitter = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: req.headers['x-ms-token-twitter-access-token'],
        access_token_secret: req.headers['x-ms-token-twitter-access-token-secret']
    })

    try {
        const tweet = await twitter.post('statuses/update', { status })
        context.bindings.res = { body: tweet }

        context.done()
    } catch(err) {
        context.log.error(err)
        context.bindings.res = {
            status: 500,
            body: err
        }
        context.done(err)
    }
};