import { API_KEY } from './env.js';

let baseURL = 'https://api.themoviedb.org/3/find/tt';
let baseImageURL = "https://image.tmdb.org/t/p/";
let imageSize = "w185";


function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
    }

let findPosterByImdbId = async function findByImdbId(){
    var images = document.getElementsByClassName("images");
    for (var i = 0; i < images.length; i++){
    let moviename = addLeadingZeros(images[i].name,7);
    let url = ''.concat(baseURL, moviename,'?api_key=', API_KEY, '&external_source=imdb_id');
    await fetch(url)
    .then(result=>result.json())
        .then((data)=>{
        try{
        var posterPath = data["movie_results"][0]["poster_path"];
        var imageURL =  "".concat(baseImageURL,imageSize,posterPath);
        images[i].src = imageURL;
        }
        catch(err){
        images[i].src = "https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg?forcejpeg=true";
        images[i].style.width = "185px";
        }
        });
    }
}

window.addEventListener("DOMContentLoaded", findPosterByImdbId);