/////////////////information ////////////////////

//tesing cards display, remove later 
var u = document.getElementsByClassName("card");
console.log(u);
displayCards(4);




//display all the fish cards
function displayCards(n, namesArr, imgsArr) {
  var index;
  var cardsCollection= document.getElementsByClassName("card");
  //tesing delete later
  const names = ["Skippet Fish", "Skipett Fish", "Skipet Fish", "Skippet Fish"];
  const imgSrcs = ["./fishdex_files/back.png", "./fishdex_files/back.png", "./fishdex_files/fish.png", "./fishdex_files/fish.png"];
  if (n > cardsCollection.length) {
    n = cardsCollection.length;
  }
  for (index=0; index < n; index++) {
    cardsCollection[index].style.display = "block";
    document.getElementsByClassName("fish-image")[index].src=imgSrcs[index];
    document.getElementsByClassName("fish-name")[index].innerHTML=names[index];
  }
}




//pop up cards

var dimmer = document.getElementsByClassName("dimmer");
var popup = document.getElementsByClassName("popup-card");
var imgOnPopup = document.getElementsByClassName("fish-img-detail");
var description = document.getElementsByClassName("description");
var nameOnPopup = document.getElementsByClassName("popup-title");

//testing arrays, delete later 
const imgSrcs = ["./fishdex_files/back.png", "./fishdex_files/back.png", "./fishdex_files/fish.png", "./fishdex_files/fish.png"];
const nameArr = ["A", "B", "C", "D"];
const desArr = ["a dark bluish grey to greenish grey back silvery belly sometimes features dark bars on upper sides caudal fin is broad and slightly concave short front dorsal fin connected to higher soft second dorsal fin",
"a dark bluish grey to greenish grey back silvery belly sometimes features dark bars on upper sides caudal fin is broad and slightly concave short front dorsal fin connected to higher soft second dorsal fin", 
"a dark bluish grey to greenish grey back silvery belly sometimes features dark bars on upper sides caudal fin is broad and slightly concave short front dorsal fin connected to higher soft second dorsal fin", 
"a dark bluish grey to greenish grey back silvery belly sometimes features dark bars on upper sides caudal fin is broad and slightly concave short front dorsal fin connected to higher soft second dorsal fin", 
"a dark bluish grey to greenish grey back silvery belly sometimes features dark bars on upper sides caudal fin is broad and slightly concave short front dorsal fin connected to higher soft second dorsal fin"]

//show cards on click
function showFunction(n) {
  popup[n].style.display = "block";
  dimmer[n].style.display = "block";
  imgOnPopup[n].style.display = "block";
  imgOnPopup[n].src=imgSrcs[n];
  description[n].style.display = "block";
  description[n].innerHTML = desArr[n];
  nameOnPopup[n].style.display = "block";
  nameOnPopup[n].innerHTML = nameArr[n];
}

//hide cards on click
function hideFunction(n) {
  popup[n].style.display = "none";
  dimmer[n].style.display = "none";
  imgOnPopup[n].style.display = "none";
  description[n].style.display = "none";
  nameOnPopup[n].style.display = "none";
}




//////////////////////filter ////////////////////////
// Colour
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}



//size
var slideIndex3 = 1;
showSlides3(slideIndex3);

// Next/previous controls
function plusSlides3(n) {
  showSlides3(slideIndex3 += n);
}

function showSlides3(n) {
  var i3;
  var slides3 = document.getElementsByClassName("mySlides3");
  if (n > slides3.length) {slideIndex3 = 1}
  if (n < 1) {slideIndex3 = slides3.length}
  for (i3 = 0; i3 < slides3.length; i3++) {
    slides3[i3].style.display = "none";
  }
  slides3[slideIndex3-1].style.display = "block";
}



// Habitat
var slideIndex2 = 1;
showSlides2(slideIndex2);

// Next/previous controls
function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

function showSlides2(n) {
  var i2;
  var slides2 = document.getElementsByClassName("mySlides2");
  if (n > slides2.length) {slideIndex2 = 1}
  if (n < 1) {slideIndex2 = slides2.length}
  for (i2 = 0; i2 < slides2.length; i2++) {
    slides2[i2].style.display = "none";
  }
  slides2[slideIndex2-1].style.display = "block";
}







