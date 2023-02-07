var buttonHistory = JSON.parse(localStorage.getItem("song-name")) || [];
buttonHistory.forEach(renderButtons);

var searchButton = $("#search-button");

// ! Displays Artist Info
function displayMusicInfo() {
  console.log(songName);

  const deezerAPI = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + songName,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": deezerAPIKey,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  $.ajax(deezerAPI).then(function (response) {
    $("#song-container").empty();

    console.log(response);

    // song data

    var title = $("<div>")
      .addClass("song-name text-center")
      .text("Song: " + response.data[0].title);

    var albumImage = $("<img>")
      .addClass("album-image")
      .attr("src", response.data[0].album.cover_big)
      .css({ "border-radius": "10px", height: "300px" });

    var artist = $("<div>")
      .addClass("artist text-center")
      .text("Artist: " + response.data[0].artist.name);

    // audio element

    var audioEl = $("<audio>").attr("controls", "");

    var songSample = $("<source>").attr({
      src: response.data[0].preview,
      type: "audio/mpeg",
    });

    // Appending elements to HTML body
    audioEl.append(songSample);
    $("#song-container").append(albumImage, title, artist, audioEl);
    // $("#mp3").append(audioEl)
  });
}

// ! Displays the Lyrics
function displayLyrics() {
  const geniusAPI = {
    async: true,
    crossDomain: true,
    url:
      "https://genius-song-lyrics1.p.rapidapi.com/search/?q=" +
      songName +
      "&per_page=10&page=1",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": deezerAPIKey,
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };
  let songID;

  $.ajax(geniusAPI)
    .then(function (response) {
      songID = response.hits[0].result.id;
      console.log(songID);
    })
    .then(function () {
      const lyrics = {
        async: true,
        crossDomain: true,
        url:
          "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=" +
          songID,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": deezerAPIKey,
          "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
      };

      $.ajax(lyrics).done(function (response) {
        $("#lyrics-container").empty();
        console.log(response);
        let songLyrics = response.lyrics.lyrics.body.html;
        console.log(songLyrics);
        $("#lyrics-container").addClass("text-center").append(songLyrics);
      });
    });
}

// ! Creates the buttons after a new search
function renderButtons(text) {
  historyButton = $("<button>")
    .addClass("history-button btn btn-success col-lg-10")
    .attr("data-name", text)
    .text(text);
  $("#button-history-container").append(historyButton);
}

// ! Search function
searchButton.on("click", function (event) {
  event.preventDefault();
  songName = $("#formGroupExampleInput").val().trim();
  // lyricsContainer.empty();
  // $("#song-container").empty();

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