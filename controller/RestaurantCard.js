var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayRestaurantCards = function getRestaurantData(foodName, location, session) {
    var url = 'https://api.yelp.com/v3/businesses/search?term=' + foodName + '&location=' + location + '&limit=5';
    var auth = '-73ia9A3BjXRj4i4AZB4O8wAwXfLy7O7l8SbXrdHKKWCUgWlbAbCj8DKsSOyKCHGS_oSY5w7eJOGzv1Zuc2cuwcIEuKs8-d_XJswHn0Ob55BKGOnyMn4iYa80xIWWnYx';
    rest.getYelpData(url, auth, session, displayRestaurantCards);
}

function displayRestaurantCards(message, session) {
    var attachment = [];
    var restaurants = JSON.parse(message);

    //For each restaurant, add herocard with name, address, image and url in attachment
    for (var index in restaurants.businesses) {
        var restaurant = restaurants.businesses[index];
        var name = restaurant.name;
        var imageURL = restaurant.image_url;
        var url = restaurant.url;
        var address = restaurant.location.address1 + ", " + restaurant.location.city;

        var card = new builder.HeroCard(session)
            .title(name)
            .text(address)
            .images([
                builder.CardImage.create(session, imageURL)
            ])
            .buttons([
                builder.CardAction.openUrl(session, url, 'More Information')
            ]);
        attachment.push(card);

    }

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}