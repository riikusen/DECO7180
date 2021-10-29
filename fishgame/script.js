/**
 * Game code
 */
//Cnavas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 625;

let score = 0;
let gameFrame = 0;
ctx.font = '30px Georgia';
let gameOver = false;

//Mouse interaction
let canvasPosition = canvas.getBoundingClientRect();
//set the initial position of mouse
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

//Player
const faceLeft = new Image();
faceLeft.src = "images/face_left.png";
const faceRight = new Image();
faceRight.src = "images/face_right.png";

class Player {
    //initial setting
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        //this.iconWidth = 498;
        //this.iconHeight = 327;
        this.iconWidth = 512;
        this.iconHeight = 322;
    }

    //movement of the player
    update(){
        const dx = this.x - mouse.x;
        //console.log(canvas.width, mouse.x)
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if(this.x != mouse.x){
            this.x -= dx/50;
        }
        if(this.y != mouse.y){
            this.y -= dy/50;
        }
    }
    //draw the movment path of the player 
    draw(){
        if(mouse.click){
            ctx.lineWidth = 0.00000001;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        /*
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
        */

        //rotate the submarine to face the direction of mouse click
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        //console.log(this.angle);
        if (this.x >= mouse.x) {
            ctx.drawImage(faceLeft, 
                this.frameX*this.iconWidth, this.frameY*this.iconHeight, 
                this.iconWidth, this.iconHeight, 
                0 - 65, 0 - 45, 
                this.iconWidth/4, this.iconHeight/4);
        } else {
            ctx.drawImage(faceRight, 
                this.frameX*this.iconWidth, this.frameY*this.iconHeight, 
                this.iconWidth, this.iconHeight, 
                0 - 65, 0 - 45, 
                this.iconWidth/4, this.iconHeight/4);
        }
        ctx.restore();
    }
}
const player = new Player();

//Fishes
const fishesArray = [];

const fishImage3 = new Image();
const fishImage5 = new Image();
const fishImage6 = new Image();
const fishImage7 = new Image();
fishImage3.src = "images/fish3_l.png";
fishImage5.src = "images/fish5_l.png";
fishImage6.src = "images/fish6_l.png";
fishImage7.src = "images/fish7_l.png";

const fishImage1 = new Image();
const fishImage2 = new Image();
const fishImage4 = new Image();
const fishImage8 = new Image();
fishImage1.src = "images/fish1_r.png";
fishImage2.src = "images/fish2_r.png";
fishImage4.src = "images/fish4_r.png";
fishImage8.src = "images/crab.png";

class Fish {
    constructor(){
        //this.x = Math.random() * canvas.width;
        //this.y = canvas.height + 100;
        this.x = canvas.width + 100;
        this.y = canvas.height * Math.random() + 90;
        this.radius = 50;
        this.speed = Math.random() * 3.5 + 1.5;
        this.distance; 
        this.counted = false;
        const i = Math.floor((Math.random()*4))
        if(i == 0){
            this.fishImage = fishImage3;
        }else if(i == 1){
            this.fishImage = fishImage5;
        }else if(i == 2){
            this.fishImage = fishImage6;
        }else{
            this.fishImage = fishImage7;
        }
    }
    update(){
        //this.y -= this.speed;
        this.x -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw(){
        
/*         ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke(); */
        ctx.drawImage(this.fishImage, this.x-60, this.y-45, this.radius*2*1.23, this.radius*1.5*1.23);
    }
}

class Fish1 {
    constructor(){
        //this.x = Math.random() * canvas.width;
        //this.y = canvas.height + 100;
        this.x = 0;
        this.y = canvas.height * Math.random() + 90;
        this.radius = 50;
        this.speed = Math.random() * 3.5 + 1.5;
        this.distance; 
        this.counted = false;
        const i = Math.floor((Math.random()*3))
        if(i == 0){
            this.fishImage = fishImage1;
        }else if(i == 1){
            this.fishImage = fishImage2;
        }else{
            this.fishImage = fishImage4;
        }
    }
    update(){
        //this.y -= this.speed;
        this.x += this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw(){
        /*
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        */
        ctx.drawImage(this.fishImage, this.x-60, this.y-45, this.radius*2*1.23, this.radius*1.5*1.23);
    }
}


function hundleFishes(){

    if(gameFrame % 320 == 0){
        const i = Math.round(Math.random());
        if(i == 0){
            fishesArray.push(new Fish());
        }else{
            fishesArray.push(new Fish1());
        }
        
    }
    for(let i = 0; i < fishesArray.length; i++){
        fishesArray[i].update();
        fishesArray[i].draw();
    }
    for(let i = 0; i < fishesArray.length; i++){
        if(fishesArray[i].y < 0 - fishesArray[i].radius * 2){
            fishesArray.splice(i, 1);
        }
        if (fishesArray[i]) {
            if(fishesArray[i].distance < fishesArray[i].radius + player.radius){
                if(fishesArray[i].counted == false){
                    score++;
                    fishesArray[i].counted = true;
                    fishesArray.splice(i, 1);
                } 
            }
        }
    }
    if (score >= 5) {
        handleGameOver2();
    }
}

const mineArray = [];
const mineImage = new Image();
mineImage.src = "images/mine_.png"
class Mine{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = canvas.height + 100;
        this.radius = 25;
        this.speed = Math.random()*2 + 1;
        this.distance;
        this.counted = false;
    }

    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }

