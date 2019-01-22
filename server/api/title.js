var request = require('request');

// request object to fetch data about alternative movie titles
var altTitleRequest = {
    method: "GET",
    url: "",
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

// function to create a displayable message for alternative titles
function getAltTitleMsg(altTitles) {
    str = "Some alternative titles include:";
    for (var i = 0; i < 3; i++) {
        str += "\n" + altTitles[2 * i] + " (" + altTitles[2 * i + 1] + ")";
    }
    return str;
}

// function to call movieDB API to get alternative movie titles
function getAltTitles(movie, callback) {
    altTitleRequest.url = "https://api.themoviedb.org/3/movie/" + movie + "/alternative_titles";
    request(altTitleRequest, function (error, response, body) {
        if (error) throw error;
        titles = body.titles;
        output = [];
        titles.forEach(item => {
            output.push(item.title);
            output.push(item.iso_3166_1);
        });

        if (output.length > 0) {
            callback(output);
        }
    });
}

exports.getAltTitles = getAltTitles;
exports.getAltTitleMsg = getAltTitleMsg;