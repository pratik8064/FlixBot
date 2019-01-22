var request = require('request');

//GET request for getting review of the movie from theMovieDb API
var releaseInfoRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/id/release_dates",
    qs: {
        api_key: "b9ba76892aceca8cadef96bae5ca959b",
        page: "1"
    },
    headers: {
        //authorization: "Bearer <<access_token>>",
        "content-type": "application/json;charset=utf-8"
    },
    body: {},
    json: true
};

function getReleaseInfoMessage(movie, releaseInfo) {
    var releaseDate = new Date(releaseInfo);
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const date = releaseDate.getDate();
    const month = releaseDate.getMonth();
    const year = releaseDate.getFullYear();
    message = movie + " was released on " + date + " " + monthNames[month - 1] + " " + year;
    return message;
}

function getReleaseInfo(id, callback) {
    var urlString = "https://api.themoviedb.org/3/movie/" + id + "/release_dates";
    releaseInfoRequest.url = urlString;
    request(releaseInfoRequest, function (error, response, body) {
        if (error) throw error;
        var releaseDate;
        for (var i = 0; i < response.body.results.length; i++) {
            if (body.results[i]['iso_3166_1'] === "US") {
                releaseDate = response.body.results[i]['release_dates'][0].release_date;
            }
        }
        callback(releaseDate);
    });
}

exports.getReleaseInfo = getReleaseInfo;
exports.getReleaseInfoMessage = getReleaseInfoMessage;
