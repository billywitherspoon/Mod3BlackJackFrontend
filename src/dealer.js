function runDealer() {
	showDealer();
	while (isSoft(DEALERHAND)) {
		if (hardTotal(DEALERHAND) < 8) {
			// currently infinite while loop
			// dealerAddCard(DEALERHAND, DEALERCARDSDIV).then((result) => {
			// 	updateDealerTotalDisplay();
			// 	console.log(result);
			// });
		} else if (hardTotal(DEALERHAND) >= 8) {
			break;
		}
	}
	while (hardTotal(DEALERHAND) < 17 && !isSoft(DEALERHAND)) {
		// currently infinite while loop
		// dealerAddCard(DEALERHAND, DEALERCARDSDIV).then((result) => {
		// 	updateDealerTotalDisplay();
		// 	console.log(result);
		// });
		if (isBusted(DEALERHAND)) {
			break;
		}
	}
	declareWinner();
}

function updateDealerTotalDisplay() {
	dealerScore = document.getElementById('dealer-score');
	dealerScore.textContent = accurateTotal(DEALERHAND);
}

function dealerAddCard(hand, div) {
	return setTimeout(() => {
		hand.push(DECK.shift());
		renderCard(hand[hand.length - 1], div);
		return 'dealer added card';
	}, 1000);
}
