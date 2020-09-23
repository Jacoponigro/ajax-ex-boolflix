// document.ready

$(document).ready(function(){
    $("#search-movie").keydown(function(evento){
        if(evento.which == 13){
            searchFilm($("#search-movie").val());
        }
    })

    $("#search-button").click()
    searchFilm($("#search-movie").val());
});
// /document ready

function searchFilm(keyword){
  // chiamata ajax

    $.ajax({
      url:"https://api.themoviedb.org/3/search/movie",
      data: {
          "api_key": "7b547eb1f4054ea261db5c02ae0f35d6",
          "language": "it-IT",
          "query": keyword,
          "page": 1
      },
      success: function(data,state){
          var movieResult = data.results;
          for(var i = 0; i < movieResult.length; i++){
            filmAppear(movieResult[i]);
          }
      },
      error: function(){
        alert("Errore!")
        }
    });
}
  // /chiamata ajax
   // funzione filmAppear

function filmAppear(oggetto){
    var template = Handlebars.compile($("#template").html());
    $(".movies").append(template(oggetto));
}
