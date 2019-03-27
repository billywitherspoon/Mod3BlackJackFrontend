function runDealer() {
	console.log('running dealer');
	while (isSoft(DEALERHAND)) {
		if (hardTotal(DEALERHAND) < 8) {
			addCard(DEALERHAND);
			renderCard(DEALERHAND[DEALERHAND.length - 1], DEALERCARDSDIV);
			console.log('dealer hit on soft hand');
			logCards('dealer', DEALERHAND);
		} else if (hardTotal(DEALERHAND) >= 8) {
			console.log('dealer stayed on soft 18+');
			logCards('dealer', DEALERHAND);
			break;
		}
	}
	while (hardTotal(DEALERHAND) < 17 && !isSoft(DEALERHAND)) {
		// let dealerli = document.createElement('li');
		// dealerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
		// DEALERCARDSDIV.appendChild(dealerli);
		addCard(DEALERHAND);
		renderCard(DEALERHAND[DEALERHAND.length - 1], DEALERCARDSDIV);
		console.log('dealer hit on hard hand');
		logCards('dealer', DEALERHAND);
		if (isBusted(DEALERHAND)) {
			console.log('dealer busted');
			break;
		}
	}
	let dealerScoreTotal = document.getElementById('dealer-score-hidden')
	dealerScoreTotal.id = 'dealer-score'
	dealerScoreTotal.textContent = accurateTotal(DEALERHAND)
	console.log('dealer ended its run');
	declareWinner();
}
