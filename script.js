let words = ["แมว", "ช้าง", "ลิง", "เสือ", "สิงโต"];
let selectedWord = '';
let guessedLetters = [];
let remainingGuesses = 6;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = Array(selectedWord.length).fill('_');
    remainingGuesses = 6;
    updateWordDisplay();
    updateRemainingGuesses();
    createLetterButtons();
    document.getElementById('message').textContent = '';
}

function createLetterButtons() {
    const letterButtons = document.getElementById('letterButtons');
    letterButtons.innerHTML = '';
    for (let i = 0; i < 44; i++) {
        const letter = String.fromCharCode(3585 + i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => guessLetter(letter));
        letterButtons.appendChild(button);
    }
}

function guessLetter(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedLetters[i] = letter;
            }
        }
    } else {
        remainingGuesses--;
    }
    updateWordDisplay();
    updateRemainingGuesses();
    checkGameStatus();
}

function updateWordDisplay() {
    document.getElementById('wordDisplay').textContent = guessedLetters.join(' ');
}

function updateRemainingGuesses() {
    document.getElementById('remainingGuesses').textContent = remainingGuesses;
}

function checkGameStatus() {
    if (!guessedLetters.includes('_')) {
        document.getElementById('message').textContent = 'คุณชนะแล้ว!';
        disableLetterButtons();
    } else if (remainingGuesses === 0) {
        document.getElementById('message').textContent = `คุณแพ้ คำศัพท์คือ: ${selectedWord}`;
        disableLetterButtons();
    }
}

function disableLetterButtons() {
    const buttons = document.querySelectorAll('#letterButtons button');
    buttons.forEach(button => button.disabled = true);
}

function resetGame() {
    startGame();
}

startGame();