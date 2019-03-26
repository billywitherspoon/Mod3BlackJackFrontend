let DECK = shuffleDeck(createDeck());
let PLAYERHAND = [];
let DEALERHAND = [];
let dealerCards = document.getElementById('dealer-cards');
let playerCards = document.getElementById('player-cards');

function newHand() {
   for (let i = 0; i < 2; i++) {
      PLAYERHAND[i] = DECK.shift();
      DEALERHAND[i] = DECK.shift();
      renderCard(PLAYERHAND[i], playerCards);
      if (i == 0) {
         renderCard(DEALERHAND[i], dealerCards, 'hidden', 'hidden-card');
      } else {
         renderCard(DEALERHAND[i], dealerCards)
      }
   }
   console.log(DECK.length);
   console.log(DEALERHAND);
   console.log(PLAYERHAND);
}

function playerHit() {
   addCard(PLAYERHAND);
   renderCard(PLAYERHAND[PLAYERHAND.length - 1], playerCards)
   if (isBusted(PLAYERHAND)) {
      console.log('you busted');
      whoWon();
   }
}

function playerStay() {
   console.log('you stayed');
   dealer();
	let showHiddenCard = document.getElementById('hidden-card')
	showHiddenCard.className = 'card'
}
