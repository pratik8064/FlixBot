var request = require('request');

// a sample request object with url to fetch id for movie in query param
var getMoviesForActorRequest = {
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

function getMoviesForActorMsg(movieList, person) {
    message = "";
    if(movieList.length > 1){
        str1 = "Actor " + person + " is mostly known for ";
        for(var i = 0;i < movieList.length - 1;i++){
            str1 += movieList[i] + ", "
        }        
        str1 += movieList[i];
        message += str1;
    }
    return message;
}

function getMoviesForActor(person, callback) {
    
    getMoviesForActorRequest.qs.query = person;
    request(getMoviesForActorRequest, function (error, response, body) {
        if (error) throw error;
        results = body.results;
        if (results.length != 0) {
            results = results[0];
            temp = results.known_for;
            movieList = [];
            temp.forEach(item => {
                movieList.push(item.original_title);
            });
            callback(movieList);
        }
    });
}

exports.getMoviesForActor = getMoviesForActor;
exports.getMoviesForActorMsg = getMoviesForActorMsg;