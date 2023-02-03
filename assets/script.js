function displayMusicInfo() {
  
  songName = $("#formGroupExampleInput").val().trim();
  console.log(songName)

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
  console.log(response.data[0].title);
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
  $("#song-container").append(title, albumImage, artist, audioEl);
  // $("#mp3").append(audioEl)
});
}

function displayLyrics() {
  
  var songName = $("#formGroupExampleInput").val().trim();
const geniusAPI = {
  async: true,
  crossDomain: true,
  url: "https://genius-song-lyrics1.p.rapidapi.com/search/?q=" + songName + "&per_page=10&page=1",
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
        "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=" + songID,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": deezerAPIKey,
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    $.ajax(lyrics).done(function (response) {
      console.log(response);
      let songLyrics = response.lyrics.lyrics.body.html;
      console.log(songLyrics);
      let lyricsContainer = $("#lyrics-container").addClass(
        "text-center overflow-auto"
      );
      lyricsContainer.append(songLyrics);
    });
  })};

  function renderButtons() {
    historyButton = $("<button>").addClass("history-button btn btn-success col-lg-10").attr("data-name", songName).text(songName);
    $("#button-history-container").append(historyButton);
  }
  

var searchButton = $("#search-button")

searchButton.on("click", function(event){
  event.preventDefault()

  // lyricsContainer.empty();
  // $("#song-container").empty();

  displayMusicInfo();
  displayLyrics();
  renderButtons()

})
