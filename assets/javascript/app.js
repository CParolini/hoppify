//This variable is mainly for storing a response in a global variable for
//debugging, it shouldn't be necessary anywhere in the code
var store = "";
//This variable holds the text from the dropdown search bar. It is responsible
//for finding the default image and it goes on the end of the queryURL as the
//search term
var dropDownDrink = '';
//this holds the ajax call for a function to execute
var queryURL = '';
var queryURL2 = '';
//Our default query searches by the drink name, but the non-alcholic tab
//does a search for alcohol. This search returns less information, so later
//we need to search for the specific drink by name to get the missing info
var hasAlcohol = '';
//holds the current clickable drinks on the page
var currentDrinks = '';

// Event listener for all drop down elements except the non Alcoholic drinks (special case)
$(".mixMenu").on("click", function() {
    // In this case, the "this" keyword refers to the dropdown option that was clicked
    $(".drinks").empty();

    //pulls menu name
    dropDownDrink = this.outerText;
    //default image
    $(".info").html("<img class='drinkImg' src='assets/image/" + dropDownDrink + ".jpg' height='175' width='285' >")

    // Constructing a URL to search cocktail db - the search term is filled by the
    //drop down that was selected
    queryURL = "httpss://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + dropDownDrink;

    //uses the defulat query
    hasAlcohol = 'alcoholic';

    // Performing our AJAX GET request
    ajaxList(queryURL);
});

//special case for the non Alcoholic drinks, we use a different base url for these
$(".nonAlcoholic").on("click", function() {
    // In this case, the "this" keyword refers to the dropdown option that was clicked
    $(".drinks").empty();
    //pulls menu name
    dropDownDrink = this.outerText;
    //default image
    $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg' height='175' width='285'>")

    // Constructing a URL to search cocktail db - the search term is filled by the
    //drop down that was selected
    queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

    //special search case, this will cause a different function to be called
    //when a nonAlcoholic drink is clicked
    hasAlcohol = 'nonAlcoholic';

    // Performing our AJAX GET request
    ajaxList(queryURL);
});

// Event listener for the search bar
$(".search").on("click", function() {
    //resets the variable
    dropDownDrink = '';
    //if the search form is blank, do not send a query
    if ($('.drinkForm').val() == '') {
        return;
    }

    //search term is pulled from the search bar
    var searchFor = $('.drinkForm').val();

    // Constructing a URL to search cocktail db
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + searchFor;

    //default search, this works for any type of drink (alcoholic or not)
    //because the url we use above
    hasAlcohol = 'alcoholic';

    // Performing our AJAX GET request
    ajaxList(queryURL);
    $(".drinks").empty();
    $(".form-control").empty();
    return false;
});

// Event listener for the beer search bar
$("#search").on("click", function() {
    console.log('click');
    //search term is pulled from the search bar
    searchFor = $('.form-control').val();
    drinkName = searchFor.toLowerCase().replace(/ /g, "-");
    console.log(drinkName);
    // Constructing a URL to search cocktail db
    var queryURL2 = "https://api.malt.io/v1/public/recipes?detail=true&slugs=" + drinkName;

    // Performing our AJAX GET request
    ajaxList2(queryURL2);
    // if (dropDownDrink === "American Pale Ale") {
    //     $(".drinks").append("<p>" + "Of British origin, this style is now popular worldwide and the use of local ingredients, or imported, produces variances in character from region to region.Generally, expect a good balance of malt and hops.Fruity esters and diacetyl can vary from none to moderate, and bitterness can range from lightly floral to pungent." + "</p>");
    //     $(".drinks").append()
    //     $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    // } else if (dropDownDrink === "Dark Beer") {
    //     $(".drinks").append("<p>" + "Dark beer is made using roasted malt or roasted barley, hops, water and yeast. Stouts were traditionally the generic term for the strongest or stoutest porters, typically 7% or 8%, produced by a brewery." + "</p>");
    //     $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    // } else if (dropDownDrink === "Hefeweizen") {
    //     $(".drinks").append("<p>" + "Another name for Weissbier. 'Hefe' means yeast, and 'Weizen' means wheat, so Hefeweizen is 'yeast wheat.' Germans prefer to call the brew Weissbier, while North Americans prefer the term Hefeweizen. The beer is yeast turbid, because it is unfiltered." + "</p>");
    //     $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    // } else if (dropDownDrink === "Irish Red") {
    //     $(".drinks").append("<p>" + "Irish Red Ale is an ale originating in Ireland that has a reddish hue from the inclusion of a small amount of roasted barley. In America, some darker amber ales and ales with artificial coloring are also labeled as red ales." + "</p>");
    //     $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg'>")
    // } else {
    //     $(".drinks").empty();
    //     $(".info").empty();
    // }
    return false;
});

