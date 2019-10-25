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
            runAjax(newTopicText)
            appendButtons();
        }
    });

    // Append topics to buttons div
    function appendButtons() {
        // create a  button with a dataValue that matches the array index text
        topics.forEach(topicText => {
            let newButton = $(`<button type="button" class="btn btn-outline-light topicBtn">`)
                .attr("dataValue", topicText)
                .text(topicText)
            $("#buttons").append(newButton);
        });
    };

    function runAjax(data) {
        $("#gifs-appear-here").empty();
        // ajax call function
        let topic = data;
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=15`;
        console.log("ajax start", queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let results = response.data;

            results.forEach(element => {
                let gifDiv = $(`<div class="col-md-4">`);
                let rating = $(`<p class="gifRating col-sm-12">`).text("Rating: " + element.rating);
                let topicImage = $(`<img class="topicImg" src=${element.images.downsized_still.url} src-alt=${element.images.downsized.url}></img>`);
                gifDiv.prepend(rating);
                gifDiv.prepend(topicImage);
                $("#gifs-appear-here").prepend(gifDiv);
            });
            // 'pause play' functionality for gif images. Using jquery and a bubble switch
            $(".topicImg").on("click", function () {
                console.log("onclick")
                console.log(this)
                let temp = $(this).attr('src')
                $(this).attr("src", $(this).attr("src-alt"))
                $(this).attr("src-alt", temp)
            });
        });
        console.log("ajax done");

    };

    // Button Click GET GIF function
    $(document).on("click", ".topicBtn", function () {
        console.log(this);
        let btnDataVal = $(this).attr("dataValue");
        runAjax(btnDataVal);
    });


    // document ready function
});