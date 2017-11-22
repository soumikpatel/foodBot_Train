var request = require('request');

/* YELP API REQUEST*/

exports.getYelpData = function getData(url, bearer, session, callback) {

    request.get(url, { 'auth': { 'bearer': bearer } }, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, session);
        }
    });
};




/* LUIS API REQUEST */
exports.getFavouriteFood = function getData(url, session, username, callback) {
    request.get(url, { 'headers': { 'ZUMO-API-VERSION': '2.0.0' } }, function handleGetResponse(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, session, username);
        }
    });
};




/* API REQUEST FOR NUTRITION */
exports.getNutritionData = function getData(url, session, foodName, callback) {

    request.get(url, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, foodName, session);
        }
    });
};