$(".beerMenu").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    dropDownDrink = this.outerText;
    drinkName = dropDownDrink.toLowerCase().replace(/ /g, "-");
    // Constructing a URL to search cocktail db
    queryURL2 = "https://api.malt.io/v1/public/recipes?detail=true&slugs=" + drinkName;
    if (dropDownDrink === "American Pale Ale") {
        $(".drinks").html("<h1 class='beerClass'>" + dropDownDrink + "</h1>");
        $(".drinks").append("<p class='time'>Total time until able to drink 28 days!</p>" + "<hr>");
        $(".drinks").append("<p>" + "American Pale Ale is of British origin, this style is now popular worldwide and the use of local ingredients, or imported, produces variances in character from region to region.Generally, expect a good balance of malt and hops.Fruity esters and diacetyl can vary from none to moderate, and bitterness can range from lightly floral to pungent." + "</p>");
        $(".drinks").append("<h2>Ingredients:</h2>" + "<h3>Fermentable:</h3>" + "<li>Pale liquid extract: 4kg</li>" + "<li>Caramel 60L: 0.25 lbs.</li>" + "<h3>Spices:</h3>" + "<li>Chinook: 18g</li>" + "<li>Citra: 28g</li>" + "<li>Cascade: 28g</li>" + "<h3>Yeast:</h3>" + "<li>Wyeast 1056 - American Ale</li>");
        $(".drinks").append("<h2>Steps:</h2>" + "<li>Heat Water to 154.4°F </li>" + "<li>Add 0.3kg of Caramel 60L and steep for 20 minutes.</li>" + "<li>Top up the wort to 10.0l and heat to a rolling boil (about 20 minutes).</li>" + "<li>Add 4.0kg of Pale liquid extract, 18g of Chinook</li>" + "<li>Add 28g of Citra</li>" + "<li>Add 28g of Cascade</li>" + "<li>Flame out; begin chilling to 68.0°F</li>" + "<li>Chilling complete aerate, pitch Wyeast 1056, seal fermenter and let sit for 14 days</li>" + "<li>Prime and bottle (about 56 bottles)</li>" + "<li>Relax, don't worry, and have a homebrew after 14 days!</li>");
        $(".info").html("<img class='beerImg' src='assets/image/" + dropDownDrink + ".jpg'>");
    } else if (dropDownDrink === "Dark Beer") {
        $(".drinks").html("<h1 class='beerClass'>" + dropDownDrink + "</h1>");
        $(".drinks").append("<p class='time'>Total time until able to drink 28 days!</p>" + "<hr>");
        $(".drinks").append("<p>" + "Dark beer is made using roasted malt or roasted barley, hops, water and yeast. Stouts were traditionally the generic term for the strongest or stoutest porters, typically 7% or 8%, produced by a brewery." + "</p>");
        $(".drinks").append("<h2>Ingredients:</h2>" + "<h3>Fermentable:</h3>" + "<li>Pale liquid extract: 4kg</li>" + "<li>Chocolate: 0.75kg</li>" + "<h3>Spices:</h3>" + "<li>Cascade: 28g * 3</li>" + "<h3>Yeast:</h3>" + "<li>Wyeast 3711 - French Saison</li>");
        $(".drinks").append("<h2>Steps:</h2>" + "<li>Heat Water to 154.4°F </li>" + "<li>Add 0.8kg of Chocolate and steep for 20 minutes.</li>" + "<li>Top up the wort to 10.0l and heat to a rolling boil.</li>" + "<li>Add 4.0kg of Pale liquid extract, 28g of Cascade for 30 Minutes</li>" + "<li>Wait 10 Minutes Add 28g of Cascade for 20 minutes</li>" + "<li>Wait 10 Minutes Add 28g of Cascade for 10 Minutes</li>" + "<li>Flame out; begin chilling to 68.0°F</li>" + "<li>Chilling complete aerate, pitch Wyeast 3711, seal fermenter and age at 68°F for 14 days</li>" + "<li>Prime and bottle (about 56 bottles)</li>" + "<li>Relax, don't worry, and have a homebrew after 14 days!</li>");
        $(".info").html("<img class='beerImg' src='assets/image/" + dropDownDrink + ".jpg'>");
    } else if (dropDownDrink === "Hefeweizen") {
        $(".drinks").html("<h1 class='beerClass'>" + dropDownDrink + "</h1>");
        $(".drinks").append("<p class='time'>Total time until able to drink 28 days!</p>" + "<hr>");
        $(".drinks").append("<p>" + "Another name for Weissbier. 'Hefe' means yeast, and 'Weizen' means wheat, so Hefeweizen is 'yeast wheat.' Germans prefer to call the brew Weissbier, while North Americans prefer the term Hefeweizen. The beer is yeast turbid, because it is unfiltered." + "</p>");
        $(".drinks").append("<h2>Ingredients:</h2>" + "<h3>Fermentable:</h3>" + "<li>Pale liquid extract: 4kg</li>" + "<li>Chocolate: 0.75kg</li>" + "<h3>Spices:</h3>" + "<li>Cascade: 28g * 3</li>" + "<h3>Yeast:</h3>" + "<li>Wyeast 3711 - French Saison</li>");
        $(".drinks").append("<h2>Steps:</h2>" + "<li>Heat Water to 154.4°F </li>" + "<li>Add 0.8kg of Chocolate and steep for 20 minutes.</li>" + "<li>Top up the wort to 10.0l and heat to a rolling boil.</li>" + "<li>Add 4.0kg of Pale liquid extract, 28g of Cascade for 30 Minutes</li>" + "<li>Wait 10 Minutes Add 28g of Cascade for 20 minutes</li>" + "<li>Wait 10 Minutes Add 28g of Cascade for 10 Minutes</li>" + "<li>Flame out; begin chilling to 68.0°F</li>" + "<li>Chilling complete aerate, pitch Wyeast 3711, seal fermenter and age at 68°F for 14 days</li>" + "<li>Prime and bottle (about 56 bottles)</li>" + "<li>Relax, don't worry, and have a homebrew after 14 days!</li>");
        $(".info").html("<img class='beerImg' src='assets/image/" + dropDownDrink + ".jpg'>");
    } else if (dropDownDrink === "Irish Red") {
        $(".drinks").html("<h1 class='beerClass'>" + dropDownDrink + "</h1>");
        $(".drinks").append("<p class='time'>Total time until able to drink 28 days!</p>" + "<hr>");
        $(".drinks").append("<p>" + "Irish Red Ale is an ale originating in Ireland that has a reddish hue from the inclusion of a small amount of roasted barley. In America, some darker amber ales and ales with artificial coloring are also labeled as red ales." + "</p>");
        $(".drinks").append("<h2>Ingredients:</h2>" + "<h3>Fermentable:</h3>" + "<li>Pale liquid extract: 4kg</li>" + "<li>Chocolate: 0.75kg</li>" + "<h3>Spices:</h3>" + "<li>Cascade: 28g * 3</li>" + "<h3>Yeast:</h3>" + "<li>Wyeast 3711 - French Saison</li>");
        $(".drinks").append("<h2>Steps:</h2>" + "<li>Heat Water to 154.4°F </li>" + "<li>Add 0.8kg of Chocolate and steep for 20 minutes.</li>" + "<li>Top up the wort to 10.0l and heat to a rolling boil.</li>" + "<li>Add 4.0kg of Pale liquid extract, 28g of Cascade for 30 Minutes</li>" + "<li>Wait 10 Minutes Add 28g of Cascade for 20 minutes</li>" + "<li>Wait 10 Minutes Add 28g of Cascade for 10 Minutes</li>" + "<li>Flame out; begin chilling to 68.0°F</li>" + "<li>Chilling complete aerate, pitch Wyeast 3711, seal fermenter and age at 68°F for 14 days</li>" + "<li>Prime and bottle (about 56 bottles)</li>" + "<li>Relax, don't worry, and have a homebrew after 14 days!</li>");
        $(".info").html("<img class='beerImg' src='assets/image/" + dropDownDrink + ".jpg'>");
    } else {
        $(".drinks").empty();
        $(".info").empty();
    }
});

