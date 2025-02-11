let baseURL = 'https://api.themoviedb.org/3/';
let baseImageURL = "https://image.tmdb.org/t/p/";
let imageSize = "w185";
const APIKEY = config.APIKEY;

    function formatMovieName(name){
        let movienameArray = name.split(/(\s+)/);
        for (var i = 1; i < movienameArray.length; i = i + 2){
            movienameArray[i] = "+";
        }
        let moviename = movienameArray.join("");
        return moviename;
    }
    
    let Images = async function loadImages(){
    var images = document.getElementsByClassName("images");
    for (var i = 0; i < images.length; i++){
    let moviename = formatMovieName(images[i].name);
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', moviename);
    await fetch(url)
    .then(result=>result.json())
        .then((data)=>{
        try{
        var posterPath = data["results"][0]["poster_path"];
        var imageURL =  "".concat(baseImageURL,imageSize,posterPath);
        images[i].src = imageURL;
        }
        catch(err){
        images[i].src = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Black_from_a_camera.jpg";
        images[i].style.width = "185px";
        images[i].style.height = "278px";
        }
        });
    }
    }
document.addEventListener('DOMContentLoaded', Images);