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
console.log(nameArray.length);


//////////////////////// getting images ///////////////////
// animalsToSearchList = nameArray;
animalsToSearchList = ["Turkeyfish", "Lionfish", "Snapper", "Coris", "Unicornfish", "Batfish", "Surgeonfish", "Anemonefish", "Eel", "Idol", "Parrotfish", "Lungfish", "Tuna", "Bass", "Wrasse", "Lobster", "Smelt", "Triggerfish", "grayling", "Catfish", "Rockcod", "Seaperch", "Rainbowfish"]
var fishListUncut = [];
var imageURLs = [];
var guids = [];
var namess = []

//generate the fish data from API
function generateAnimal(fishName) {
    //  AJAX calls to reach the species detail page.
    $.ajax({
        async: false,
        url: "https://bie.ala.org.au/ws/search.json?q=" + fishName,
        success: function(result) {
            fishList = result.searchResults.results;
            for (var i = 0; i < fishList.length; i++) {
                // Filter the results by only selected the species corresponding to the animal kingdom which have a name and an image
                if (fishList[i].kingdom == "ANIMALIA" && fishList[i].commonNameSingle != "" && fishList[i].imageUrl != undefined && fishList[i].guid != null) {
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

//get image name and guid from the data
function getImageUrls(list){
    var result = [];
    for (var i = 0; i < list.length; i++) {   
        generateAnimal(list[i]);
        namess.push(fishListUncut[fishListUncut.length-1].commonNameSingle);
        imageURLs.push(fishListUncut[fishListUncut.length-1].imageUrl);
        var link = "<a href = https://bie.ala.org.au/species/" + fishListUncut[fishListUncut.length-1].guid + ">Click me to find out more!</a>"
        guids.push(link);
    }
    result.push(namess)
    result.push(imageURLs);
    result.push(guids)
    return result
}


var names = []
var img = []
var l = []
//random pick n unrepeated elements from the lists
function pickElements(list, n, list2, list3){
  var result = []
  var num = n;

  for(var i = 0; i < num; i++){
    var ranNum = Math.floor(Math.random()*(list.length - i));
    if(result.includes(list[ranNum])){
      continue;
    }
    names.push(list[ranNum]);
    img.push(list2[ranNum]);
    l.push(list3[ranNum]);
    list[ranNum] = list[list.length - i - 1];
    list2[ranNum] = list2[list2.length - i - 1];
    list3[ranNum] = list3[list3.length - i - 1];
  }
  result.push(names);
  result.push(img);
  result.push(l);
  console.log(result)
  return result;
}



const fishToSearch = ["Whitetip reef shark", "Zebra shark", "Barcoo grunter", "Banded grunter",  "Penny fish", "Venus tuskfish", "Tripletail Maori wrasse", "Splitlevel hogfish", "Redbreasted Maori wrasse", "Humphead Maori wrasse", "Grass tuskfish", "Diana's hogfish", "Blue tuskfish", "Blackspot tuskfish", "Blackfin pigfish", "Anchor tuskfish", "Yellowfin parrotfish", "Steephead parrotfish", "Pacific longnose parrotfish", "Marbled parrotfish", "Ember parrotfish", "Daisy parrotfish", "Black-spot snapper", "Black-banded snapper", "Bigeye seaperch", "Black and white snapper", "White spotted guitarfish", "Weasel shark", "White shark", "Whitecheek shark", "Wobbegong", "Sliteye shark", "Smooth hammerhead shark", "Speartooth shark", "Spinner shark", "Spot-tail shark", "Tawny shark", "Thresher shark", "Tiger shark"]



/////////////////information ////////////////////

//tesing cards display, remove later 
// $( document ).ajaxComplete(function() {
//   var u = document.getElementsByClassName("card");
//   displayCards(4);
// });




//display all the fish cards
function displayCards(n) {
  var index;
  var cardsCollection= document.getElementsByClassName("card");
  var result = getImageUrls(animalsToSearchList)
  var namesss = result[0];
  var imgs = result[1];
  var urls = result[2];
  //tesing delete later
  var names = [];
  var imgSrcs = [];
  var url = [];
  //var imgSrcs = [];
  if(namesss.length == 5){
    names = namesss;
    imgSrcs = imgs;
    url = urls;
  }else if(namesss.length > 5){
    var result1 = pickElements(namesss, 5, imgs, urls);
    names = result1[0];
    imgSrcs = result1[1];
    url = result1[2];
  }else{
    console.log("error: not enough fish to display")
  }
  console.log(names)
  console.log(imgSrcs)
  console.log(url)
  
  //imgSrcs = getImageUrls(names);
  //getImageUrls(names);

  // const names = ["Skippet Fish", "Skipett Fish", "Skipet Fish", "Skippet Fish"];
  //const imgSrcs = ["./fishdex_files/back.png", "./fishdex_files/back.png", "./fishdex_files/fish.png", "./fishdex_files/fish.png"];
  if (n > cardsCollection.length) {
    n = cardsCollection.length;
  }
  for (index=0; index < n; index++) {
    cardsCollection[index].style.display = "block";
    document.getElementsByClassName("fish-image")[index].src=imgSrcs[index];
    document.getElementsByClassName("fish-name")[index].innerHTML=names[index];
  }
}

displayCards(5);




//pop up cards

var dimmer = document.getElementsByClassName("dimmer");
var popup = document.getElementsByClassName("popup-card");
var imgOnPopup = document.getElementsByClassName("fish-img-detail"); // fish img on popup 
var description = document.getElementsByClassName("description");  // description on popup
var nameOnPopup = document.getElementsByClassName("popup-title"); // fish name on popup

//testing arrays, delete later
const imgSrcs = ["./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png", "./fishdex_files/fish-mid.png"];
const nameArr = ["Skippet Fish", "Skipett Fish", "Skipet Fish", "Skippet Fish", "Skippet Fish"];
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






