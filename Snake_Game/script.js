const gameBoard = document.querySelector(".play-board"); // Select the game board element
const currentScoreElement = document.querySelector(".score"); // Select the current score element
const bestScoreElement = document.querySelector(".high-score"); // Select the high score element
const controlButtons = document.querySelectorAll(".controls i"); // Select all control buttons
let isGameOver = false; // Game over flag
let foodPositionX, foodPositionY; // Food position coordinates
let snakePositionX = 5, snakePositionY = 5; // Initial snake position
let directionX = 0, directionY = 0; // Initial direction (velocity) of the snake
let snakeSegments = []; // Array to store snake segments
let gameIntervalId; // Interval ID for the game loop
let currentScore = 0; // Current score

// Retrieve high score from local storage
let bestScore = localStorage.getItem("high-score") || 0;
bestScoreElement.innerText = `High Score: ${bestScore}`; // Display high score

// Function to generate a random position for the food
const generateFoodPosition = () => {
    foodPositionX = Math.floor(Math.random() * 30) + 1;
    foodPositionY = Math.floor(Math.random() * 30) + 1;
}

// Function to handle game over scenario
const endGame = () => {
    clearInterval(gameIntervalId); // Clear the game interval
    alert("Game Over! Press OK to replay..."); // Show game over alert
    location.reload(); // Reload the page to restart the game
}

// Function to update the direction based on key press
const updateDirection = e => {
    if(e.key === "ArrowUp" && directionY != 1) {
        directionX = 0;
        directionY = -1;
    } else if(e.key === "ArrowDown" && directionY != -1) {
        directionX = 0;
        directionY = 1;
    } else if(e.key === "ArrowLeft" && directionX != 1) {
        directionX = -1;
        directionY = 0;
    } else if(e.key === "ArrowRight" && directionX != -1) {
        directionX = 1;
        directionY = 0;
    }
}

// Add event listeners to control buttons for direction change
controlButtons.forEach(button => button.addEventListener("click", () => updateDirection({ key: button.dataset.key })));

// Function to start and run the game
const startGame = () => {
    if(isGameOver) return endGame(); // Check if game is over

    // Generate HTML for food
    let htmlContent = `<div class="food" style="grid-area: ${foodPositionY} / ${foodPositionX}"></div>`;
    
    // Check if snake eats the food
    if(snakePositionX === foodPositionX && snakePositionY === foodPositionY) {
        generateFoodPosition(); // Generate new food position
        snakeSegments.push([foodPositionY, foodPositionX]); // Add new segment to snake
        currentScore++; // Increase score
        bestScore = currentScore >= bestScore ? currentScore : bestScore; // Update high score if needed
        localStorage.setItem("high-score", bestScore); // Save high score to local storage
        currentScoreElement.innerText = `Score: ${currentScore}`; // Update score display
        bestScoreElement.innerText = `High Score: ${bestScore}`; // Update high score display
    }

    // Update snake's head position
    snakePositionX += directionX;
    snakePositionY += directionY;
   
    // Shift snake segments forward
    for (let i = snakeSegments.length - 1; i > 0; i--) {
        snakeSegments[i] = snakeSegments[i - 1];
    }
    snakeSegments[0] = [snakePositionX, snakePositionY]; // Set first segment to current position

    // Check if snake hits the wall
    if(snakePositionX <= 0 || snakePositionX > 30 || snakePositionY <= 0 || snakePositionY > 30) {
        return isGameOver = true;
    }

    // Check if snake hits itself
    for (let i = 0; i < snakeSegments.length; i++) {
        htmlContent += `<div class="head" style="grid-area: ${snakeSegments[i][1]} / ${snakeSegments[i][0]}"></div>`;
        if (i !== 0 && snakeSegments[0][1] === snakeSegments[i][1] && snakeSegments[0][0] === snakeSegments[i][0]) {
            isGameOver = true;
        }
    }
    gameBoard.innerHTML = htmlContent; // Update game board with new HTML
}

// Initialize food position and start the game loop
generateFoodPosition();
gameIntervalId = setInterval(startGame, 100); // Set game loop interval
document.addEventListener("keyup", updateDirection); // Add event listener for keyup to change direction
