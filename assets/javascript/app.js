
$(document).ready(function () {

  // Initial array of Animals

  var animals = [

    "bird", "bear", "cat", "chicken", "dog", "deer",

    "elephan", "ferret", "turtle", "lion", "chinchilla",

    "cygnini", "dragon", "eagle", "monkey", "rat",

    "parrot", "rabbit", "penguin", "kangaroo", "frog",

    "dolphin", "zebra", "raccoon", "goldfish", "whale"

  ];



  // function to make buttons and add to page

  function allClicks(arrayAnimals, newArray, aninmalButton) {

    $(aninmalButton).empty();

    //$("#animalbutton").empty();

    // create for looping for array of Animals 

    for (var i = 0; i < arrayAnimals.length; i++) {

      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)

      var a = $("<button>");

      // Adding a class of animals to our button

      a.addClass(newArray);

      // Adding a data-attribute

      a.attr("data-animal", arrayAnimals[i]);

      // Providing the initial button text

      a.text(arrayAnimals[i]);

      // Adding the button to the HTML

      $(aninmalButton).append(a);
    }

  }

  // Adding click event listen listener to all buttons

  $(document).on("click", ".animal-button", function () {

    $("#animals").empty();

    $(".animal-button").removeClass("ActiveThing");

    $(this).addClass("ActiveThing");



    // Grabbing and storing the data-animal property value from the button

    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name + key for 10 limit

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  
    // Performing an AJAX request with the queryURL

    $.ajax({

      url: queryURL,
      method: "GET"

    })

      // After data comes back from the request

      .then(function (response) {

        // Storing an array of results in the results variable

        var results = response.data;

        // Looping through each result item

        for (var i = 0; i < results.length; i++) {

          // create var animalDiv and store with animal-item class

          var animalDiv = $("<div/>").addClass("animal-item");

          // Storing the result item's rating

          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating

          var p = $("<p>").text("Rating: " + rating);

          // Setting the src attribute of the image to a property pulled off the result item

          var animateImg = results[i].images.fixed_height.url;

          var result = results[i].images.fixed_height_still.url;

          // Creating and storing an image tag

          var animalImage = $("<img>");

          // Setting the src attribute of the data anmiamls image

          animalImage.attr("src", result);

          animalImage.attr("data-still", result);

          animalImage.attr("data-animate", animateImg);

          animalImage.attr("data-state", "still");

          animalImage.addClass("animal-image");

          // Appending the paragraph and image tag to the animalDiv

          animalDiv.append(p);

          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#animals" div

          $("#animals").append(animalDiv);
        }

      });

  });

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function (event) {

    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    // This line grabs the input from the textbox
    var newAnimal = $("input").eq(0).val();
    //var newAnimal = $("input").val().trim();


    if (newAnimal.length > 2) {
      // Adding the animals from the textbox to our array
      animals.push(newAnimal);
    }
    // Running the populateButtons function(passing in the animals as an argument)
    allClicks(animals, "animal-button", "#animal-buttons");

  });


  // Function for displaying the animals info

  // We're adding a click event listener to all elements with the class "animal-image"

  // We're adding the event listener to the document because it will work for dynamically generated elements

  // $(".animal-image").on("click") will only add listeners to elements that are on the page at that time

  $(document).on("click", ".animal-image", function () {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element

    var state = $(this).attr("data-state");

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.

    // Then, set the image's data-state to animate

    if (state === "still") {

      $(this).attr("src", $(this).attr("data-animate"));

      $(this).attr("data-state", "animate");

    }

    // Else set src to the data-still value

    else {

      $(this).attr("src", $(this).attr("data-still"));

      $(this).attr("data-state", "still");

    }

  });

  // Running the allClicks function(passing in the animals as an argument)

  allClicks(animals, "animal-button", "#animal-buttons");

})