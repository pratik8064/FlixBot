var request = require('request');

var getPrimaryInfoRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/",
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

function getPrimaryInfoMsg(body, movie, callback) {
    var msg = "Here is some info for " + movie + "</br></br>";
    if (body.genres && body.genres.length > 0) {
        var genres = "Genres : ";
        body.genres.forEach(element => {
            genres = genres + " " + element.name;
        });
        msg += genres + "</br></br>";
    }

    var overview = "";

    overview = body.overview;
    if (body.overview) {
        msg += "Overview: \"" + overview + "\"</br>";
    }
    callback(msg);
}


function getPrimaryInfo(id, movie, callback) {
    getPrimaryInfoRequest.url = "https://api.themoviedb.org/3/movie/" + id;
    request(getPrimaryInfoRequest, function (error, response, body) {
        if (error)
            throw error;
        else
            callback(body);
    });
}

exports.getPrimaryInfo = getPrimaryInfo;
exports.getPrimaryInfoMsg = getPrimaryInfoMsg;