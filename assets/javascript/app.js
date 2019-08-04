$(document).ready(function () {
            //Array of Topics Begin here, new topics can be pushed into the current array
            var topics = ["stunna", "shade", "waves", "lionking", "excuseme", "fabulous", "shine", "dranks", "dive", "cash"]
            console.log(topics);
            ;
            // Gif Function to display starts here
            function displayGifButtons() {
                $("#gifButtonTopics").empty();
                for (var i = 0; i < topics.length; i++) {
                    var gifButton = $("<button>");
                    gifButton.addClass("topics");
                    gifButton.addClass("btn btn-primary")
                    gifButton.attr("data-name, topics[i]");
                    gifButton.text(topics[i]);
                    $("#gifButtonTopics").append(gifButton);
                }
            }

            // Gif Function to add a new Topics starts here
            function addNewButton() {
                $("addGif").on("click", function () {
                    var topics = $(topics - input).val().trim();
                    if (topics == "") {
                        return false;
                    }
                    actions.push(topics);

                    displayGifButtons();
                    return fasle;
                });
            }
        })
            //Remove the last Topic Button
            function removePrevButton() {
                $("removeGif").on("click", function () {
                    topics.pop(topics);
                    displayGifButtons();
                    return false;
                });
            }

            //This Function will display all the gifs
            function displayGifs(){
                var topics = $(this).attr("data-name");
                var queryURL = "http://api.giphy.com/v1/gifs/search?q="+topics+ "&api_key=I63oIijOfJFFHHgcDgIXgqJ3QzwdsgVBlimit=10";
                console.log(queryURL) ;
                $.ajax({url: queryURL,method: 'GET' })
        
        .done(function(response) {
            console.log(response);
            $("gifButtonTopics").empty();
            var results = response.data;
            if (results == ""){
                alert("No Gif  avaiable for this selected button");
            }
            for (var i=0; i<results.length; i++) {

                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var  gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                //Pulling Gif here
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed__height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed__height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed__height_small.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                //adding div and gifs to displayGifButtons
                $("#gifsTopics").prepend(gifDiv);
            }
        });
            }
            //Calling Methods and Functions
            displayGifButtons();
            addNewButton();
            removePrevButton();
            //Document Event Listeners
            $(document).on("click", ".topics", displayGifs);
            $(document).on("click", ".image", function(){
                var state = $(this).attr('data-state');
                if ( state == 'still'){
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-science', 'animate');
                }else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            });
       
