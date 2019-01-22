var request = require('request');

// request object to fetch data about translated languages
var transLangRequest = {
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

// function to create a displayable message for translated languages
function getTransLangMsg(transLang) {
    str = "This movie has been translated into the following languages: " + transLang[0];
    for (var i = 1; i < 8; i++) {
        str += ", " + transLang[i];
    }
    if(transLang.length >= 8)
        str += ", and more!";

    return str;
}

// function to call movieDB API to get translated languages
function getTransLang(movie, callback) {
    transLangRequest.url = "https://api.themoviedb.org/3/movie/" + movie + "/translations";
    request(transLangRequest, function (error, response, body) {
        if (error) throw error;
        langs = body.translations;
        output = [];
        langs.forEach(item => {
            output.push(item.english_name);
        });

        if (output.length > 0) {
            callback(output);
        }
    });
}

exports.getTransLang = getTransLang;
exports.getTransLangMsg = getTransLangMsg;