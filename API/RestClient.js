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


/* POST REQUEST */
exports.postFavouriteFood = function SendData(url, username, favouriteFood) {
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type': 'application/json'
        },
        json: {
            "username": username,
            "favouriteFood": favouriteFood
        }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    });
};




/* DELETE REQUEST*/
exports.deleteFavouriteFood = function deleteData(url, session, username, favouriteFood, id, callback) {
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type': 'application/json'
        }
    };

    request(options, function(err, res, body) {
        if (!err && res.statusCode === 200) {
            console.log(body);
            callback(body, session, username, favouriteFood);
        } else {
            console.log(err);
            console.log(res);
        }
    })

};


/* QnA Maker*/
exports.postQnAResults = function getData(url, session, question, callback) {
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'a8340401d1d04a36bcc71956c585e428',
            'Content-Type': 'application/json'
        },
        json: {
            "question": question
        }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body, session, question);
        } else {
            console.log(error);
        }
    });
};