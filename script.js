// document ready

$(document).ready(function() {
// input tramite click

  $("#search-button").click(function(){
  var searchMovies = $("#search-movie").val();
  resetSearch();
  getMovies(searchMovies)
});
// input tramite invio

$("#search-movie").keydown(function(event){
  if (event.wich == 13) {
    var searchMovies = $("#search-movie").val();
    resetSearch();
    getMovies(searchMovies)
    }
  });
});


function getMovies(key) {
// chiamata ajax

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data": {
        "api_key":"7b547eb1f4054ea261db5c02ae0f35d6",
        "query": key,
        "language": "it-IT"
      },
      "method":"GET",
      "success": function(data){
        renderMovie(data.results);
      },
      "error": function(err) {
        alert("ERRORE!");
      }
    }
  );
  // /chiamata ajax
}

// funzione per stampare le voci

function renderMovie(movies) {

var source = $("#template").html();
var template = Handlebars.compile(source);

for (var i = 0; i < movies.length; i++) {
  var context = {
    "title": movies[i].title,
    "original_title":movies[i].original_title,
    "original_language":movies[i].original_language,
    "vote_average":movies[i].vote_average
    };

    var html = template(context);
    var appendo = $(".movies").append(html);
  }
}

// funzione per pulire input e pagina

function resetSearch(){
  $(".movies").html("");
  $("#search-movie").val("");
}
