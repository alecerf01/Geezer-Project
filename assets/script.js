// Setting local storage to store history buttons and making an array

var buttonHistory = JSON.parse(localStorage.getItem("song-name")) || [];
buttonHistory.forEach(renderButtons);


// creating a variable to select the search button
var searchButton = $("#search-button");

// ! Displays Artist Info
function displayMusicInfo() {
  console.log(songName);



  // * ajax call using deezer API to get song container information

  const deezerAPI = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + songName,
    method: "GET",
    headers: {

      // set developer API key from rapid API
      "X-RapidAPI-Key": "8053b157d6mshabf6994a388aac1p1441a0jsn89c2ee3a673d",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  $.ajax(deezerAPI).then(function (response) {
    $("#song-container").empty();

    console.log(response);

    // Song name

    var title = $("<div>")
      .addClass("song-name text-center")
      .text(response.data[0].title);

      // Album image

    var albumImage = $("<img>")
      .addClass("album-image")
      .attr("src", response.data[0].album.cover_big)
      .css({ "border-radius": "10px", height: "300px" });

      // Artist name

    var artist = $("<div>")
      .addClass("artist text-center")
      .text(response.data[0].artist.name);

    // audio element

    var audioEl = $("<audio>").attr("controls", "");

    var songSample = $("<source>").attr({
      src: response.data[0].preview,
      type: "audio/mpeg",
    });

    // Appending elements to HTML body
    audioEl.append(songSample);
    $("#song-container").append(albumImage, title, artist, audioEl);
  });
}

// ! Displays the Lyrics
function displayLyrics() {

   // * ajax call using genius song lyrics API to get song container information

  const geniusAPI = {
    async: true,
    crossDomain: true,
    url:
      "https://genius-song-lyrics1.p.rapidapi.com/search/?q=" +
      songName +
      "&per_page=10&page=1",
    method: "GET",
    headers: {

      // set developer API key from rapid API

      "X-RapidAPI-Key": "8053b157d6mshabf6994a388aac1p1441a0jsn89c2ee3a673d",
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };
  let songID;
// Getting song ID from API call
  $.ajax(geniusAPI)
    .then(function (response) {
      songID = response.hits[0].result.id;
      console.log(songID);
    })

    // * passing songID variable into new ajax call to get lyrics as API requires song id


    .then(function () {
      const lyrics = {
        async: true,
        crossDomain: true,
        url:
          "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=" +
          songID,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "8053b157d6mshabf6994a388aac1p1441a0jsn89c2ee3a673d",
          "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
      };

      $.ajax(lyrics).done(function (response) {
        $("#lyrics-container").empty();

        // logs Genius API JSON

        console.log(response);
        
        // Gets the lyrics from the API call

        let songLyrics = response.lyrics.lyrics.body.html;

        // logs lyrics in console
        console.log(songLyrics);

        // adds lyrics to page
        $("#lyrics-container").addClass("text-center").append(songLyrics);
      });
    });
}

// ! Creates the buttons after a new search
function renderButtons(text) {
  
  // creates button element for button history container
  historyButton = $("<button>")
  // sets class names which bootstrap styles and sizes
    .addClass("history-button btn btn-success col-xl-12")
    .attr("data-name", text)
    .text(text);
    // adds history button to song history container
  $("#button-history-container").append(historyButton);
}

// ! Search function button click
searchButton.on("click", function (event) {
  event.preventDefault();

  // sets global variable for song name
  songName = $("#formGroupExampleInput").val().trim();

  displayMusicInfo();
  displayLyrics();
  // makes it so that if same song name is input it doesn't create a button with the same song name
  // and doesn't add same name to local storage
  if (!buttonHistory.includes(songName)) {
    renderButtons(songName);
// pushes song name into local storage array
    buttonHistory.push(songName);
    // prints local storage array in console
    console.log(buttonHistory);
    // sets previously local storage variable to be grabbed by getItem
    localStorage.setItem("song-name", JSON.stringify(buttonHistory));
  }
});


// ! Search function for form submit
var input = $("#search-input")

input.on("submit", function (event) {
  // prevents page from reloading on submit
  event.preventDefault();
  songName = $("#formGroupExampleInput").val().trim();

  // performs same funtion as above
  displayMusicInfo();
  displayLyrics();
  if (!buttonHistory.includes(songName)) {
    renderButtons(songName);

    buttonHistory.push(songName);
    console.log(buttonHistory);
    localStorage.setItem("song-name", JSON.stringify(buttonHistory));
  }
});

// ! History button click event
$("#button-history-container").on("click", "button", function () {
  songName = $(this).text();
  displayMusicInfo();
  displayLyrics();
});