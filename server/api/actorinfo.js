var request = require('request');

var getActorInfoRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/person/",
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

function getActorInfoMsg(body, callback) {
    var arr = body.biography.split(".");
    var msg = "";
    for(var i = 0;i < 5;i++){
        msg += arr[i];
    }
    return msg;
}


function getActorInfo(id, callback) {
    getActorInfoRequest.url = "https://api.themoviedb.org/3/person/" + id;
    request(getActorInfoRequest, function (error, response, body) {
        if (error)
            throw error;
        else
            callback(body);
    });
}

exports.getActorInfo = getActorInfo;
exports.getActorInfoMsg = getActorInfoMsg;