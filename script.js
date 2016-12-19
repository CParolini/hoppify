addb.init({
    appId: 5
});

var store;
//GET https://api.nasa.gov/planetary/apod
// queryURL = 'https://api.nasa.gov/planetary/apod?api_key=JriRvBTYjm21L3BZZH02EcgILuFmDfyCNWyC3tnb';
// $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
//         console.log(response);
//         //$('.pod').html('<img src="' + response.url + '">');
//         store = response;
//       });

queryURL = 'https://addb.absolutdrinks.com/drinks/absolut-cosmopolitan/?apiKey=4066a39eed9046f9ab30188b2ebe1241';

$.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
        
        //$('.pod').html('<img src="' + response.url + '">');
        store = response;
        console.log(response);
      });
