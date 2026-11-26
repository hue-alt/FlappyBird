const startButton = document.getElementById("start-button");
const gameboard = document.getElementById("gameboard");
const context = gameboard.getContext("2d");
const pathPictures = {
    "background_day": "assets/Flappy Bird/background-day.png",
    "base": "assets/Flappy Bird/base.png",
    "greenpipe": "assets/Flappy Bird/pipe-green.png",
    "downflap": "assets/Flappy Bird/yellowbird-downflap.png", //
    "midflap": "assets/Flappy Bird/yellowbird-midflap.png",
    "upflap": "assets/Flappy Bird/yellowbird-upflap.png" ,
    "gameover": "assets/UI/gameover.png",
    "message": "assets/UI/message.png" ,
};

const pathNumbers = [
    "assets/UI/Numbers/0.png",
    "assets/UI/Numbers/1.png",
    "assets/UI/Numbers/2.png",
    "assets/UI/Numbers/3.png",
    "assets/UI/Numbers/4.png",
    "assets/UI/Numbers/5.png",
    "assets/UI/Numbers/6.png",
    "assets/UI/Numbers/7.png",
    "assets/UI/Numbers/8.png",
    "assets/UI/Numbers/9.png"
];

function drawBackground(){
    context.drawImage(pictures["background_day"], 0, 0, gameboard.width, gameboard.height);
    //context.drawImage(pictures["midflap"], 60, 240, 35, 25);
}

let count = 0;
const totalImages = pathNumbers.length + Object.keys(pathPictures).length;

function handleImageLoaded(path) {
    console.log("Image loaded: " + path);
    count++;
    if (count === totalImages) {
        startGame();
    }
}

function receiveImagenumbers(imagePatharray){ //load images from the path
    const images = [];
    for(let i = 0; i < imagePatharray.length; i++){
        const current_image = new Image();
        current_image.onload = () => handleImageLoaded(imagePatharray[i]);
        current_image.src = imagePatharray[i];
        images.push(current_image);
    }
    return images;
}

function receivePictures(imagePathdict){
    const pictures = {};
    for(const key in imagePathdict){
        const current_image = new Image();
        current_image.onload = () => handleImageLoaded(imagePathdict[key]);
        current_image.src = imagePathdict[key];
        pictures[key] = current_image;
    }
    return pictures;
}

const numberImages = receiveImagenumbers(pathNumbers);
const pictures = receivePictures(pathPictures);

let lasttime = 0;

function startGame() {
    lasttime = 0;
    requestAnimationFrame(gameLoop);
}


const bird = {
    xcoord: 60,
    ycoord: 240,
    width: 34,
    height: 24,
    verticalvelocity: 0, // pixels per second
    angle: 0 // in radians
};

const gravity = 1200; // pixels per second squared
const jumpvelocity = -350; // pixels per second

function gameLoop(timestamp) {
    if (lasttime === 0) {
        lasttime = timestamp;
    }
    const diff = Math.min((timestamp - lasttime) / 1000, 0.05);
    lasttime = timestamp;

    updateBirdsPosition(diff);
    context.clearRect(0, 0, gameboard.width, gameboard.height);
    draw();

    requestAnimationFrame(gameLoop);
}

const framebirdarray = [pictures["upflap"], pictures["midflap"], pictures["downflap"], pictures["midflap"]];
let currentbird = 0;
let animtime = 0;

function updateBirdsPosition(diff) {
    bird.verticalvelocity += gravity * diff;
    bird.ycoord += bird.verticalvelocity * diff;
    if (bird.ycoord < 0) {
        bird.ycoord = 0;
        if (bird.verticalvelocity < 0) {
            bird.verticalvelocity = 0;
        }
    }
    if (bird.ycoord + bird.height >= gameboard.height) {
        bird.ycoord = gameboard.height - bird.height;
        bird.verticalvelocity = 0;
    }
    animtime += diff;
    if(animtime >= 0.1){
        currentbird = (currentbird + 1) % framebirdarray.length;
        animtime = 0;
    }
    if (bird.verticalvelocity < 0) {
        bird.angle = -Math.PI / 6; // -30 degrees
    } else {
        bird.angle = Math.min(Math.PI / 2, bird.angle + 2 * diff);
    }
}

function draw() {
    drawBackground();
    context.save();
    context.translate(bird.xcoord + bird.width / 2, bird.ycoord + bird.height / 2);
    context.rotate(bird.angle);
    context.drawImage(framebirdarray[currentbird], -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    context.restore();
}

function keyHandler(event){
    if((event.code === "Space" || event.code === "ArrowUp")&&event.repeat === false){
        event.preventDefault();
        bird.verticalvelocity = jumpvelocity;
    }

}
window.addEventListener("keydown", keyHandler);

