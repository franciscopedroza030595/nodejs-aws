const { response } = require('express');
const Twitter = require('twitter');


const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const getTweets = (req, res = response) => {

    const params = { screen_name: 'tweet in nodejs' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            tweets = tweets.slice(0, 5);
            const getText = (item) => {
                let text = item.text
                return text
            }
            const list = tweets.map(getText)
                //console.log(list);

            res.json({
                ok: true,
                tweets: list
            })
        }
    })

};


module.exports = {
    getTweets
}