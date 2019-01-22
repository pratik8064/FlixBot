var request = require('request');

var reviewRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    qs: {
        api_key: "b9ba76892aceca8cadef96bae5ca959b",
        page: "1",
        qs: ""
    },
    headers: {
        //authorization: "Bearer <<access_token>>",
        "content-type": "application/json;charset=utf-8"
    },
    body: {},
    json: true
};


function getRatingMessage(movie, rating) {
    rating = parseFloat(rating);
    if (rating < 5) {
        message = "I would not bother watching " + movie + ". It is rated " + rating;
    } else if (rating >= 5 && rating < 7) {
        message = movie + " is average. It's rated " + rating;
    } else if (rating >= 7 && rating < 9) {
        message = movie + " is a pretty good movie! It's rated " + rating + "!";
    } else if (rating >= 9) {
        message = "How have you not seen " + movie + " yet!? It's rated " + rating + "!!!";
    } else {
        message = "Sorry, I didn't get any results for that movie.";
    }
    return message;
}

function getRating(movie, callback) {
    reviewRequest.qs.query = movie;
    request(reviewRequest, function (error, response, body) {
        if (error) throw error;
        result = body.results[0].vote_average;
        callback(result);
    });
}

exports.getRating = getRating;
exports.getRatingMessage = getRatingMessage;