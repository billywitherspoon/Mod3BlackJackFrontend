function newHand() {
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		renderCard(PLAYERHAND[i], PLAYERCARDSDIV);
		renderCard(DEALERHAND[i], DEALERCARDSDIV);
	}
	console.log('deck size: ' + DECK.length);
	logCards('dealer', DEALERHAND);
	logCards('player', PLAYERHAND);
	if (isTwentyOne(PLAYERHAND)) {
		blackJack();
	}
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
	runDealer();
}
