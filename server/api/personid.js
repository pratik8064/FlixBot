var request = require('request');

// a sample request object with url to fetch id for movie in query param
var getPersonIdRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/person",
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

function getPersonIdMessage(id, person) {
    message = "ID for " + person + " is " + id;
    return message;
}

function getPersonId(person, callback) {
    id = undefined;
    getPersonIdRequest.qs.query = person;
    request(getPersonIdRequest, function (error, response, body) {
        if (error) throw error;
        results = body.results;
        if (results.length != 0) {
            id = results[0].id;
            callback(id);
        }
    });
}

exports.getPersonId = getPersonId;
exports.getPersonIdMessage = getPersonIdMessage;