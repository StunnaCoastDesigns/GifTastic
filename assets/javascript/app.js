$(function () {
    populateButtons(topics, 'searchButton', "#gifButtonTopics");
    console.log("Page Loaded");
})
//Array of Topics Begin here, new topics can be pushed into the current array
var topics = ["Stunna", "Shade", "Waves", "Lion King", "Excuse Me", "Fabulous", "Shine", "Dranks", "Dive", "Cash"]
console.log(topics);

function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
}
$(document).on("click", ".searchButton", function () {
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ type + "&api_key=I63oIijOfJFFHHgcDgIXgqJ3QzwdsgVB&limit=10";
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#searches").append(searchDiv);

            }
        })
})
$("#addSearch").on("click", function () {
    var newSearch = $("input").eq(0).val();
})