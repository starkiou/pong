const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x_ball = canvas.width /2;
let y_ball = canvas.height -80;
let x_rect = canvas.width /2 -50;
let y_rect = canvas.height -60;
let speed = 2;
let angle = getRandomAngle();
let speedx = Math.cos(angle) * speed;
let speedy = Math.sin(angle) * speed;
let rafId;      

function getRandomAngle() {
    const deg = Math.random() * 120 + 30;
    return deg * (Math.PI / 180);
}

function drawBall() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x_ball, y_ball, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawRectangle(){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(x_rect, y_rect, 100, 20,);
    ctx.fill();
}

function update() {
    y_ball -= speedy;
    x_ball -= speedx;
    if (x_ball > canvas.width -15 || x_ball < 15) {
        speedx = -speedx;
    }
    if (y_ball < 15) {
        speedy = -speedy;
    }
    if(y_ball > canvas.height -15){
        reset();
    }
}

function reset(){
    x_ball = canvas.width /2;
    y_ball = canvas.height -80;
    x_rect = canvas.width /2 -50;
    y_rect = canvas.height -60;
    speed = 0;
    speedx = 0;
    speedy = 0;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRectangle();
    update();
    rafId = requestAnimationFrame(loop);
}


drawBall();
drawRectangle();
document.getElementById("go").addEventListener("click", function(){
    loop();
});