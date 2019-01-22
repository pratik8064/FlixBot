var request = require('request');

var trendingRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/week",
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

//function to create proper messsage to show trending movies.
function getTrendingMessage(trendingMovies) {
    ans = "Here is a list of top 5 trending movies : </br>";
    list = "";
    for (var i = 0; i < 5; i++) {
        list += "" + [i + 1] + ". " + trendingMovies[i] + "</br>";
    }
    ans += list;
    return ans;
}

// function to call theMovieDb api to get list of trending movies
function getTrendingMovies(callback) {
    request(trendingRequest, function (error, response, body) {
        if (error) throw error;
        results = body.results;
        output = [];
        results.forEach(item => {
            output.push(item.original_title);
        });
        if (output.length > 0) {
            callback(output);
        }
    });
};

exports.getTrendingMovies = getTrendingMovies;
exports.getTrendingMessage = getTrendingMessage;