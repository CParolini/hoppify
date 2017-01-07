//  START CODING BELOW!!

    // Initialize Firebase
     var config = {
    apiKey: "AIzaSyAWsHg3xzxLY3hT-WfHJJtJL3JmLqW7R8c",
    authDomain: "hoppify-1bdea.firebaseapp.com",
    databaseURL: "https://hoppify-1bdea.firebaseio.com",
    storageBucket: "hoppify-1bdea.appspot.com",
    messagingSenderId: "939603520664"
  };


    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    var name = database.ref().name;
    var email = database.ref().email;
    var age = database.ref().age;
    var comment = database.ref().comment;


    // Capture Button Click
    $("#add-user").on("click", function() {

      // YOUR TASK!!!

      // Code in the logic for storing and retrieving the most recent user.
      name = $('#name-input').val().trim();
      email = $('#email-input').val().trim();
      age = $('#age-input').val().trim();
      comment = $('#comment-input').val().trim();


      database.ref().set({
        name: name,
        age: age,
        email: email,
        comment: comment
      });

      // Don't forget to handle the "initial load"


      // Don't refresh the page!
      return false;
    });


    // Create Firebase "watcher" Hint: .on("value")
    database.ref().on("value", function(snapshot) {
      $('#name-display').html('Name: ' + snapshot.val().name);
      $('#email-display').html('Email: ' + snapshot.val().email);
      $('#age-display').html('Age: ' + snapshot.val().age);
      $('#comment-display').html(snapshot.val().comment);
    });

    // Create Error Handling