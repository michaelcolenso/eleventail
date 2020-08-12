const Twitter = require('twitter');
require('dotenv').config()

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const params = {
    user_id: '26326911',
    count: 25,
    exclude_replies: true,
    include_rts: false
};

const fetchTweets = () => {
}

module.exports = async function () {
    return client.get('statuses/user_timeline', params)
        .catch((err) => {
            console.error(err);
        });
}