var builder = require('botbuilder');
var food = require("./FavouriteFoods");
var restaurant = require('./RestaurantCard');
var nutrition = require('./NutritionCard');

// Some sections have been omitted

exports.startDialog = function(bot) {
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/45453a2d-7b6b-417d-ae8c-1b45241f891f?subscription-key=d63d1605a9d14aa2abeb04de9aaf522f&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function(session, args) {


        // Pulls out the food entity from the session if it exists
        var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

        // Checks if the for entity was found
        if (foodEntity) {
            session.send('Calculating calories in %s...', foodEntity.entity);
            nutrition.displayNutritionCards(foodEntity.entity, session);

        } else {
            session.send("No food identified! Please try again");
        }

    }).triggerAction({
        matches: 'GetCalories'
    });





    bot.dialog('GetFavouriteFood', [
        function(session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function(session, results, next) {

            if (results.response) {
                session.conversationData["username"] = results.response;
            }

            session.send("Retrieving your favourite foods");
            food.displayFavouriteFood(session, session.conversationData["username"]); // <---- THIS LINE HERE IS WHAT WE NEED 
        }

    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });





    bot.dialog('LookForFavourite', function(session, args) {
        session.send("LookForFavourite intent found");

    }).triggerAction({
        matches: 'LookForFavourite'
    });




    bot.dialog('WantFood', function(session, args) {
        // Pulls out the food entity from the session if it exists
        var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

        // Checks if the for entity was found
        if (foodEntity) {
            session.send('Looking for restaurants which sell %s...', foodEntity.entity);
            restaurant.displayRestaurantCards(foodEntity.entity, "auckland", session);
        } else {
            session.send("No food identified! Please try again");
        }

    }).triggerAction({
        matches: 'WantFood'
    });





    bot.dialog('WelcomeIntent', function(session, args) {
        session.send("Hello there! How may I help you today?");

    }).triggerAction({
        matches: 'WelcomeIntent'
    });





    bot.dialog('Username', function(session, args) {
        session.send("Username intent found");

    }).triggerAction({
        matches: 'Username'
    });
}