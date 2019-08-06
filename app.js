$(function () {
    // Short Document Ready

    // array of topics
    let topics = ["Cowboy Beepop", "Star Citizen", "Snowboarding", "Nick Offerman", "Iron Man", "Letterkenny", "Guardians of the Galaxy"]

    console.log(topics);
    appendButtons();

    // Whenever a user clicks the click button
    // Get the new topic from the form
    $("#topicForm").submit(function (event) {
        event.preventDefault();
        if ($("#topicInput").val() === "") {
            alert("You need to enter a topic first")
        } else {
            let newTopicText = $("#topicInput").val();
            console.log(newTopicText);
            topics.push(newTopicText);
            console.log(topics);
            $("#buttons").empty();
            $("#topicForm")[0].reset();
            appendButtons();
        }
    });

    // Append topics to buttons div
    function appendButtons() {
        // create a  button with a dataValue that matches the array index text
        topics.forEach(newTopicText => {
            let newButton = $("<button>")
                .addClass("button secondary")
                .attr("dataValue", newTopicText)
                .text(newTopicText)
            $("#buttons").append(newButton);
            // Button Click GET GIF function
            // $(document.getElementsByClassName())  try this instead

            $(".button").on("click", function () {
                let topic = $(this).attr("dataValue");
                let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
                console.log("ajax start");
                $.ajax({
                        url: queryURL,
                        method: "GET"
                    })
                    .then(function (response) {
                        let results = response.data;

                        for (let i = 0; i < results.length; i++) {
                            let gifDiv = $("<div>");

                            let rating = results[i].rating;

                            let p = $("<p>").text("Rating: " + rating);

                            let topicImage = $("<img>");
                            topicImage.attr("src", results[i].images.fixed_height.url);

                            gifDiv.prepend(p);
                            gifDiv.prepend(topicImage);

                            $("#gifs-appear-here").prepend(gifDiv);
                        }
                    });
                console.log("ajax done");
            });


        })
    };




});