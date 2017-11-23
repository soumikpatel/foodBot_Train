var request = require('request'); //node module for http post requests

exports.retreiveMessage = function(session) {

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/df1da5e8-4e01-43d0-8203-6895a06d8ac1/url?iterationId=e2dee593-3d51-46b4-a28a-59c8e0aef84f',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '4dabd48577884b78807382911176a251'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body) {
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body) {
    if (body && body.Predictions && body.Predictions[0].Tag) {
        return "This is " + body.Predictions[0].Tag
    } else {
        console.log('Oops, please try again!');
    }
}