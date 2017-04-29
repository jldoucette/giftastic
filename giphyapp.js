  

  $(document).ready(function(){
    var topics=["superman", "batman", "the flash", "wonder woman","spiderman"];
    var animateURL;
    var noAnimateURL;
    var rating;

  function setUp(){
  console.log("Starting setUp");
    $("#buttons").empty();
    for (var j=0;j<topics.length;j++){
    console.log("inside for loop of setup, j is "+ j);
    var buttonInit=$("<button>");
    buttonInit.addClass("topics");
    buttonInit.attr("data-topic", topics[j]);
    buttonInit.text(topics[j]);
    $("#buttons").append(buttonInit);
  }
          clicked();
          // clickImage();
          // addHero();
}

   console.log("Document ready");
   function clicked() {
    console.log("Function clicked started");
    $("button").on("click", function() {
      console.log("Clicked Button");
      event.preventDefault();
      $("#gifs").empty();
      var queryLimit=10;
      var ratingFilter="g";
      var topicSearch = $(this).attr("data-topic");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=dc6zaTOxFJmzC&limit="+queryLimit+"&rating="+ratingFilter;
      
        console.log("starting AJAX query");
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            animateURL=results[i].images.fixed_width.url;
            noAnimateURL=results[i].images.fixed_width_still.url;
            rating=results[i].rating;  
            console.log(animateURL);
            console.log(noAnimateURL);
            console.log(rating);
            
            var ratingText = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            var imageID="image"+i;
            gifImage.attr("data-animate", animateURL);
            gifImage.attr("data-noanimate", noAnimateURL);
            gifImage.attr("src", noAnimateURL);
            gifImage.attr("data-state", "still");
            // gifImage.attr("data-state","animate");
            gifImage.addClass("gif");
            gifImage.attr("id",imageID);
            gifDiv.prepend(ratingText);
            gifDiv.prepend(gifImage);

            $("#gifs").prepend(gifDiv);
            console.log("attempted to prepend");
            }
        });
      });
  }

// function clickImage() {
  console.log("Click Image Started");
          $("#gifs").on("click", "img", function() {
            console.log('clicked ' + $(this));
            var itemClicked=$(this).attr("id");
            var itemClickedStatus=$(this).attr("data-state");
            var itemClickedAnimate=$(this).attr("data-animate");
            var itemClickedNoAnimate=$(this).attr("data-noanimate");


      console.log("clicked on image " + itemClicked);
      console.log("Status is " + itemClickedStatus);
      event.preventDefault();
    
      if (itemClickedStatus=="still") {
      $(this).attr("src",itemClickedAnimate);
      $(this).attr("data-state","animate");
      console.log("Changed to Animate " + itemClickedAnimate);
    }
      else {
        console.log(this);
       $(this).attr("src",itemClickedNoAnimate);
       $(this).attr("data-state","still");

        console.log("Changed to No Animate " + itemClickedNoAnimate);
      }
    });


  // }

 // function addHero() {
  console.log("Add Hero Started");
   $("#add-hero").on("click", function(event) {
        event.preventDefault();
        var hero = $("#hero-input").val().trim();
        topics.push(hero);
        setUp();
        console.log("setUp started from addHero");
        console.log("About to start clicked from addHero");
        clicked();


      });

// }
  console.log("about to start setUp at bottom");
  setUp();

  
    });
   
