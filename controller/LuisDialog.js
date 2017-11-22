var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function(bot) {
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/45453a2d-7b6b-417d-ae8c-1b45241f891f?subscription-key=d63d1605a9d14aa2abeb04de9aaf522f&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function(session, args) {
        session.send("GetCalories intent found");

    }).triggerAction({
        matches: 'GetCalories'
    });



    bot.dialog('GetFavouriteFood', function(session, args) {
        session.send("GetFavouriteFood intent found");

    }).triggerAction({
        matches: 'GetFavouriteFood'
    });



    bot.dialog('LookForFavourite', function(session, args) {
        session.send("LookForFavourite intent found");

    }).triggerAction({
        matches: 'LookForFavourite'
    });



    bot.dialog('WantFood', function(session, args) {
        session.send("WantFood intent found");

    }).triggerAction({
        matches: 'WantFood'
    });



    bot.dialog('WelcomeIntent', function(session, args) {
        session.send("WelcomeIntent intent found");

    }).triggerAction({
        matches: 'WelcomeIntent'
    });
}