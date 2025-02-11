import { API_KEY } from './env.js';

let baseImageURL2 = "https://image.tmdb.org/t/p/";
let imageSize2 = "w154";
let imageURL = null;
let trendingMovies = [];
let url = null;

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
        var formElement = document.createElement("form");
        inputElement.type = "image";
        hiddenInput.name = "moviename";
        hiddenInput.type = "hidden";
        hiddenInput.value = trendingMovies[i]["title"];
        formElement.setAttribute("action","/movie");
        formElement.method = "post";
        imageURL = "".concat(baseImageURL2,imageSize2,trendingMovies[i]["poster_path"]);
        inputElement.src = imageURL;
        formElement.append(inputElement);
        formElement.append(hiddenInput);
        divElement.append(formElement);
    }
}
document.addEventListener('DOMContentLoaded', fetchSth);
