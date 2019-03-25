let DECK = shuffleDeck(createDeck());

function newHand(){
   let playerHand = [];
   let dealerHand = [];
   let dealerCards = document.getElementById('dealer-cards')
   let playerCards = document.getElementById('player-cards')
   for (let i = 0; i < 2; i++) {
      playerHand[i] = DECK.shift()
      dealerHand[i] = DECK.shift()
      let playerli = document.createElement('li');
      playerli.textContent = playerHand[i].display
      playerCards.appendChild(playerli)
      let dealerli = document.createElement('li');
      dealerli.textContent = dealerHand[i].display
      dealerCards.appendChild(dealerli)
   }
   console.log(DECK.length)
   console.log(playerHand)
   console.log(dealerHand)
}
