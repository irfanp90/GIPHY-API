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

function displaySportInfo() {
  var sport = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    sport +
    "&api_key=G1Zql4AYAz9nnSX7rqeWX5G3fpH81waW&limit10";

  //you are getting the API and have it add it to your HTML
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log("hello", response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        //creating a div to put the giphy image
        var sportDiv = $("<div class='sport'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating:" + rating);
        sportDiv.append(p);

        //storing  the giphy image
        var image = $("<img>");
        image
          .attr("src", results[i].images.fixed_height.url)
          .attr("class", "gif");

        sportDiv.append(p);
        sportDiv.append(image);
      }
    }

    $("#buttons-view").append(sportDiv);
  });
}

//Function for displaying sport teams
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

//Function hand event where sport button click
$("#add-sport").on("click", function(event) {
  event.preventDefault();
  var sport = $("#sport-input")
    .val()
    .trim();
  sportTeams.push(sport);
  renderButtons();
});

$(document).on("click", ".sport-btn", displaySportInfo);

renderButtons();
