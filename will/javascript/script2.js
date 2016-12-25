var store = "";
var dropDownDrink = '';
var queryURL = '';
// Event listener for all drop down elements except the non Alcoholic drinks
$(".mixMenu").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    $(".drinks").empty();
    dropDownDrink = this.outerText;
    $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    
    // Constructing a URL to search cocktail db
    queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + dropDownDrink;

    // Performing our AJAX GET request
    ajaxList(queryURL);
});

//special case for the non Alcoholic drinks, we use a different base url
$(".nonAlcoholic").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    $(".drinks").empty();
    dropDownDrink = this.outerText;
    $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    
    // Constructing a URL to search cocktail db
    queryURL = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

    // Performing our AJAX GET request
    ajaxList(queryURL);
});

// Event listener for the search bar
$("#search").on("click", function() {

    //search term is pulled from the search bar
    var searchFor = $('.form-control').val();
    // Constructing a URL to search cocktail db
    var queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + searchFor;

    // Performing our AJAX GET request
    ajaxList(queryURL);
});

//Listens for clicks on a specific drink, this is to return ingredients
$(".drinks").on("click", '.drinkRecipe', function() {
    // In this case, the "this" keyword refers to the button that was clicked
    
    var drinkSearch;
    drinkSearch = this.outerText;    
    // Constructing a URL to search cocktail db
    queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + drinkSearch;

    // Performing our AJAX GET request
    ajaxDrink(queryURL);

});

//returns a list of drinks
var ajaxList = function(queryURL){
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // using the queryURL from click listener that called it
        .done(function(response) {
            // Storing an array of results in the results variable

            store = response;
            // Looping over every result item
            for (var i = 0; i < response.drinks.length; i++) {

                $('.drinks').append("<li><a class = 'drinkRecipe'>" + response.drinks[i].strDrink + "</a></li>");

            }
        });
}

//returns the ingredients for the first drink in the array, this
//searchs by the drink name so we assume that it's the first in the array
var ajaxDrink = function(){
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable

            store = response;

            //this remains true as long as the currentIngredient is not equal
            //to '', which means there are no more ingredients
            var moreIngredients = true;
            //i starts as 1 because there is no strIngredient0
            var i = 1;
            //holds the current ingredient
            var currentIngredient = '';
            //holds the current measure
            var currentMeasure = '';

            //While there is an ingredient we continue to loop
            while (moreIngredients) {
                
                //grab ingredient number i
                currentIngredient = 'response.drinks[0].strIngredient' + i;
                //grab measurement number i
                currentMeasure = 'response.drinks[0].strMeasure' + i;
                
                //go to the next ingredient for the next loop through
                i++;
                
                //if there is no current ingredient, then we break out of the loop
                if (eval(currentIngredient) === ''){
                    moreIngredients = false;
                    //returns instructions
                    console.log(response.drinks[0].strInstructions);
                    //exits the loop
                    return;
                }
                
                //returns the current ingredient
                console.log(eval(currentMeasure) + eval(currentIngredient));
            } 

        });
}