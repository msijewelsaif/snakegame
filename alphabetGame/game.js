const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const scoreBoard = document.getElementById('score');
const startButton = document.getElementById('startGameButton');
const landingPage = document.getElementById('landingPage');

let score = 0;
let gameOver = false;

// Random letter generation
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function generateLetter() {
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

// Generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create a falling letter with a random starting horizontal position and speed
function createFallingLetter() {
  const letter = document.createElement('div');
  letter.innerText = generateLetter();
  letter.classList.add('falling-letter');
  
  // Random horizontal position and color
  const randomLeftPosition = Math.random() * (gameArea.offsetWidth - 50);
  letter.style.position = 'absolute';
  letter.style.left = `${randomLeftPosition}px`;
  letter.style.color = getRandomColor();  // Apply random color to the letter
  
  gameArea.appendChild(letter);
  fallLetter(letter, randomLeftPosition);  // Pass the random position to the fallLetter function
}

// Make the letter fall with varying speed and horizontal movement
function fallLetter(letter, startPosition) {
  let position = 0;
  const fallSpeed = 3 + Math.random() * 3;  // Randomize fall speed for variety
  const horizontalSpeed = Math.random() * 2 - 1; // Horizontal speed can be negative (move left) or positive (move right)
  
  const letterInterval = setInterval(() => {
    position += fallSpeed;
    let currentLeft = parseFloat(letter.style.left);
    letter.style.top = `${position}px`;
    
    // Apply horizontal movement to make the letter "drift"
    letter.style.left = `${currentLeft + horizontalSpeed}px`;

    // Check if the letter has hit the bottom
    if (position >= gameArea.offsetHeight - 30) {
      if (checkCatch(letter)) {
        score++;
        scoreBoard.innerText = `Score: ${score}`;
        letter.style.transform = 'scale(1.2)';
      }
      clearInterval(letterInterval);
      letter.remove();
    }
  }, 20);
}

// Check if the letter is caught by the basket
function checkCatch(letter) {
  const letterRect = letter.getBoundingClientRect();
  const basketRect = basket.getBoundingClientRect();

  return letterRect.top >= basketRect.top && 
         letterRect.left >= basketRect.left && 
         letterRect.left <= basketRect.right;
}

// Control basket movement
let basketPosition = gameArea.offsetWidth / 2 - 60;
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && basketPosition > 0) {
    basketPosition -= 20;
  } else if (event.key === 'ArrowRight' && basketPosition < gameArea.offsetWidth - 120) {
    basketPosition += 20;
  }
  basket.style.left = `${basketPosition}px`;
});

// Generate falling letters every 2 seconds
setInterval(() => {
  if (!gameOver) {
    createFallingLetter();
  }
}, 2000);

// Game Over
function endGame() {
  gameOver = true;
  alert(`Game Over! Your Score: ${score}`);
}

// Start game function
startButton.addEventListener('click', () => {
  landingPage.style.display = 'none';
  gameArea.style.display = 'block';
});
