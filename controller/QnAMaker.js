var rest = require('../API/Restclient');

exports.talkToQnA = function postQnAResults(session, question) {
    var url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/79e8bbee-aeb9-4454-a0d0-064d0ebaf43f/generateAnswer';
    rest.postQnAResults(url, session, question, handleQnA)
};

function handleQnA(body, session, question) {
    session.send(body.answers[0].answer);
};