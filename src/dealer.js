function runDealer() {
	while (isSoft(DEALERHAND)) {
		if (handTotal(DEALERHAND) < 8) {
			addCard(DEALERHAND);
			renderCard(DEALERHAND[DEALERHAND.length - 1], DEALERCARDSDIV);
			console.log('dealer hit on soft hand');
		} else if (handTotal(DEALERHAND) >= 8) {
			console.log('dealer stayed on soft 18+');
			break;
		}
	}
	while (handTotal(DEALERHAND) < 17 && !isSoft(DEALERHAND)) {
		// let dealerli = document.createElement('li');
		// dealerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
		// DEALERCARDSDIV.appendChild(dealerli);
		addCard(DEALERHAND);
		renderCard(DEALERHAND[DEALERHAND.length - 1], DEALERCARDSDIV);
		console.log('dealer hit on hard hand');
		if (isBusted(DEALERHAND)) {
			console.log('dealer busted');
			break;
		}
	}
	console.log('dealer ended it's run);
	declareWinner();
}
