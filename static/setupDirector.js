import { API_KEY } from './env.js';

let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageurl = "https://image.tmdb.org/t/p/";
let imagesize = "w342";
let posterpath = null;
let baseImageURL = "https://image.tmdb.org/t/p/";
let imageSize = "w185";
let baseURLtt = "https://api.themoviedb.org/3/find/tt";

let getActorImage = async function() {
let directorname = document.getElementById("directorname").innerHTML.replace(" ","%20");
let idURL = "".concat(baseURL,"search/person?api_key=",API_KEY,"&language=en-US&query=", directorname, "&&page=1&include_adult=false");
var actorid;
var profilePath;
var bioText;
let response1 = await Promise.all([fetch(idURL).then(response => response.json()).then(async data => {actorid = await data["results"][0]["id"]; bioText = await data["results"][0]["biography"]})]);
let profileURL = "".concat("https://api.themoviedb.org/3/person/",actorid,"/images?api_key=",API_KEY);
let response2 = await Promise.all([fetch(profileURL).then(response => response.json()).then(async data => {profilePath = await data["profiles"][0]["file_path"]})]);
let bioURL = "".concat("https://api.themoviedb.org/3/person/",actorid,"?api_key=",API_KEY,"&language=en-US");
let response3 = await Promise.all([fetch(bioURL).then(response => response.json()).then(async data => {bioText = await data["biography"]})])
setImage("https://image.tmdb.org/t/p/w200/" + profilePath, bioText);
findPosterByImdbId();
}

function setImage(src, biographyText){
    var profileImage = document.getElementById("actorProfile");
    profileImage.src = src;
    document.getElementById("bioText").innerHTML = biographyText;
}

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
    }

let findPosterByImdbId = async function findByImdbId(){
    var images = document.getElementsByClassName("images");
    var urlimages = [];
    var posterPaths = [];
    for (var i = 0; i < images.length; i++){
        let moviename = addLeadingZeros(images[i].name,7);
        images[i].value = i;
        let url = ''.concat(baseURLtt, moviename,'?api_key=', API_KEY, '&external_source=imdb_id');
        urlimages.push({"url":url,
    "id":moviename});
    }
    let list = [];
    list = await Promise.all(urlimages.map(async (element, index) => {
        return fetch(element["url"]).then(response => response.json()).then(async data => {
        try{
            posterPaths.push({"link":"".concat(baseImageURL,imageSize,data["movie_results"][0]["poster_path"]),
                                "id": element["id"]});
            //element = "".concat(baseImageURL,imageSize,data["movie_results"][0]["poster_path"]);
        }
        catch(err){
            posterPaths.push({"link": "", "id":element["id"]});
            //element = "";
        }
        })
    }));
    images = document.getElementsByClassName("images");
    /*for (var i = 0; i < posterPaths.length; i++){
        if(posterPaths[i].link == ""){
        images[i].src = "https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg?forcejpeg=true";
        images[i].style.width = "185px";
        }
        else{
        images[i].src = posterPaths[i].link;
        }
    }*/
    for (var i = 0; i < images.length; i++){
        for (var j = 0; j < posterPaths.length;j++){
            if(posterPaths[j].id == parseInt(images[i].name,10)){
                images[i].src = posterPaths[j].link;
            }
            else{

            }
        }
    }

    /*var images = document.getElementsByClassName("images");
    for (var i = 0; i < images.length; i++){
    let moviename = addLeadingZeros(images[i].name,7);
    let url = ''.concat(baseURLtt, moviename,'?api_key=', API_KEY, '&external_source=imdb_id');
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
    }*/
}

window.addEventListener("DOMContentLoaded", getActorImage);