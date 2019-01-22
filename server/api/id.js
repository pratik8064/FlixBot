var request = require('request');

// a sample request object with url to fetch id for movie in query param
var getIdRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    qs: {
        api_key: "b9ba76892aceca8cadef96bae5ca959b",
        page: "1",
        query: ""
    },
    headers: {
        //authorization: "Bearer <<access_token>>",
        "content-type": "application/json;charset=utf-8"
    },
    body: {},
    json: true
};

function getIdMessage(id, movie) {
    message = "ID for " + movie + " is " + id;
    return message;
}

function getMovieId(movie, callback) {
    id = undefined;
    getIdRequest.qs.query = movie;
    request(getIdRequest, function (error, response, body) {
        if (error) throw error;
        results = body.results;
        if (results.length != 0) {
            id = results[0].id;
            callback(id);
        }
    });
}

exports.getMovieId = getMovieId;
exports.getIdMessage = getIdMessage;