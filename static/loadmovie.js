import { API_KEY } from './env.js';

let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = "https://image.tmdb.org/t/p/";
let imageSize = "w185";
let posterPath = null;
let id = 22;

let getConfig =  function() {
    let url = "".concat(baseURL, 'configuration?api_key=', API_KEY);
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        runSearch(document.getElementById("movie").innerHTML);
    })
    .catch(function(err){
        alert(err);
    });
}

let runSearch =  function (keyword) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', API_KEY, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
    posterPath = data["results"][0]["poster_path"];
    id = data["results"][0]["id"];
    var averageScore = data["results"][0]["vote_average"] / 2;
    let imageurl = "".concat(baseImageURL,imageSize,posterPath);
    document.getElementById("image").src = imageurl;
    document.getElementById("overviewText").innerHTML = data["results"][0]["overview"];
    findActors(id);
    })
}

let findActors = function(movieID){
    let actorUrl = ''.concat(baseURL, 'movie/', movieID, '/credits?api_key=', API_KEY, '&language=en-US');
    fetch(actorUrl)
    .then(result=>result.json())
    .then((data) => {
    var actorList = data["cast"];
    let actorRowDivList = document.getElementById("actorData").children;
    let index = 0;
    for(var i = 0; i < 12; i++ ){
        if(i%4 == 0){
            index++;
        }
        var formElement = document.createElement("form");
        formElement.method = "post";
        var inputElement = document.createElement("input");
        inputElement.type = "submit";
        inputElement.value = actorList[i].name;
        inputElement.name = "actorname";
        formElement.action = "/actor/" + String(actorList[i].name).toLowerCase().replace(" ", "-");
        formElement.appendChild(inputElement);
        document.getElementById("actorData").appendChild(formElement);
    }
    });
}

var selectedLists = []
function addMovieToList(element){   // leerer String bedeutet unselectedColor
    var currentIndex = 0;
    var unselectedColor = "rgb(68, 84, 102)";
    var selectedColor = "rgb(50, 67, 85)";
    if(element.style.backgroundColor == "" || element.style.backgroundColor == unselectedColor){
    element.style.backgroundColor = selectedColor;
    //element.removeAttribute("disabled");
    document.querySelectorAll("#listsClicked").forEach(function(value){
        if(value.value == element.querySelector("td").querySelectorAll("p")[1].innerHTML){
            value.removeAttribute("disabled");
        }
    });
    selectedLists.push(element.querySelector("td").querySelector("p").innerHTML);
    currentIndex++;
    }
    else if (element.style.backgroundColor == selectedColor){
    element.style.backgroundColor = unselectedColor;
    document.querySelectorAll("#listsClicked").forEach(function(value){
        if(value.value == element.querySelector("td").querySelectorAll("p")[1].innerHTML){
            value.setAttribute("disabled", "");
        }
    });
    selectedLists.splice(currentIndex, 1);
    }
    document.getElementById("selectedLists").innerHTML = (selectedLists.length >= 2) ? selectedLists.length + " lists selected":selectedLists.length + " list selected";
}
document.addEventListener('DOMContentLoaded', getConfig);
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
window.onclick = function(event) {
    if(event.target == document.getElementById("reviewButton")){
    document.getElementById("reviewImage").src = document.getElementById("image").src;
    modal.style.display = "block";
    }
    else if(event.target == document.getElementById("listButton")){
    modal2.style.display = "block";
    }
    else if (event.target == modal){
    modal.style.display = "none";
    }
    else if( event.target == modal2){
    modal2.style.display = "none";
    }
}

document.getElementById("rating-form").addEventListener("click", (event) => {
    var form = document.getElementById("rating-form");
    form.submit();

});