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