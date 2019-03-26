let DECK = shuffleDeck(createDeck());
let PLAYERHAND = [];
let DEALERHAND = [];
let dealerCards = document.getElementById('dealer-cards');
let playerCards = document.getElementById('player-cards');

function newHand() {
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();

		let playerli = document.createElement('li');
		let dealerli = document.createElement('li');

		playerli.textContent = PLAYERHAND[i].display;
		if (true) {
			dealerli.textContent = DEALERHAND[i].display;
		}

		playerCards.appendChild(playerli);
		dealerCards.appendChild(dealerli);
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
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		whoWon();
	}
}

function playerStay() {
	console.log('you stayed');
	dealer();
}
