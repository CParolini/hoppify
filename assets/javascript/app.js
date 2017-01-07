//This variable is mainly for storing a response in a global variable for 
//debugging, it shouldn't be necessary anywhere in the code
var store = "";
//This variable holds the text from the dropdown search bar. It is responsible
//for finding the default image and it goes on the end of the queryURL as the
//search term
var dropDownDrink = '';
//this holds the ajax call for a function to execute
var queryURL = '';
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
    $(".info").html("<img src='assets/image/" + dropDownDrink + ".jpg' height='175' width='285' >")

    // Constructing a URL to search cocktail db - the search term is filled by the
    //drop down that was selected
    queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + dropDownDrink;

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
    queryURL = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";

    //special search case, this will cause a different function to be called
    //when a nonAlcoholic drink is clicked
    hasAlcohol = 'nonAlcoholic';

    // Performing our AJAX GET request
    ajaxList(queryURL);
});

// Event listener for the search bar
$("#search").on("click", function() {

    //if the search form is blank, do not send a query
    if ($('.drinkForm').val()==''){
        return;
    }
    //search term is pulled from the search bar
    var searchFor = $('.drinkForm').val();

    // Constructing a URL to search cocktail db
    var queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + searchFor;

    //default search, this works for any type of drink (alcoholic or not) 
    //because the url we use above
    hasAlcohol = 'alcoholic';

    // Performing our AJAX GET request
    ajaxList(queryURL);
    $(".drinks").empty();
    $(".form-control").empty();
    return false;
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
    queryURL = "http://www.thecocktaildb.com/api/json/v1/6526/search.php?s=" + drinkSearch;
    
    //calls the popup and empties the old values
    callModal();
    
    // Performing our AJAX GET request to get the missing info
    ajaxDrink(queryURL);

    
});

var callModal = function(){

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
    var span = document.getElementsByClassName("close")[0];

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
                $('.drinks').append("<li><a class = '"+ hasAlcohol +"' data-number = '"+ i +"'>" + response.drinks[i].strDrink + "</a></li>");

            }
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

    // returns a picture if there is a picture, or we add a default
    if (selectDrink.strDrinkThumb == '' || selectDrink.strDrinkThumb == null) {
        //default image
        //console.log('<img src = "assets/imgages/' + dropDownDrink + '.jpg"></img>');
        $(".modal-body").html('<img src = "assets/image/' + dropDownDrink + '.jpg"></img>');

    } else {
        //pulls image from the database
        //console.log('<img src = "' + selectDrink.strDrinkThumb + '"></img>');
        $(".modal-body").html('<img src = "' + selectDrink.strDrinkThumb + '" style="width: 250px; height:250px;"></img>');
    
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
                $(".modal-body").html('<img src = "assets/image/' + dropDownDrink + '.jpg" style="width: 250px; height:250px;"></img>');
            } else {
                //pulls image from the database
                //console.log('<img src = "' + response.drinks[0].strDrinkThumb + '"></img>');
                $(".modal-body").html('<img src = "' + response.drinks[0].strDrinkThumb + '" style="width: 250px; height:250px;"></img>');
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
    databaseURL: "https://hoppify-1bdea.firebaseio.com",
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

var enterChat = function(){
    
    if (!($(".chatForm").val() == "")){
    var chatMessage = $('.chatForm').val();

    console.log(chatMessage);


    database.ref().push({
        chat: chatMessage
    });
    $('.chatForm').val('');
    }    
}

document.onkeyup = function(event) {

    if (event.key=="Enter"){
       enterChat();
       console.log("hello");
    }
    console.log(event.key);
}