    draw(){
/*         ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke(); */
        ctx.drawImage(mineImage, this.x - 27, this.y - 27, this.radius*2.2, this.radius*2.2);
    }
}

function handleMine(){
    if(gameFrame % 150 == 0){
        mineArray.push(new Mine());
        //console.log(mineArray.length);
    }
    for (let i = 0; i < mineArray.length; i++){
        mineArray[i].update();
        mineArray[i].draw();
        if(mineArray[i].y < 0 - mineArray[i].radius*2){
            mineArray.splice(i, 1);
        }
        if(mineArray[i]){
            if(mineArray[i].distance < mineArray[i].radius + player.radius){
                if(!mineArray[i].counted){
                    handleGameOver();
                    mineArray[i].counted = true;
                    mineArray.splice(i, 1);
                }
            }
        }
    }

}




//background
const background = new Image();
//background.src = "images/background.jpg";
background.src = "images/gameBackground.png";

function handleBackground(){
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

//Game over
var modal1 = document.getElementById("gameover1");
function handleGameOver(){
    //ctx.fillStyle = 'yellow';
    //ctx.fillText("You have already discovered many fishes, let's see what you have found!", 30, 300);
    modal1.style.display = "block";
    gameOver = true;
}

var modal2 = document.getElementById("gameover2");
function handleGameOver2(){
    modal2.style.display = "block";
    gameOver = true;
}


function viewFish(){

}



//Animation Loop
function animate(){
    //clear the path
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    //handleBackground();
    hundleFishes();
    handleMine();

    ctx.fillStyle = 'black';
    ctx.font = "40px nice-font";
    ctx.fillText('Fish discovered: ' + score, 10, 35);

    gameFrame++;
    //recursion
    if (!gameOver) {
        requestAnimationFrame(animate);
    }
    
}



//restart the game
var btnRestart = document.getElementById("gameover1-again");
var btnRestart = document.getElementById("gameover2-again");
function restart(){
    location.reload();
}

//relocate the mouse when the window size is changed
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
});

//control the information popup window and start the game
var btn = document.getElementsByClassName("close-button");
var modal = document.getElementById("game-notice");
function closeframe(){
    animate();
    modal.style.display="none";
}


//Global var
/* var fish;
fishToSearch = ["fish", "shark", "turtle", "fish", "crab", "fish", "whale", "lobster", "jellyfish", "fish"];
//shuffle(fishToSearch);
fishListUncut = [];
fishList = [];
var generateCounter = 0;
fishesHaveBeenSliced = 0; */

/**
 * API
 */
//generate random fish from the Atlas of Living Australia API. 
/* function generateFIsh(fishName) {

    //  AJAX calls to reach the species detail page.
    $.ajax({
        url: "https://bie.ala.org.au/ws/search.json?q=" + fishName,
        success: function(result) {
            fish = result.searchResults.results;
            console.log(result)
            // iterate through the query results
            for (var i = 0; fish.length; i++) {

                // Filter the results by only selected the species corresponding to the animal kingdom which have a name and an image
                if (fish[i].kingdom == "ANIMALIA" && fish[i].name != "" && fish[i].imageUrl != undefined) {
                    fishListUncut.push(fish[i]);

                    // Do another shuffle to randomise the reuslts
                    //shuffle(fishList);
                }
            }
    }});
} */




/**
 * Main loop when the document is ready.
 */
/*  $(document).ready(function() {
    
    
    for (var i = 0; i < 10; i++) {   
        generateAnimal(fishToSearch[i]);
        generateCounter = generateCounter + 1;
    }
    

    $(document).ajaxComplete(function(){


        // All AJAX Calls have been completed
        if (fishListUncut.length > 0 && generateCounter == 10 && fishesHaveBeenSliced == 0) {
            fishList = fishListUncut.slice(0,10);
            // console.log(animalList)
        }

        // Save the animal names and image URLs from the saved animal objects
        if (fishList.length == 10 && generateCounter == 10 && animalsHaveBeenSaved == 0) {
            // console.log("List has been cut!");

            for (var i = 0; i < animalList.length; i++) {
                animalNames.push(animalList[i].name);
                imageURLs.push(animalList[i].imageUrl);
            }
            animalsHaveBeenSliced = 1;
            animalsHaveBeenSaved = 1;
            // console.log("Names have been published")
            generateCoordinates();
            plotPoints();
        }

        // Hide the loading screen and load the images onto the carousel.
        if (coordinates.length == 20 && animalNames.length == 10 && imageURLs.length == 10) {
            // console.log("Coordinates have been saved.")
            document.getElementById('loading-section').style.visibility = "hidden";

            for (var i = 0; i < animalNames.length; i++) {
                textID = "A" + (i+1) + "H";
                imageID = "A" + (i+1) + "I";
                document.getElementById(textID).innerHTML = capitalize(animalNames[i]);
            }	
        }
    });   
});     */ 

