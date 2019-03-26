function newHand() {
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		renderCard(PLAYERHAND[i], playerCards);
		// if (i == 0) {
		// 	DEALERHAND
		//    renderCard(DEALERHAND[i], dealerCards);
		// } else {
		renderCard(DEALERHAND[i], dealerCards);
		// }
	}
	console.log(DECK.length);
	console.log(DEALERHAND);
	console.log(PLAYERHAND);
}

function playerHit() {
	addCard(PLAYERHAND);
	renderCard(PLAYERHAND[PLAYERHAND.length - 1], playerCards);
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		whoWon();
	}
}

function playerStay() {
	console.log('you stayed');
	dealer();
}
