$(function () {
    // Short Document Ready

    // array of topics
    let topics = ["Cowboy Beepop", "Sci-Fi", "Snowboarding", "Nick Offerman", "Iron Man", "Letterkenny", "Guardians of the Galaxy"]

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
        })

    // Button Click GET GIF function
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
                console.log(response);
                let results = response.data;

                for (let i = 0; i < 5; i++) {
                    let gifDiv = $("<div>");
                    let rating = $("<p>").text("Rating: " + results[i].rating);
                    let topicImage = $(`<img class="pics" src=${results[i].images.original_still.url} src-alt=${results[i].images.fixed_height.url}></img>`);

                    gifDiv.prepend(rating);
                    gifDiv.prepend(topicImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
                $(".pics").on("click", function () {
                    console.log("onclick")
                    console.log(this)
                    let temp = $(this).attr('src')
                    $(this).attr("src", $(this).attr("src-alt"))
                    $(this).attr("src-alt", temp)
                });
            });
        console.log("ajax done");

    });
};

    // document ready function
});