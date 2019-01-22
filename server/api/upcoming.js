var request = require('request');

var upcomingRequest = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/upcoming",
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

//function to create proper messsage to show upcoming movies.
function getupcomingMessage(upcomingMovies) {
    ans = "Here is a list of 5 upcoming movies : </br>";
    list = "";
    for (var i = 0; i < 5; i++) {
        list += "" + [i + 1] + ". " + upcomingMovies[i] + "</br>";
    }
    ans += list;
    return ans;
}

// function to call theMovieDb api to get list of upcoming movies
function getupcomingMovies(id, callback) {
    request(upcomingRequest, function (error, response, body) {
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

exports.getupcomingMovies = getupcomingMovies;
exports.getupcomingMessage = getupcomingMessage;
