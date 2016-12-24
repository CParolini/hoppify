var store = "";
var dropDownDrink = '';
var queryURL = '';
// Event listener for all button elements
$(".mixMenu").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    $(".drinks").empty();
    dropDownDrink = this.outerText;
    $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    
    // Constructing a URL to search cocktail db
    queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + dropDownDrink;

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

                $('.drinks').append("<li><a>" + response.drinks[i].strDrink + "</a></li>");
                console.log(response.drinks[i].strDrink);

            }
        });
});



// // Event listener for all button elements
// $("#cocktail").on("click", function() {
//     // In this case, the "this" keyword refers to the button that was clicked
//     $(".drinks").empty();
//     $(".info").html("<img src='assets/image/drinks.jpg'>")

//     //var searchFor = $('.form-control').val();
//     // Constructing a URL to search cocktail db
//     queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=cocktail";

//     // Performing our AJAX GET request
//     listDrinks();
// });
// // Event listener for all button elements
// $("#fruit").on("click", function() {
//     // In this case, the "this" keyword refers to the button that was clicked
//     $(".drinks").empty();
//     $(".info").html("<img src='assets/image/fruit.jpg'>")
//         //var searchFor = $('.form-control').val();
//         // Constructing a URL to search cocktail db
//     var queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=fruit";

//     // Performing our AJAX GET request
//     listDrinks();
// });
// // Event listener for all button elements
// $("#search").on("click", function() {
//     console.log("click");
//     // In this case, the "this" keyword refers to the button that was clicked

//     var searchFor = $('.form-control').val();
//     console.log(searchFor);
//     // Constructing a URL to search cocktail db
//     var queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + searchFor;

//     // Performing our AJAX GET request
//     listDrinks();
// });

// Event listener for all button elements
$("#search").on("click", function() {
    console.log("click");
    // In this case, the "this" keyword refers to the button that was clicked

    var searchFor = $('.form-control').val();
    console.log(searchFor);
    // Constructing a URL to search cocktail db
    var queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + searchFor;

    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable
            $(".drinks").empty();
            store = response;
            // Looping over every result item
            for (var i = 0; i < response.drinks.length; i++) {

                $('.drinks').append('<h2 class ="dropDown">' + response.drinks[i].strDrink + '</h2>');
                console.log(response.drinks[i].strDrink);

            }
        });
});