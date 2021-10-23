var u = document.getElementsByClassName("card");
console.log(u);
//testing function
displayCards(4);



function displayCards(n, namesArr, imgsArr) {
  var index;
  var cardsCollection= document.getElementsByClassName("card");
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


// function popupCards() {
//   var n = 4; //testing
//   var i;
//   var popupCardsCollection = document.getElementsByClassName("popup");
//   const descriptions = ["d1", "d2", "d3", "d4"];
//   const imgSrcs = ["./fishdex_files/back.png", "./fishdex_files/back.png", "./fishdex_files/fish.png", "./fishdex_files/fish.png"];
//   if (n > popupCardsCollection.length ) {
//     n = popupCardsCollection.length;
//   }
//   for (i=0; i<n; i++) {
//     var popup = document.getElementsByClassName("popup")[i];
//     popup.classList.toggle("show");
//   }

// }


$(function() {
  var dimmerButton = $('.clickable-text');
  var dimmer = $('.dimmer');
  var exit = $('.exit');
  var popup = document.getElementsByClassName("popup")[0];
  dimmerButton.on('click', function() {
    // var popup = document.getElementsByClassName("popup")[0];
    popup.classList.toggle("show");
    dimmer.show();
  });
  exit.on('click', function() {
    // var popup = document.getElementsByClassName("popup")[0];
    popup.classList.toggle("hide");
    dimmer.hide();
  });
});


// function myFunction() {
//   var popup = document.getElementsByClassName("popup")[0];
//   popup.classList.toggle("show");
// }

const names = ["Skippet Fish", "Skipett Fish", "Skipet Fish", "Skippet Fish"];
const imgSrcs = ["./fishdex_files/fish.png", "./fishdex_files/back.png", "./fishdex_files/fish.png", "./fishdex_files/fish.png"];
document.getElementsByClassName("fish-img").src=imgSrcs[1];


console.log(names);
console.log(imgSrcs);








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





