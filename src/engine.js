let DECK = shuffleDeck(createDeck());
let PLAYERHAND = [];
let DEALERHAND = [];
let WINNER = '';
let dealerCards = document.getElementById('dealer-cards');
let playerCards = document.getElementById('player-cards');

function newHand() {
   for (let i = 0; i < 2; i++) {
      PLAYERHAND[i] = DECK.shift();
      DEALERHAND[i] = DECK.shift();
      renderCard(PLAYERHAND[i], playerCards)
      renderCard(DEALERHAND[i], dealerCards)
   }
   console.log(DECK.length);
   console.log(DEALERHAND);
   console.log(PLAYERHAND);
}

function playerHit() {
   addCard(PLAYERHAND);
   let playerli = document.createElement('li');
   playerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
   playerCards.appendChild(playerli);
   if (checkForBust(PLAYERHAND)) {
      console.log('busted');
      WINNER = 'dealer won';
      console.log(WINNER + ' won');
   }
}

function playerStay() {
   console.log('You Stayed');
   dealer();
}
