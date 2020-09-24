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
        renderResults(data.results);
      },
      "error": function(err) {
        alert("ERRORE!");
      }
    }
  );
  // /chiamata ajax
}

// funzione per stampare le voci

function renderResults(type, results) {

var source = $("#template").html();
var template = Handlebars.compile(source);

for (var i = 0; i < results.length; i++) {

  var title, original_title;

  if (type == "film") {
    title = results[i].title;
    original_title = results[i].original_title;
  } else if (type == "tv") {
    title = results[i].name;
    original_title = results[i].original_name;
  }

  var context = {
    "title": title,
    "original_title": original_title,
    "original_language":results[i].original_language,
    "vote_average":results[i].vote_average
    };

    var html = template(context);
    $(".movies").append(html);
  }
}
// funzione per stelline piene e vuote
function starsAppear(number){
  var number = Math.ceil(number / 2);
  var string = "";

  for (var i = 0; i < 6; i++) {
    if (i <= number) {
      string += "<i class='fas fa-star'></i>"
    }
    else {
      string += "<i class='far fa-star'></i>"
    }
   }
   return string;
}

// funzione per pulire input e pagina

function resetSearch(){
  $(".movies").html("");
  $("#search-movie").val("");
}
