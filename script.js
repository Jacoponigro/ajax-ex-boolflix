// document ready

$(document).ready(function() {
// input tramite click

  $("#search-button").click(function(){
  var searchMovies = $("#search-movie").val();
  resetSearch();
  getMovies (searchMovies);
  getSeries (searchMovies);
});
// input tramite invio

$("#search-movie").keydown(function(event){
  if (event.wich == 13) {
    var searchMovies = $("#search-movie").val();
    resetSearch();
    getMovies (searchMovies);
    getSeries (searchMovies);
    }
  });
});


function getMovies(key) {
// chiamata ajax per richiamare API e stampare film

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
        renderResults("movie",data.results);
      },
      "error": function(err) {
        alert("ERRORE!");
      }
    }
  );
  // /chiamata ajax
}



function getSeries(key) {
  // chiamata ajax per richiamare API e stampare film

  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data": {
        "api_key": "7b547eb1f4054ea261db5c02ae0f35d6",
        "query": key,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        renderResults("tv",data.results);
      },
      "error": function(err) {
        alert("ERRORE!");
      }
    }
  );
  // /chiamata ajax
}
// funzione per stampare le voci

function renderResults(type,results) {

var source = $("#template").html();
var template = Handlebars.compile(source);

for (var i = 0; i < results.length; i++) {

  var title, original_title, list;

  if (type == "movie") {
    title = results[i].title;
    original_title = results[i].original_title;
    list = $(".movies");
  } else if (type == "tv") {
    title = results[i].name;
    original_title = results[i].original_name;
    list = $(".series");
  }
  if (results[i].poster_path == null) {
    var poster = "img/noposter.png";
  } else {
    var poster = "https://image.tmdb.org/t/p/w342"+results[i].poster_path;
  }

  var context = {
    "poster": poster,
    "title": title,
    "original_title": original_title,
    "original_language": printFlags(results[i].original_language),
    "vote_average": starsAppear(results[i].vote_average),
    "type": type
    };

    var html = template(context);
    list.append(html);
  }
}
// funzione per stelline piene e vuote
function starsAppear(number){
  var number = Math.ceil(number / 2);
  var string = "";

  for (var i = 0; i < 5; i++) {
    if (i <= number) {
      string += "<i class='fas fa-star'></i>"
    }
    else {
      string += "<i class='far fa-star'></i>"
    }
  }
   return string;
}

function printFlags(original_language) {
  var flags = [
    "it",
    "en",
    "fr",
    "gr",
    "sp"
  ];

  if(flags.includes(original_language)) {
    return "<img class='flag' src='img/" + original_language +".svg'>";
  }

  return lang;
}


// funzione per pulire input e pagina

function resetSearch(){
  $(".movies").html("");
  $(".series").html("");
  $("#search-movie").val("");
}
