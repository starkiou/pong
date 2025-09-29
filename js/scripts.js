const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x_ball = canvas.width /2;
let y_ball = canvas.height -80;
let x_rect = canvas.width /2 -50;
let y_rect = canvas.height -60;
const initialSpeed = 1;
let speed = initialSpeed;
let angle = getRandomAngle();
let speedx = Math.cos(angle) * speed;
let speedy = Math.sin(angle) * speed;
let rafId;
let gameStarted = false;
let score = 0;
let scoreIntervalId = null;

//------------FONCTION------------------

function getRandomAngle() {
    let deg;
    do {
        deg = Math.random() * 120 + 30;
    } while (Math.abs(deg - 90) < 15);
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
    let augment = 1.1;

    if (x_ball > canvas.width -15 || x_ball < 15) {
        speedx = -speedx;
        if (speed < initialSpeed * 5) {
            speed += 0.2;
            let augment = speed / (speed - 0.2);
            speedx *= augment;
            speedy *= augment;
        }
    }
    if (y_ball < 15) {
        speedy = -speedy;
        if (speed < initialSpeed * 5) {
            speed += 0.2;
            let augment = speed / (speed - 0.2);
            speedx *= augment;
            speedy *= augment;
        }
    }
    if (y_ball + 15 >= y_rect && y_ball + 15 <= y_rect + 20 && x_ball >= x_rect && x_ball <= x_rect + 100) {
        speedy = -speedy;
        if (speed < initialSpeed * 5) {
            speed += 0.2;
            let augment = speed / (speed - 0.2);
            speedx *= augment;
            speedy *= augment;
        }
    }
    if(y_ball > canvas.height -15){
        reset();
    }
}

function reset(){
    cancelAnimationFrame(rafId);
    if (scoreIntervalId) {
        clearInterval(scoreIntervalId);
        scoreIntervalId = null;
    }
    let bestScore = parseInt(localStorage.getItem("best-score") || "0");
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("best-score", bestScore);
    }
    document.getElementById("best-score").textContent = bestScore;

    x_ball = canvas.width / 2;
    y_ball = canvas.height - 80;
    x_rect = canvas.width / 2 - 50;
    y_rect = canvas.height - 60;
    speed = 0;
    speedx = 0;
    speedy = 0;
    score = 0;
    gameStarted = false;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "Perdu ! Cliquez sur 'commencer la partie' pour rejouer.";
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRectangle();
    update();
    rafId = requestAnimationFrame(loop);
}

//------------ INITIALISATION-----------------------------
drawBall();
drawRectangle();
document.getElementById("score").textContent = score;
document.getElementById("best-score").textContent = localStorage.getItem("best-score") || 0;

document.getElementById("go").addEventListener("click", function(){
    if (gameStarted) return;
    speed = initialSpeed;
    angle = getRandomAngle();
    speedx = Math.cos(angle) * speed;
    speedy = Math.sin(angle) * speed;
    cancelAnimationFrame(rafId);
    if (scoreIntervalId) {
        clearInterval(scoreIntervalId);
    }
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "";
    scoreIntervalId = setInterval(() => {
        score++;
        document.getElementById("score").textContent = score;
    }, 1000);
    gameStarted = true;
    loop();
});

document.addEventListener("keydown", (event) => {
    if (!gameStarted) return;
    const rectSpeed = 20;
    if (event.key === "ArrowLeft" && x_rect > 9) {
        x_rect -= rectSpeed;
    }
    if (event.key === "ArrowRight" && x_rect < canvas.width-100) {
        x_rect += rectSpeed;
    }
});