var request = require('request');

var crewRequest = {
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

function getCrewMessage(movie, crew) {
    ans = "The crew for " + movie + " is: </br>";
    for (var i = 0; i < 10; i++) {
        ans += crew[i].name + " - " + crew[i].job + "</br>";
    }
    return ans;
}

function getCrew(id, callback) {

    var urlString = "https://api.themoviedb.org/3/movie/" + id + "/credits";
    crewRequest.url = urlString;
    request(crewRequest, function (error, response, body) {
        if (error) throw error;
        crewResult = [];
        for (var i = 0; i < 10; i++) {
            crewResult.push(response.body.crew[i]);
        }
        callback(crewResult);
    });

}

exports.getCrew = getCrew;
exports.getCrewMessage = getCrewMessage;