// beer modal
$(".drinks").on("click", '.beerClass', function() {
    //stores the name of the drink
    // dropDownDrink = this.outerText;
    // drinkName = dropDownDrink.toLowerCase().replace(/ /g, "-");
    // // Constructing a URL to search cocktail db
    // url = "https://api.malt.io/v1/public/recipes?detail=true&slugs=" + drinkName;
    // console.log(url);

    callModal();

    ajaxList2(queryURL2);
});

//Listens for clicks on a specific drink, this is to return ingredients
//finds the alcoholic or default class to preform a normal search
$(".drinks").on("click", '.alcoholic', function() {
    // In this case, the "this" keyword refers to the specific drink that was clicked
    var number = $(this).data('number');

    //calls the popup and empties the old values
    callModal();

    //uses the database to search -- the normal query returns all needed info
    storedDrink(number);

});

//Listens for clicks on specific drinks that used the non-alcoholic search
//This url returns less information, and so we need to do an extra query to
//pull in the missing info
$(".drinks").on("click", '.nonAlcoholic', function() {
    //stores the name of the drink
    var drinkSearch;
    //pulls the name of the drink from the html and stores it in drinkSearch
    drinkSearch = this.outerText;
    //Searchs for ' and replaces it with &#39, so the queryURL can be read
    drinkSearch = drinkSearch.replace(/'/g, "&#39");

    // Constructing a URL to search cocktail db, the term comes from the clicked html
    queryURL = "https://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + drinkSearch;

    //calls the popup and empties the old values
    callModal();

    // Performing our AJAX GET request to get the missing info
    ajaxDrink(queryURL);


});

var callModal = function() {

    //empty the values from the last clicked on drink
    $(".modal-title").empty();
    $(".modal-body").empty();
    $(".modal-footer").empty();
    $(".modal-subfooter").empty();


    //    $('.popUp').show();
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");

    // When the user clicks on the button, open the modal

    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//returns a list of drinks from the cocktaildb
var ajaxList = function(queryURL) {
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // using the queryURL from click listener that called it
            .done(function(response) {
                // Storing an array of results in the results variable


                currentDrinks = response;

                //used for debugging
                //store = response;

                // Looping over every result item
                for (var i = 0; i < response.drinks.length; i++) {

                    //we give this a class of hasAlcohol to determine if we need
                    //to use the default search or special case in the future
                    //the data-number is where it appears in the array
                    $('.drinks').append("<li><a class = '" + hasAlcohol + "' data-number = '" + i + "'>" + response.drinks[i].strDrink + "</a></li>");

                }
            });
    }
    // beer ajax call
var ajaxList2 = function(queryURL2) {
    $.ajax({
            url: queryURL2,
            method: "GET"
        })
        // using the queryURL from click listener that called it
        .done(function(response) {
            // Storing an array of results in the results variable

            store = response;
            // Looping over every result item
            // for (var i = 0; i < response.length; i++) {
            // console.log(response[i].data);
            // $('.drinks').append("<li><a class = 'drinkRecipe'>" + response[i].data.name + "</a></li>");
            // $(".modal-body").html("<img src='assets/image/" + dropDownDrink + ".jpg'>");
            if (dropDownDrink === 'American Pale Ale') {
                $(".modal-body").html("<iframe width='420' height='315'src='httpss://www.youtube.com/embed/ZCy1cXeHDTQ'>" + "</iframe>");
            } else if (dropDownDrink === 'Dark Beer') {
                $(".modal-body").html("<iframe width='420' height='315'src='httpss://www.youtube.com/embed/SrPi4y9lOmc'>" + "</iframe>");
            } else if (dropDownDrink === 'Hefeweizen') {
                $(".modal-body").html("<iframe width='420' height='315'src='httpss://www.youtube.com/embed/EPfCTNiEggc'>" + "</iframe>");
            } else if (dropDownDrink === 'Irish Red') {
                $(".modal-body").html("<iframe width='420' height='315'src='httpss://www.youtube.com/embed/sTkwdIq7KSw'>" + "</iframe>");
            } else {
                return false;
            }
            // $(".modal-header").html(response[i].data.name);
            // $(".modal-header").html("<h1>" + dropDownDrink + "</h1>");
            // $(".modal-footer").html("<h2>Ingredients:</h2>" + "<h3>Spices:</h3>" + "<li>Chinook</li>");
            // $(".modal-subfooter").html("<h2>Steps:</h2>");

            // }
        });
}

//finds the drink that we stored on firebase based on which data-number we click on
var storedDrink = function(number) {

    //holds the current drink
    var selectDrink;
    //finds the drink clicked on by the data-number property
    selectDrink = currentDrinks.drinks[number];

    $(".modal-title").html(selectDrink.strDrink);

    //this remains true as long as the currentIngredient is not equal
    //to '', which means there are no more ingredients
    var moreIngredients = true;
    //i starts as 1 because there is no strIngredient0
    var i = 1;
    //holds the current ingredient
    var currentIngredient = '';
    //holds the current measure
    var currentMeasure = '';
    //sets default value if there is no drink selected, for the search function
    if (dropDownDrink == '') {
        dropDownDrink = 'default';
    }

    // returns a picture if there is a picture, or we add a default
    if (selectDrink.strDrinkThumb == '' || selectDrink.strDrinkThumb == null) {
        //default image
        //console.log('<img src = "assets/imgages/' + dropDownDrink + '.jpg"></img>');
        $(".modal-body").html('<img src = "assets/image/' + dropDownDrink + '.jpg" height="175" width="285"></img>');

    } else {
        //pulls image from the database
        //console.log('<img src = "' + selectDrink.strDrinkThumb + '"></img>');
        $(".modal-body").html('<img src = "' + selectDrink.strDrinkThumb + '" style="width: 285px; height:175px;"></img>');
    }

    //While there is an ingredient we continue to loop
    while (moreIngredients) {

        //grab ingredient number i
        currentIngredient = 'selectDrink.strIngredient' + i;
        //grab measurement number i
        currentMeasure = 'selectDrink.strMeasure' + i;

        //go to the next ingredient for the next loop through
        i++;

        //if there is no current ingredient, then we break out of the loop
        if (eval(currentIngredient) === '') {
            moreIngredients = false;
            //returns instructions
            //console.log(selectDrink.strInstructions);
            $(".modal-footer").append(selectDrink.strInstructions);
            //exits the loop
            return;
        }
        //returns the current ingredient
        //console.log(eval(currentMeasure) + eval(currentIngredient));
        $(".modal-subfooter").append(eval(currentMeasure) + eval(currentIngredient) + '</br>');
    }
}

//the non-alcoholic search requires more information, so we do another ajax call
var ajaxDrink = function(queryURL) {
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable

            store = response;

            $(".modal-title").html(response.drinks[0].strDrink);

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
            if (response.drinks[0].strDrinkThumb == '' || response.drinks[0].strDrinkThumb == null) {
                //default image
                //console.log('<img src = "assets/image/' + dropDownDrink + '.jpg"></img>');
                $(".modal-body").html('<img src = "assets/image/' + dropDownDrink + '.jpg" style="width: 285px; height:175px;"></img>');
            } else {
                //pulls image from the database
                //console.log('<img src = "' + response.drinks[0].strDrinkThumb + '"></img>');
                $(".modal-body").html('<img src = "' + response.drinks[0].strDrinkThumb + '" style="width: 285px; height:175px;"></img>');
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
                    //console.log(response.drinks[0].strInstructions);
                    $(".modal-footer").append(response.drinks[0].strInstructions);
                    //exits the loop
                    return;
                }

                //returns the current ingredient
                //console.log(eval(currentMeasure) + eval(currentIngredient));
                $(".modal-subfooter").append(eval(currentMeasure) + eval(currentIngredient) + '</br>');
            }


        });
}

//giving the firebase location
var config = {
    apiKey: "AIzaSyAWsHg3xzxLY3hT-WfHJJtJL3JmLqW7R8c",
    authDomain: "hoppify-1bdea.firebaseapp.com",
    databaseURL: "httpss://hoppify-1bdea.firebaseio.com",
    storageBucket: "hoppify-1bdea.appspot.com",
    messagingSenderId: "939603520664"
};

//initialize firebase
firebase.initializeApp(config);

//storing the database in a variable
var database = firebase.database();

//listens for a change, then adds new text on change
database.ref().on('child_added', function(snapshot) {
    $('#chatText').append('<p>' + snapshot.val().chat + '<p>');
});

// //Trying to autoscroll down -- This does not work yet
// function updateScroll(){
//     var element = document.getElementById("chatText");
//     element.scrollTop = element.scrollHeight;
// }

$(".chatbtn").on("click", function() {

    enterChat();



});

var enterChat = function() {

    if (!($(".chatForm").val() == "")) {
        var chatMessage = $('.chatForm').val();

        database.ref().push({
            chat: chatMessage
        });
        $('.chatForm').val('');
    }
}

document.onkeyup = function(event) {

    if (event.key == "Enter") {
        enterChat();
    }
}
