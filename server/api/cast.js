var request = require('request');

var castRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/id/credits",
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

function getCastMessage(movie, cast) {
    ans = "The cast for " + movie + " is: </br>";
    for (var i = 0; i < 5; i++) {
        ans += cast[i].name + " as " + cast[i].character +"</br>";
    }
    return ans;
}

function getCast(id, callback) {

    var urlString = "https://api.themoviedb.org/3/movie/" + id + "/credits";
    castRequest.url = urlString;
    request(castRequest, function (error, response, body) {
        if (error) throw error;
        castResult = [];
        for (var i = 0; i < 5; i++) {
            castResult.push(response.body.cast[i]);
        }
        callback(castResult);
    });

}

exports.getCast = getCast;
exports.getCastMessage = getCastMessage;