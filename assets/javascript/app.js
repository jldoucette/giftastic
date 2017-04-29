  

  $(document).ready(function(){
    var topics=["superman", "batman", "the flash", "wonder woman","spiderman"];
    var animateURL;
    var noAnimateURL;
    var rating;

    function setUp(){
          $("#buttons").empty();
          for (var j=0;j<topics.length;j++){
          var buttonInit=$("<button>");
          buttonInit.addClass("topics btn-lg");
          buttonInit.attr("data-topic", topics[j]);
          buttonInit.text(topics[j]);
          $("#buttons").append(buttonInit);
        }
          clicked();
    }

       function clicked() {
           $("button").on("click", function() {
            event.preventDefault();
            $("#gifs").empty();

            var queryLimit=10;
            var ratingFilter="g";
            var topicSearch = $(this).attr("data-topic");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=dc6zaTOxFJmzC&limit="+queryLimit+"&rating="+ratingFilter;
            
            $.ajax({
                url: queryURL,
                method: "GET"
              })
                .done(function(response) {
                  var results = response.data;

                      for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='item'>");
                        animateURL=results[i].images.fixed_width.url;
                        noAnimateURL=results[i].images.fixed_width_still.url;   
                        rating=results[i].rating;  
                        
                        var ratingText = $("<p>").text("Rating: " + rating);

                        var gifImage = $("<img>");
                        var imageID="image"+i;
                        gifImage.attr("data-animate", animateURL);
                        gifImage.attr("data-noanimate", noAnimateURL);
                        gifImage.attr("src", noAnimateURL);
                        gifImage.attr("data-state", "still");
                        gifImage.addClass("gif");
                        gifImage.attr("id",imageID);
                        gifDiv.prepend(ratingText);
                        gifDiv.prepend(gifImage);

                        $("#gifs").prepend(gifDiv);
                        }
                });
            });
      }

          $("#gifs").on("click", "img", function() {
            var itemClicked=$(this).attr("id");
            var itemClickedStatus=$(this).attr("data-state");
            var itemClickedAnimate=$(this).attr("data-animate");
            var itemClickedNoAnimate=$(this).attr("data-noanimate");

      event.preventDefault();
    
            if (itemClickedStatus=="still") {
            $(this).attr("src",itemClickedAnimate);
            $(this).attr("data-state","animate");
          }
            else {
             $(this).attr("src",itemClickedNoAnimate);
             $(this).attr("data-state","still");
            }
          });

       $("#add-hero").on("click", function(event) {
            event.preventDefault();
            var hero = $("#hero-input").val().trim();
            topics.push(hero);
            setUp();

      });

  setUp();
  
    });
   
