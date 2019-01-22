var express = require('express');
var request = require('request');
var server = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const answerAPI = require('./api/answer.js');
const idAPI = require('./api/id.js');
const trendingAPI = require('./api/trending.js');
const releaseAPI = require('./api/release.js');
const ratingAPI = require('./api/rating.js');
const altTitleAPI = require('./api/title.js');
const infoAPI = require('./api/info.js');
const personIdAPI = require('./api/personid.js');
const similarAPI = require('./api/similar.js')
const transLangAPI = require('./api/translations.js')
const topGenreAPI = require('./api/topgenre.js')
const actorInfoAPI = require('./api/actorinfo.js'); 
const moviesForActorAPI = require('./api/moviesForActor.js');
const crewAPI = require('./api/crew.js');
const castAPI = require('./api/cast.js');
const genreIdAPI = require('./api/genreid.js');
const upcomingAPI = require('./api/upcoming.js');

// using require create your own js file in api folder and include it here somethingAPI = require(./api/something.js)

var port = process.env.PORT || 8080;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

// sample server api
server.post('/webhook', function (req, res) {
    var body, movie, intent, id, result;
    body = req.body;
    movie = body.queryResult.parameters.movie;
    person = body.queryResult.parameters.actor;
    genre = body.queryResult.parameters.genre;
    intent = body.queryResult.intent.displayName;
    id = undefined;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    result = {
        "fulfillmentText": "",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    ""
                ]
            }
        }],
        "source": ""
    };

    if (intent !== "NeedTrending" && intent !== "NeedGenreTopTen" && intent !== "Needupcoming" && (!movie || movie.length < 1) && (!person || person.length < 1)) {
        result.fulfillmentMessages[0].text.text[0] = "Sorry, I don't have any information for this entity";
        res.json(result);
    } else {
        switch (intent) {

            case "NeedId":
                idAPI.getMovieId(movie, function (id) {
                    message = idAPI.getIdMessage(id, movie);
                    result.fulfillmentMessages[0].text.text[0] = message;
                    res.json(result);
                });
                break;

            case "NeedTrending":
                trendingAPI.getTrendingMovies(function (trendingMovies) {
                    message = trendingAPI.getTrendingMessage(trendingMovies);
                    result.fulfillmentMessages[0].text.text[0] = message;
                    res.json(result);
                });
                break;

            case "NeedRating":
                ratingAPI.getRating(movie, function (ratingResult) {
                    message = ratingAPI.getRatingMessage(movie, ratingResult);
                    result.fulfillmentMessages[0].text.text[0] = message;
                    res.json(result);
                });
                break;

            case "NeedPrimaryInfo":
                idAPI.getMovieId(movie, function (id) {
                    infoAPI.getPrimaryInfo(id, movie, function (data) {
                        infoAPI.getPrimaryInfoMsg(data, movie, function (msg) {
                            result.fulfillmentMessages[0].text.text[0] = msg;
                            res.json(result);
                        });
                    });
                });
                break;

            case "NeedReleaseInfo":
                idAPI.getMovieId(movie, function (id) {
                    releaseAPI.getReleaseInfo(id, function (releaseInfoResult) {
                        message = releaseAPI.getReleaseInfoMessage(movie, releaseInfoResult);
                        result.fulfillmentMessages[0].text.text[0] = message;
                        res.json(result);
                    });
                });
                break;

            case "NeedAlternativeTitles":
                idAPI.getMovieId(movie, function (id) {
                    altTitleAPI.getAltTitles(id, function (altTitle) {
                        msg = altTitleAPI.getAltTitleMsg(altTitle);
                        result.fulfillmentMessages[0].text.text[0] = msg;
                        res.json(result);
                    });
                });
                break;

            case "NeedPersonId":
                personIdAPI.getPersonId(person, function (id) {
                    message = personIdAPI.getPersonIdMessage(id, person);
                    result.fulfillmentMessages[0].text.text[0] = message;
                    res.json(result);
                });
                break;
            
            case "NeedTranslatedLangs":
                idAPI.getMovieId(movie, function (id) {
                    transLangAPI.getTransLang(id, function (transLang) {
                        msg = transLangAPI.getTransLangMsg(transLang);
                        result.fulfillmentMessages[0].text.text[0] = msg;
                        res.json(result);
                    });
                });
                break;
            
            case "NeedActorInfo":
                personIdAPI.getPersonId(person, function (id) {
                    actorInfoAPI.getActorInfo(id, function(msg){
                        message = actorInfoAPI.getActorInfoMsg(msg);
                        result.fulfillmentMessages[0].text.text[0] = message;
                        res.json(result);
                    });
                });
                break;

            case "NeedCrew":
                idAPI.getMovieId(movie, function (id) {
                    crewAPI.getCrew(id, function (crewResult) {
                        message = crewAPI.getCrewMessage(movie, crewResult);
                      result.fulfillmentMessages[0].text.text[0] = message;
                        res.json(result);
                    })
                });
                break;
            
            case "NeedCast":
                console.log("In NeedCast");
                idAPI.getMovieId(movie, function (id) {
                    castAPI.getCast(id, function (castResult) {
                        message = castAPI.getCastMessage(movie, castResult);
                        result.fulfillmentMessages[0].text.text[0] = message;
                        res.json(result);
                    })
                });
                break;

            case "Needsimilar":
                idAPI.getMovieId(movie, function (id) {
                    similarAPI.getsimilarMovies(id, function (similar) {
                        msg = similarAPI.getsimilarMessage(similar);
                        result.fulfillmentMessages[0].text.text[0] = msg;
                        res.json(result);
                    })
                });
                
                break;
            
             case "Needupcoming":
                upcomingAPI.getupcomingMovies(id, function (upcoming) {
                        msg = upcomingAPI.getupcomingMessage(upcoming);
                        console.log(msg);
                        result.fulfillmentMessages[0].text.text[0] = msg;
                        res.json(result);
                });                
                break;
            
            case "NeedMoviesForActor":
                moviesForActorAPI.getMoviesForActor(person, function (movieList) {
                    message = moviesForActorAPI.getMoviesForActorMsg(movieList, person);
                    result.fulfillmentMessages[0].text.text[0] = message;
                    res.json(result);
                });
                break;

            case "NeedGenreId":
                genreIdAPI.getGenreId(genre, function (id) {
                    message = genreIdAPI.getGenreIdMessage(id, genre);
                    result.fulfillmentMessages[0].text.text[0] = message;
                    res.json(result);
                });
                break;

            case "NeedGenreTopTen":
                genreIdAPI.getGenreId(genre, function (id) {
                    topGenreAPI.getTopGenre(id, function (topGenre) {
                        msg = topGenreAPI.getTopGenreMessage(topGenre);
                        result.fulfillmentMessages[0].text.text[0] = message;
                        res.json(result);
                    });
                });
                break;

            default:
                res.json(result);

        }
    }
});


server.post('/answer', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    body = req.body;
    query = body.query;
    answerAPI.getAnswer(query, function (data) {
        res.send(data);
    });
});

server.use(function (req, res, next) {
    res.status(404).send("Sorry, not found");
});

server.listen(port, function () {
    console.log('server listening on port ' + port);
    console.log('Press CTRL + C to stop server');
});
