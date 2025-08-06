function handleClickOnImage(element) {
    const parentID = String(element.srcElement.parentElement.id).split("-")[2];
    const formElement = document.getElementById("movie-form-" + parentID);
    formElement.submit();
}

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.images');
    for(let i = 0; i < images.length; i++){
        images[i].addEventListener("click", handleClickOnImage);
    }
});