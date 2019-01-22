var request = require('request');

var getGenreIdRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list",
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

function getGenreIdMessage(id, genre) {
    message = "ID for " + genre + "is " + id;
    return message;
}

function getGenreId(genre, callback) {
    id = undefined;
    getGenreIdRequest.qs.query = genre;
    request(getGenreIdRequest, function (error, response, body) {
        if (error) throw error;
        genreList = body.genres;
        for(var i = 0; i < genreList.length; i++) {
            if(genreList[i].name == genre) {
                id = genreList[i].id;
                callback(id);
            }
        }
    });
}

exports.getGenreId = getGenreId;
exports.getGenreIdMessage = getGenreIdMessage;