function runDealer() {
	while (isSoft(DEALERHAND)) {
		if (handTotal(DEALERHAND) < 8) {
			addCard(DEALERHAND);
		} else if (handTotal(DEALERHAND) >= 8) {
			declareWinner();
			return;
		}
	}
	while (handTotal(DEALERHAND) < 17) {
		// let dealerli = document.createElement('li');
		// dealerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
		// dealerCards.appendChild(dealerli);
		addCard(DEALERHAND);
		if (isBusted(DEALERHAND)) {
			break;
		}
	}
	declareWinner();
}
