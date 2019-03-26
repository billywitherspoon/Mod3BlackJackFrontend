function newHand() {
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		renderCard(PLAYERHAND[i], PLAYERCARDSDIV);
		if (i == 0) {
			renderCard(DEALERHAND[i], DEALERCARDSDIV, 'hidden', 'hidden-card');
		} else {
			renderCard(DEALERHAND[i], DEALERCARDSDIV);
		}
	}
	console.log(DECK.length);
	console.log(DEALERHAND);
	console.log(PLAYERHAND);
}

function playerHit() {
	addCard(PLAYERHAND);
	renderCard(PLAYERHAND[PLAYERHAND.length - 1], PLAYERCARDSDIV);
	console.log('you hit');
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		declareWinner();
	}
}

function playerStay() {
	console.log('you stayed');
	console.log('running dealer');
	runDealer();
	let showHiddenCard = document.getElementById('hidden-card');
	showHiddenCard.className = 'card';
}
