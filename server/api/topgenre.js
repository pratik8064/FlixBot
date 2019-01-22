var request = require('request');

var topGenreRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie/",
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

function getTopGenreMessage(genre) {
    message = "The top five movies are: ";
    for (var i = 0; i < 5; i++) {
        message += "\n" + genre[i];
    }
    return message;
}

function getTopGenre(genre, callback) {
    topGenreRequest.url += "?with_genres=" + genre + "&sort_by=popularity.desc";
    request(topGenreRequest, function (error, response, body) {
        if (error) throw error;
        results = body.results;
        output = [];
        results.forEach(item => {
            output.push(item.title);
        });

        if (output.length > 0) {
            callback(output);
        }
    });
}

exports.getTopGenre = getTopGenre;
exports.getTopGenreMessage = getTopGenreMessage;