const button = document.querySelector(".boutton");

button.addEventListener("click", () => {
    document.location.href = "index1.html";
});

button.addEventListener("touchstart", () => {
    button.classList.add("hover-effect");
});

button.addEventListener("touchend", () => {
    button.classList.remove("hover-effect");
});

// const canvas = document.getElementById("Mycanva");
// const ctx = canvas.getContext("2d");
// const ballRadius = 15;
// let x = canvas.width / 2;
// let y = canvas.height - 30;
// //: nous voulons ajouter une valeur à x et y après que chaque image ait été dessinée afin de faire croire que la balle bouge. On définit ces valeurs comme dx et dy avec comme valeurs respectives 2 et -2
// let dx = 2;
// let dy = -2;
// // pagaie || raquette
// const paddleHeight = 10;
// const paddleWidth = 75;
// let paddleX = (canvas.width - paddleWidth) / 2;

// //contolleur de raquette

// let rightPressed = false;
// let leftPressed = false;

// //creation des briques

// const brickRowCount = 5;
// const brickColumnCount = 5;
// const brickWidth = 75;
// const brickHeight = 20;
// const brickpadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// const restartButton = document.querySelector(".restart-button");
// const gameOverNotify = document.querySelector(".game-over-notify");
// const gameVictoiryNotify = document.querySelector(".game-victory-notify");
// let interval;
// let score = 0;
// let lives = 3;
// const bricks = [];
// for (let c = 0; c < brickColumnCount; c++) {
//     bricks[c] = [];
//     for (let r = 0; r < brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 }; //status pour mettre un statut au depart au bricks
//     }
// }
// const brickColors = [
//     "#FF5733", // Couleur 1
//     "#33FF57", // Couleur 2
//     "#3357FF", // Couleur 3
//     "#F3FF33", // Couleur 4
//     "#FF33F6", // Couleur 5
// ];

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);
// document.addEventListener("touchmove", touchMoveHandler, false);

// function keyDownHandler(e) {
//     if (e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     } else if (e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if (e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     } else if (e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if (relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth / 2;
//     }
// }

// function touchMoveHandler(e) {
//     var relativeX = e.touches[0].clientX - canvas.offsetLeft; // Position du touché
//     if (relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth / 2; // Déplacer la raquette
//     }
// }

// function collisionDetection() {
//     for (let c = 0; c < brickColumnCount; c++) {
//         for (let r = 0; r < brickRowCount; r++) {
//             let b = bricks[c][r];
//             if (b.status == 1) {
//                 if (
//                     x > b.x &&
//                     x < b.x + brickWidth &&
//                     y > b.y &&
//                     y < b.y + brickHeight
//                 ) {
//                     dy = -dy;
//                     b.status = 0;
//                     score++;
//                     if (score == brickRowCount * brickColumnCount) {
//                         gameVictoiryNotify.style.display = "flex";
//                         restartButton.style.display = "block";
//                         clearInterval(interval);
//                         return;
//                     }
//                 }
//             }
//         }
//     }
// }

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//     ctx.fillStyle = "yellow";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "orange";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawBricks() {
//     for (let c = 0; c < brickColumnCount; c++) {
//         for (let r = 0; r < brickRowCount; r++) {
//             if (bricks[c][r].status == 1) {
//                 const brickX = c * (brickWidth + brickpadding) + brickOffsetLeft;
//                 const brickY = r * (brickHeight + brickpadding) + brickOffsetTop;

//                 bricks[c][r].x = brickX;
//                 bricks[c][r].y = brickY;
//                 ctx.beginPath();
//                 ctx.rect(brickX, brickY, brickWidth, brickHeight);
//                 ctx.fillStyle = brickColors[(c + r) % brickColors.length];
//                 ctx.fill();
//                 ctx.closePath();
//             }
//         }
//     }
// }

// function drawScore() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Score: " + score, 8, 20);
// }

// function drawLives() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#DD0000FF";
//     ctx.fillText("Vies: " + lives, canvas.width - 65, 20);
// }
// // Fonction de redémarrage du jeu
// function restartGame() {
//     score = 0;
//     lives = 3;
//     x = canvas.width / 2;
//     y = canvas.height - 30;
//     dx = 2;
//     dy = -2;
//     paddleX = (canvas.width - paddleWidth) / 2;

//     for (let c = 0; c < brickColumnCount; c++) {
//         for (let r = 0; r < brickRowCount; r++) {
//             bricks[c][r].status = 1; // Réinitialiser les briques
//         }
//     }

//     gameOverNotify.style.display = "none";
//     gameVictoiryNotify.style.display = "none";
//     restartButton.style.display = "none";

//     interval = setInterval(draw, 10); // Relancer le jeu
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBricks();
//     drawBall();
//     drawPaddle();
//     drawScore();
//     drawLives();
//     collisionDetection();

//     if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     if (y + dy < ballRadius) {
//         dy = -dy;
//     } else if (y + dy > canvas.height - ballRadius) {
//         if (x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         } else {
//             lives--;
//             if (!lives) {
//                 gameOverNotify.style.display = "flex";
//                 restartButton.style.display = "block";
//                 clearInterval(interval);
//                 return;
//             } else {
//                 x = canvas.width / 2;
//                 y = canvas.height - 30;
//                 dx = 3;
//                 dy = -3;
//                 paddleX = (canvas.width - paddleWidth) / 2;
//             }
//         }
//     }

//     if (rightPressed && paddleX < canvas.width - paddleWidth) {
//         paddleX += 7;
//     } else if (leftPressed && paddleX > 0) {
//         paddleX -= 7;
//     }

//     x += dx;
//     y += dy;
// }

// interval = setInterval(draw, 10);