document.getElementById("search-icon").addEventListener("click", (event) => {
    document.querySelector(".search-bar").style = "display: block;";
    document.querySelector("#search-icon").style = "display: none;";
    document.querySelector("#cancel-icon").style = "color: rgb(68, 84, 102); display: block;";
    document.querySelector("#search-input-icon").style = "display: block; color: black;";

});

document.getElementById("cancel-icon").addEventListener("click", (event) => {
    document.querySelector(".search-bar").style = "display: none;";
    document.querySelector("#search-icon").style = "display: block; color: rgb(68, 84, 102);";
    document.querySelector("#cancel-icon").style = "display: none;";
    document.querySelector("#search-input-icon").style = "display: none;";
});

document.getElementById("search-input-icon").addEventListener("click", (event) => {
    var form = document.getElementById("search-form");
    form.submit();
});