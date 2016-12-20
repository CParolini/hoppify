var store = "";
// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked

    var searchFor = $('.searchTerm').val();
    // Constructing a URL to search cocktail db
    var queryURL = "http://api.brewerydb.com/v2/search/style?q=" + searchFor + "&key=a926a8c5cbc33ef1ce4cdb22b4f5e95f";

    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable

            store = response;
            // Looping over every result item
            for (var i = 0; i < response.drinks.length; i++) {

                $('.buttonList').append('<h2 class ="dropDown">' + response.drinks[i].strDrink + '</h2>');
                console.log(response.drinks[i].strDrink);

            }
        });
});
