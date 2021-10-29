///////////////// API //////////////////////
var recordType;
var recordLevel;
$(document).ready(function() {
	var data = {
		resource_id: '32af9a35-d4db-41e9-b152-d52609ff6372', // the resource id
		limit: 5, // get 5 results
		// q: 'jones' // query for 'jones'
	  };
	  $.ajax({
    async: false,
		url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache:true,
		success: function(data) {

			iterateRecords(data)
		}
	  });

});


var nameArray = []; //array to store fish names 
var descriptionArray = [];
var recordType;
var recordLevel;

function iterateRecords(data) {

	console.log(data);

	$.each(data.result.records, function(recordKey, recordValue) {
		console.log(recordValue)

		recordType = recordValue["CommonName"];
		recordLevel = recordValue["Description"];


		console.log(recordType);
    nameArray.push(recordType);
    descriptionArray.push(recordType);


		if(recordType && recordLevel) {
      
			$("#records").append(
				$('<section class="record">').append(
					$('<h2>').text(recordType),
					$('<h3>').text(recordLevel),

				)
			);

		}

	});

}
console.log(nameArray);

//////////////////////// getting images ///////////////////
animalsToSearchList = nameArray;

var fishListUncut = [];
var imageURLs = [];
var names = []


function generateAnimal(fishName) {

    //  AJAX calls to reach the species detail page.
    $.ajax({
        async: false,
        url: "https://bie.ala.org.au/ws/search.json?q=" + fishName,
        success: function(result) {
            fishList = result.searchResults.results;

            for (var i = 0; i < fishList.length; i++) {
                // Filter the results by only selected the species corresponding to the animal kingdom which have a name and an image
                if (fishList[i].kingdom == "ANIMALIA" && fishList[i].name != "" && fishList[i].imageUrl != undefined) {
                    fishListUncut.push(fishList[i]);
                    break;
                }
            }
          
        },
        error: function(err) {
            console.log("Nothing")
        }
    });
}



for (var i = 0; i < animalsToSearchList.length; i++) {   
    generateAnimal(animalsToSearchList[i]);
    names.push(fishListUncut[fishListUncut.length-1].name);
    imageURLs.push(fishListUncut[fishListUncut.length-1].imageUrl);
    //generateCounter = generateCounter + 1;
}

console.log(imageURLs)

/////////////////information ////////////////////

//tesing cards display, remove later 
$( document ).ajaxComplete(function() {


  var u = document.getElementsByClassName("card");
// console.log(u);
  displayCards(4);
});




//display all the fish cards
function displayCards(n) {
  var index;
  var cardsCollection= document.getElementsByClassName("card");
  //tesing delete later
  const names = nameArray;
  // const names = ["Skippet Fish", "Skipett Fish", "Skipet Fish", "Skippet Fish"];
  const imgSrcs = ["./fishdex_files/back.png", "./fishdex_files/back.png", "./fishdex_files/fish.png", "./fishdex_files/fish.png"];
  if (n > cardsCollection.length) {
    n = cardsCollection.length;
  }
  for (index=0; index < n; index++) {
    cardsCollection[index].style.display = "flex";
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
const imgSrcs = ["./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png"];
// const nameArr = ["Skippet Fish", "Skipett Fish", "Skipet Fish", "Skippet Fish", "Skippet Fish"];
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







