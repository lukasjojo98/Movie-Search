import { API_KEY } from './env.js';

let baseImageURL2 = "https://image.tmdb.org/t/p/";
let imageSize2 = "w154";
let imageURL = null;
let trendingMovies = [];
let url = null;
let baseURL = 'https://api.themoviedb.org/3/find/tt';
let baseImageURL = "https://image.tmdb.org/t/p/";
let imageSize = "w185";

let fetchSth = async function() {
    url = "".concat("https://api.themoviedb.org/3/movie/top_rated?api_key=",API_KEY,"&language=en-US");
    await fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        trendingMovies = data["results"];
    });
    var divElement = document.getElementById("layout-movies");
    for (var i = 1; i < 12; i++){
        if(i == 4){
            continue;
        }
        var inputElement = document.createElement("input");
        var hiddenInput = document.createElement("input");
        var hiddenInput2 = document.createElement("input");
        var formElement = document.createElement("form");
        console.log(trendingMovies);
        inputElement.type = "image";
        hiddenInput.name = "moviename";
        hiddenInput.type = "hidden";
        hiddenInput.value = trendingMovies[i]["title"];
        hiddenInput2.name = "movie_id";
        hiddenInput2.type = "hidden";
        hiddenInput2.value = "";
        formElement.setAttribute("action","/movie");
        formElement.method = "post";
        imageURL = "".concat(baseImageURL2,imageSize2,trendingMovies[i]["poster_path"]);
        inputElement.src = imageURL;
        formElement.append(inputElement);
        formElement.append(hiddenInput);
        divElement.append(formElement);
    }
}
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
    }

let findPosterByImdbId = async function findByImdbId(){
    var images = document.querySelectorAll("#images");
    for (var i = 0; i < images.length; i++){
    let moviename = addLeadingZeros(images[i].name, 7);
    let url = ''.concat(baseURL, moviename,'?api_key=', API_KEY, '&external_source=imdb_id');
    await fetch(url)
    .then(result=>result.json())
        .then((data)=>{
        try{
        var posterPath = data["movie_results"][0]["poster_path"];
        var imageURL =  "".concat(baseImageURL2,imageSize2,posterPath);
        images[i].src = imageURL;
        }
        catch(err){
        images[i].src = "https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg?forcejpeg=true";
        images[i].style.width = "185px";
        }
        });
    }
}
document.addEventListener('DOMContentLoaded', findPosterByImdbId);
