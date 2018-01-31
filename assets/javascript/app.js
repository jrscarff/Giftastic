var topics = ["Mad", "Really?", "What?", "Frightened", "Excited", "Nervous", "Are you kidding me?", "How?", "Surprised", "Annoyed", "Bored", "Lazy", "Busy"]



function renderButtons() {
	$("#button-view").empty();
	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button class=option>");
		newButton.text(topics[i]);
		newButton.attr("data-name", topics[i]);
		$("#button-view").append(newButton);
	}
}

$("#add-button").on("click", function(event) {
	event.preventDefault();
	var input = $("#input").val().trim();
	topics.push(input);
	renderButtons();
})

function displayInfo() {
	$("#gifs-here").empty();
	var term = $(this).text();
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        term + "&api_key=eT4vBB23rlL2tAQxxpjSMkko2k3DXQX2&limit=10"

        $.ajax({
        	url: queryUrl,
        	method: "GET",
        }).then(function(response) {
        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $("<div class=item>");
        		var rating = results[i].rating;
        		var paragraph = $("<p>").text("Rating: " + rating);
        		var gifImages = $("<img class=gif>")
        		gifImages.attr("src", results[i].images.fixed_height_still.url);

        		gifDiv.append(paragraph);
        		gifDiv.append(gifImages);
        		$("#gifs-here").append(gifDiv);
        	}
        })
}
function startGif() {
      var src = $(this).attr("src");
      if($(this).hasClass('playing')){
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
        $(this).removeClass('playing');
      } else {
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
      }
     }

$(document).on("click",".option", displayInfo);

$(document).on("click",".gif", startGif);

renderButtons();