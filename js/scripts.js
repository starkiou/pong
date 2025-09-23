const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = canvas.width /2;
const y = canvas.height -100;
const speed = 2;
let rafId;      

function drawBall() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawRectangle(){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(x-50, y+50, 100, 20,);
    ctx.fill();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRectangle();
}

loop();