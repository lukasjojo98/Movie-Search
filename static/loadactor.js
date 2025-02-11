import { API_KEY } from './env.js';

let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = "https://image.tmdb.org/t/p/";
let imageSize = "w342";
let posterPath = null;

function addLeadingZeros(num, totalLength) {
return String(num).padStart(totalLength, '0');
}
let gettmdbID = async function () {
    let tmdbID = null;
    let imageurl = null;
    let urlImage = null;
    let number = document.getElementById("actorid").innerHTML;
    number = addLeadingZeros(number,7);
    number = "".concat("nm",number);
    let url = "".concat("https://api.themoviedb.org/3/find/",number ,"?api_key=", API_KEY,"&language=en-US&external_source=imdb_id");
    await fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=> {
          tmdbID = data["person_results"][0]["id"]
    })
   let urlimages = "".concat("https://api.themoviedb.org/3/person/",tmdbID,"/images?api_key=",API_KEY);
   await fetch(urlimages)
   .then((result)=>{
        return result.json();
    })
    .then((data)=>{
         imageurl = data["profiles"][0]["file_path"]
    })
    let tmp = "".concat("https://image.tmdb.org/t/p/h632/",imageurl)
    document.getElementById("image").src = tmp
}
document.addEventListener('DOMContentLoaded', gettmdbID);