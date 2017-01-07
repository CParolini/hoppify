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
    $(".drinks").empty();
    $(".form-control").empty();
    return false;
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
var ajaxList = function(queryURL) {
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
var ajaxDrink = function(queryURL) {
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

            // returns a picture if there is a picture
            if (store.drinks[0].strDrinkThumb == '' || store.drinks[0].strDrinkThumb == null) {
                //default image
                console.log('<img src = "assets/imgages/' + dropDownDrink + '.jpg"></img>');
            } else {
                //pulls image from the database
                console.log('<img src = "' + response.drinks[0].strDrinkThumb + '"></img>');
            }

            //While there is an ingredient we continue to loop
            while (moreIngredients) {

                //grab ingredient number i
                currentIngredient = 'response.drinks[0].strIngredient' + i;
                //grab measurement number i
                currentMeasure = 'response.drinks[0].strMeasure' + i;

                //go to the next ingredient for the next loop through
                i++;

                //if there is no current ingredient, then we break out of the loop
                if (eval(currentIngredient) === '') {
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

//Array of images which you want to show: Use path you want.
var images=['assets/image/bar1.jpg','assets/image/bar2.jpg','assets/image/bar3.jpg','assets/image/bar4.jpg','assets/image/bar5.jpg'];
var nextimage=0;
doSlideshow();

function doSlideshow(){
    if(nextimage>=images.length){nextimage=0;}
    $('body')
    .css('background-image','url("'+images[nextimage++]+'")')
    .css('background-size','50%')
    .fadeIn(500,function(){
        setTimeout(doSlideshow,5000);
    });
}
//click on license tab
$('#license').on('click', function(){
//clear the drinks and info section
	$('.drinks').empty();
	$('.drinkRecipe').empty();
	$('.info').empty();
//add a image link and paragraph
	$('.info').html("<a href='https://txbartendinglicense.com/web/index.php?siteid=61&pageid=339' target='_blank'>"+'<img src="assets/image/tabc.jpg"'+"</a>");
	$('.drinks').html("<p>'Learn How to be a Great Bartender!<br> This Bartender Mixology course is a great way to learn how to make hundreds of different drinks.It's a self-paced course that rated at 40 hours and contains all the information you need to know to become a great bartender and make better tip money!  This is a great certification to have on your resume, as it demonstrates that you have taken extensive training and are familiar with the drinks, terminology, and equipment involved with the bar or restaurant field of work. Click on image to get more information and GOOD LUCK!'</p>")
})
//click on about tab
$('#about').on('click', function(){
//clear the drinks and info section
	$('.drinks').empty();
	$('.drinkRecipe').empty();
	$('.info').empty();
//add a image and paragraph
	$('.info').html('<img src="assets/image/vincent.jpg">');
	$('.drinks').html("<p>I'm Vincent Gonzalez</p>");
})
