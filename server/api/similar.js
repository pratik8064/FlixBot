var request = require('request');

var similarRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/recommendations",
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

//function to create proper messsage to show similar movies.
function getsimilarMessage(similarMovies) {
    ans = "Here is a list of top 5 similar movies : </br>";
    list = "";
    for (var i = 0; i < 5; i++) {
        list += "" + [i + 1] + ". " + similarMovies[i] + "</br>";
    }
    ans += list;
    return ans;
}

// function to call theMovieDb api to get list of similar movies
function getsimilarMovies(id, callback) {
    similarRequest.url = "https://api.themoviedb.org/3/movie/" + id + "/recommendations";
    request(similarRequest, function (error, response, body) {
        console.log("===================");
        console.log(body);
        if (error) throw error;
        results = body.results;
        output = [];
        results.forEach(item => {
            output.push(item.original_title);
        });
        console.log(output);
        if (output.length > 0) {
            callback(output);
        }
    });
};

exports.getsimilarMovies = getsimilarMovies;
exports.getsimilarMessage = getsimilarMessage;
