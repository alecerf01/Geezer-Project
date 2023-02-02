const geniusAPI = {
  async: true,
  crossDomain: true,
  url: "https://genius-song-lyrics1.p.rapidapi.com/search/?q=enemy&per_page=10&page=1",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

$.ajax(geniusAPI).done(function (response) {
  console.log(response);
  console.log(response.hits[0].result.path);
});

function displayMusicInfo() {
  var songName = "enemy league";

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
  });
}
