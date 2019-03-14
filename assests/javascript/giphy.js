var sportTeams = [
  "Chicago Bulls",
  "Dallas Cowboys",
  "New York Yankees",
  "Los Angeles Kings",
  "Toronto Raptors",
  "Houston Texans",
  "Chicago Cubs",
  "Chicago Bears"
];
//getting giphy and rating API information
function displaySportInfo() {
  var sport = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=G1Zql4AYAz9nnSX7rqeWX5G3fpH81waW&q=" +
    sport +
    "&limit=10&offset=0&rating=PG&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("hello", response);

      //creating a div to put the rating
      var sportDiv = $("<div class='sport'>");
      var rating = response.data[i].rating;
      var p = $("<p>").text("Rating:" + rating);
      sportDiv.append(p);

      //storing  the giphy image both still and animate
      var stillLink = response.data[i].images.fixed_height_still.url;
      var animatedLink = response.data[i].images.fixed_height.url;
      var image = $("<img>");
      image.attr("src", animatedLink);
      image.attr("data-stillLink", stillLink);
      image.attr("data-animatedLink", animatedLink);
      image.attr("data-currentstate", "animated");
      image.attr("class", "gif");

      sportDiv.append(image);
    }
    //appending both image and rating onto the html
    $("#image").append(sportDiv);
  });
}
//to pause and animate the giphy
$(document).on("click", ".gif", function() {
  console.log("clicked", $(this).data().currentstate);

  if ($(this).data().currentstate === "animated") {
    console.log("STILL ", $(this).data().stilllink);
    $(this).attr("src", $(this).data().stilllink);
    $(this).data("currentstate", "still");
  } else {
    console.log("ANIMATE!", $(this).data().animatedlink);
    $(this).attr("src", $(this).data().animatedlink);
    $(this).data("currentstate", "animated");
  }
});
//Function for displaying a button added by user representing a sport team
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < sportTeams.length; i++) {
    var a = $("<button>");
    a.addClass("sport-btn");
    a.attr("data-name", sportTeams[i]);
    a.text(sportTeams[i]);
    $("#buttons-view").append(a);
  }
}

//Function for displaying the sport team input in the text box
$("#add-sport").on("click", function(event) {
  event.preventDefault();
  var sport = $("#sport-input")
    .val()
    .trim();
  sportTeams.push(sport);
  renderButtons();
});

//this will trigger the button of the team to show the giphy and rating
$(document).on("click", ".sport-btn", displaySportInfo);

renderButtons();
