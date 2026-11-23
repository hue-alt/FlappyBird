const startButton = document.getElementById("start-button");
const gameboard = document.getElementById("gameboard");
const context = gameboard.getContext("2d");
const pathPictures = {
    "background_day": "assets/Flappy Bird/background-day.png",
    "base": "assets/Flappy Bird/base.png",
    "greenpipe": "assets/Flappy Bird/pipe-green.png",
    "downflap": "assets/Flappy Bird/yellowbird-downflap.png",
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
    context.drawImage(pictures["midflap"], 60, 240, 35, 25);
}

let count = 0;
const totalImages = pathNumbers.length + Object.keys(pathPictures).length;

function handleImageLoaded(path) {
    console.log("Image loaded: " + path);
    count++;
    if (count === totalImages) {
        drawBackground();
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


