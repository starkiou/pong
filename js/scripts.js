const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Dimensions en pixels, vitesses en pixels par seconde
const BALL_RADIUS = 15;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_SPEED = 150;
const INITIAL_SPEED = 60;
const SPEED_STEP = 12;
const MAX_SPEED = INITIAL_SPEED * 5;
// Borne le delta time pour éviter un saut de la balle au retour sur l'onglet
const MAX_DT = 0.05;

let x_ball = canvas.width /2;
let y_ball = canvas.height -80;
let x_rect = canvas.width /2 - PADDLE_WIDTH /2;
let y_rect = canvas.height -60;
let speed = INITIAL_SPEED;
let speedx = 0;
let speedy = 0;
let gameStarted = false;
let score = 0;
let elapsed = 0;
let lastTime = 0;

// État des touches et boutons
let keysPressed = {
    ArrowLeft: false,
    ArrowRight: false
};
let buttonsPressed = {
    left: false,
    right: false
};

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
    ctx.arc(x_ball, y_ball, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
}

function drawRectangle(){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(x_rect, y_rect, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRectangle();
}

function accelerate() {
    if (speed >= MAX_SPEED) return;
    const factor = (speed + SPEED_STEP) / speed;
    speed += SPEED_STEP;
    speedx *= factor;
    speedy *= factor;
}

function bounceX() {
    speedx = -speedx;
    accelerate();
}

function bounceY() {
    speedy = -speedy;
    accelerate();
}

function update(dt) {
    // Gérer le mouvement de la raquette basé sur les touches/boutons appuyés
    if (keysPressed.ArrowLeft || buttonsPressed.left) {
        x_rect = Math.max(0, x_rect - PADDLE_SPEED * dt);
    }
    if (keysPressed.ArrowRight || buttonsPressed.right) {
        x_rect = Math.min(canvas.width - PADDLE_WIDTH, x_rect + PADDLE_SPEED * dt);
    }

    y_ball -= speedy * dt;
    x_ball -= speedx * dt;

    // Chaque rebond teste le sens de la balle pour ne pas rebondir deux fois de suite
    const goingRight = speedx < 0;
    const goingDown = speedy < 0;

    if ((x_ball > canvas.width - BALL_RADIUS && goingRight) || (x_ball < BALL_RADIUS && !goingRight)) {
        bounceX();
    }
    if (y_ball < BALL_RADIUS && !goingDown) {
        bounceY();
    }
    if (goingDown && y_ball + BALL_RADIUS >= y_rect && y_ball + BALL_RADIUS <= y_rect + PADDLE_HEIGHT && x_ball >= x_rect && x_ball <= x_rect + PADDLE_WIDTH) {
        bounceY();
    }
    if (y_ball > canvas.height - BALL_RADIUS) {
        reset();
        return;
    }

    elapsed += dt;
    if (Math.floor(elapsed) !== score) {
        score = Math.floor(elapsed);
        document.getElementById("score").textContent = score;
    }
}

function reset(){
    let bestScore = parseInt(localStorage.getItem("best-score") || "0");
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("best-score", bestScore);
    }
    document.getElementById("best-score").textContent = bestScore;

    x_ball = canvas.width / 2;
    y_ball = canvas.height - 80;
    x_rect = canvas.width / 2 - PADDLE_WIDTH / 2;
    y_rect = canvas.height - 60;
    speedx = 0;
    speedy = 0;
    score = 0;
    elapsed = 0;
    gameStarted = false;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "Perdu ! Cliquez sur 'commencer la partie' pour rejouer.";
}

function loop(time) {
    const dt = Math.min(Math.max(time - lastTime, 0) / 1000, MAX_DT);
    lastTime = time;
    update(dt);
    draw();
    // Après un game over, plus aucune frame n'est programmée
    if (gameStarted) {
        requestAnimationFrame(loop);
    }
}

//------------ INITIALISATION-----------------------------
draw();
document.getElementById("score").textContent = score;
document.getElementById("best-score").textContent = localStorage.getItem("best-score") || 0;

document.getElementById("go").addEventListener("click", function(){
    if (gameStarted) return;
    speed = INITIAL_SPEED;
    const angle = getRandomAngle();
    speedx = Math.cos(angle) * speed;
    speedy = Math.sin(angle) * speed;
    score = 0;
    elapsed = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "";
    gameStarted = true;
    lastTime = performance.now();
    requestAnimationFrame(loop);
});


//------------ gestion raquette touches clavier------------------------------
document.addEventListener("keydown", (event) => {
    if (!gameStarted) return;
    if (event.key === "ArrowLeft") {
        keysPressed.ArrowLeft = true;
    }
    if (event.key === "ArrowRight") {
        keysPressed.ArrowRight = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        keysPressed.ArrowLeft = false;
    }
    if (event.key === "ArrowRight") {
        keysPressed.ArrowRight = false;
    }
});

//------------ gestion raquette tactiles et souris-----------------------------
function bindButton(id, side) {
    const button = document.getElementById(id);
    // mouseleave et touchcancel évitent un bouton qui reste enfoncé
    ["mousedown", "touchstart"].forEach((type) => {
        button.addEventListener(type, () => {
            buttonsPressed[side] = true;
        });
    });
    ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach((type) => {
        button.addEventListener(type, () => {
            buttonsPressed[side] = false;
        });
    });
}

bindButton("left-btn", "left");
bindButton("right-btn", "right");
