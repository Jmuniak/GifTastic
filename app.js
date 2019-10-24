$(function () {
    // Short Document Ready

    // array of topics
    let topics = ["Boba Fett", "Sci-Fi", "Snowboarding", "Nick Offerman", "Iron Man", "Letterkenny", "Guardians of the Galaxy", "R2D2", "Treasure Planet", "Hover Cars", "Avengers", "Nature", "Bob Ross"]

    console.log(topics);
    appendButtons();


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
            runAjax(newTopicText)
        }
    });

    // Append topics to buttons div
    function appendButtons() {
        // create a  button with a dataValue that matches the array index text
        topics.forEach(newTopicText => {
            let newButton = $(`<button type="button" class="btn btn-outline-dark">`)
                .attr("dataValue", newTopicText)
                .text(newTopicText)
            $("#buttons").append(newButton);
        });
    };

    function runAjax(data) {
        

    }

        // Button Click GET GIF function
        $(".btn").on("click", function () {
            $("#gifs-appear-here").empty();
            // ajax call function
            let topic = $(this).attr("dataValue");
            let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                topic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=15";
            console.log("ajax start");
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    let results = response.data;

                    for (let i = 0; i < 15; i++) {
                        let gifDiv = $(`<div class="col-md-3">`);
                        let rating = $(`<p class="gifRating col-sm-6">`).text("Rating: " + results[i].rating);
                        let topicImage = $(`<img class="topicImg" src=${results[i].images.downsized_still.url} src-alt=${results[i].images.downsized.url}></img>`);

                        gifDiv.prepend(rating);
                        gifDiv.prepend(topicImage);
                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                    $(".topicImg").on("click", function () {
                        console.log("onclick")
                        console.log(this)
                        let temp = $(this).attr('src')
                        $(this).attr("src", $(this).attr("src-alt"))
                        $(this).attr("src-alt", temp)
                    });
                });
            console.log("ajax done");
        });


    // document ready function
});