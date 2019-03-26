function newHand() {
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		renderCard(PLAYERHAND[i], PLAYERCARDSDIV);
		renderCard(DEALERHAND[i], DEALERCARDSDIV);
	}
	console.log(DECK.length);
	console.log(DEALERHAND);
	console.log(PLAYERHAND);
}

function playerHit() {
	addCard(PLAYERHAND);
	let playerli = document.createElement('li');
	playerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
	PLAYERCARDS.appendChild(playerli);
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		declareWinner();
	}
}

function playerStay() {
	console.log('you stayed');
	runDealer();
}
