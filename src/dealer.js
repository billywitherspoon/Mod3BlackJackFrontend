function dealer() {
	while (isSoft(DEALERHAND)) {
		if (handTotal(DEALERHAND) < 8) {
			addCard(DEALERHAND);
			renderCard(DEALERHAND[DEALERHAND.length-1], dealerCards)
		} else if (handTotal(DEALERHAND) >= 8) {
			whoWon();
			return;
		}
	}
	while (handTotal(DEALERHAND) < 17) {
		// let dealerli = document.createElement('li');
		// dealerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
		// dealerCards.appendChild(dealerli);
		addCard(DEALERHAND);
		renderCard(DEALERHAND[DEALERHAND.length-1], dealerCards)
		if (isBusted(DEALERHAND)) {
			break;
		}
	}
	whoWon();
}
