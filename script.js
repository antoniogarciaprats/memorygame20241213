const players = ["Player 1", "Player 2"];
let scores = [0, 0];
let activePlayer = 0;
let firstCard = null;
let secondCard = null;
const gameBoard = document.getElementById("gameBoard");
const scoreboard = document.getElementById("scoreboard");
const cards = [];

function createDeck() {
    const icons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const deck = [...icons, ...icons];
    deck.sort(() => 0.5 - Math.random());
    return deck;
}

function renderScoreboard() {
    scoreboard.innerHTML = '';
    players.forEach((player, index) => {
        const playerScore = document.createElement('div');
        playerScore.className = 'player';
        playerScore.textContent = `${player}: ${scores[index]}`;
        if (index === activePlayer) {
            playerScore.classList.add('active');
        }
        scoreboard.appendChild(playerScore);
    });
}

function renderBoard(deck) {
    gameBoard.innerHTML = '';
    deck.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function handleCardClick(event) {
    const card = event.target;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.textContent = card.dataset.icon;
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        scores[activePlayer] += 1;
        firstCard = null;
        secondCard = null;
        renderScoreboard();
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            switchPlayer();
        }, 1000);
    }
}

function switchPlayer() {
    activePlayer = (activePlayer + 1) % players.length;
    renderScoreboard();
}

function restartGame() {
    scores = [0, 0];
    activePlayer = 0;
    firstCard = null;
    secondCard = null;
    const deck = createDeck();
    renderBoard(deck);
    renderScoreboard();
}

document.addEventListener('DOMContentLoaded', () => {
    restartGame();
});