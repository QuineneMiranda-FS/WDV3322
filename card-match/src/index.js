// Imports your SCSS stylesheet
import "@/styles/index.scss";

function createDeck() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const faces = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck = [];

  for (const suit of suits) {
    for (const face of faces) {
      const value = `${face} of ${suit}`;
      deck.push({ face, suit, value });
    }
  }
  return deck;
}

let attempts = 0;
let cardSet;
const board = []; // Reset
const rows = 2;
const columns = 3;
let card1stSelected;
let card2ndSelected;
let cardsMatched = 0;
const maxAttempts = 3;

window.onload = function () {
  const fullDeck = createDeck();
  prepareCardSet(fullDeck);
  startGame();
  document.getElementById("attempts").innerText = attempts;
  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);
};

function prepareCardSet(deck) {
  // Shuffle
  const shuffledFullDeck = shuffleArray(deck);

  // Get 3
  const cardsToDuplicate = shuffledFullDeck.slice(0, 3);

  // Duplicate the 3 add them to the set
  cardSet = cardsToDuplicate.concat(cardsToDuplicate);

  // Shuffle to make position random too
  cardSet = shuffleArray(cardSet);

  console.log("Final 6 cardSet for game:", cardSet);
}
function restartGame() {
  // Reset
  attempts = 0;
  cardsMatched = 0;
  card1stSelected = null;
  card2ndSelected = null;
  document.getElementById("attempts").innerText = attempts;
  document.getElementById("game-status").innerText = "";

  // new deck
  const fullDeck = createDeck();
  prepareCardSet(fullDeck);

  // Clear
  document.getElementById("gameBoard").innerHTML = "";

  startGame();
}
/***helper -Fisher Yates bookmarked */
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle
  while (currentIndex != 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function startGame() {
  document.getElementById("gameBoard").innerHTML = "";

  board.length = 0;
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // extract data
      let cardData = cardSet.pop();
      row.push(cardData);

      let card = document.createElement("div");
      card.id = r.toString() + "-" + c.toString();
      card.classList.add("card", "card-back");

      // Store picks
      card.dataset.face = cardData.face;
      card.dataset.suit = cardData.suit;
      card.dataset.value = cardData.value;

      card.addEventListener("click", selectCard);
      document.getElementById("gameBoard").append(card);
    }
    board.push(row);
  }
}

function selectCard() {
  // **prevent further clicks when cards flipping back or game is over
  if ((card1stSelected && card2ndSelected) || attempts >= maxAttempts) {
    return;
  }

  // only unrevealed cards clickable
  if (this.classList.contains("card-back")) {
    if (!card1stSelected) {
      card1stSelected = this;
      revealCard(card1stSelected);
    } else if (!card2ndSelected && this !== card1stSelected) {
      card2ndSelected = this;
      revealCard(card2ndSelected);

      setTimeout(update, 1000);
    }
  }
}

function revealCard(cardElement) {
  cardElement.classList.remove("card-back");
  cardElement.classList.add("card-revealed");
  cardElement.innerText = `${cardElement.dataset.face}\n${cardElement.dataset.suit}`;

  if (
    cardElement.dataset.suit === "Hearts" ||
    cardElement.dataset.suit === "Diamonds"
  ) {
    cardElement.classList.add("card-red");
  }
}

function hideCard(cardElement) {
  cardElement.classList.add("card-back");
  cardElement.classList.remove("card-revealed");
  cardElement.classList.remove("card-red");
  // clear text when hidden
  cardElement.innerText = "";
}

function update() {
  // compare cards
  if (card1stSelected.dataset.value !== card2ndSelected.dataset.value) {
    hideCard(card1stSelected);
    hideCard(card2ndSelected);
    attempts += 1;
    document.getElementById("attempts").innerText = attempts;
  } else {
    // if match keep revealed
    card1stSelected.removeEventListener("click", selectCard);
    card2ndSelected.removeEventListener("click", selectCard);

    cardsMatched += 2;
  }

  // ?win/lose
  if (cardsMatched === rows * columns) {
    endGame("Congratulations! You won");
  } else if (attempts >= maxAttempts) {
    endGame("Sorry, you lost");
  }

  card1stSelected = null;
  card2ndSelected = null;
}

function endGame(message) {
  document.getElementById("game-status").innerText = `${message}!`;
  // card click disabled when lost
  const remainingCards = document.querySelectorAll(".card");
  remainingCards.forEach((card) => {
    card.removeEventListener("click", selectCard);
  });
}
