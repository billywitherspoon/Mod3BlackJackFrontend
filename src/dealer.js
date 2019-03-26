function dealer() {
	while (checkForSoft(DEALERHAND)) {
		if (handTotal(DEALERHAND) < 8) {
			addCard(DEALERHAND);
		} else if (handTotal(DEALERHAND) >= 8) {
			console.log('dealer stayed');
			whoWon();
			return;
		}
	}

	while (handTotal(DEALERHAND) < 17) {
		let dealerli = document.createElement('li');
		dealerli.textContent = PLAYERHAND[PLAYERHAND.length - 1].display;
		dealerCards.appendChild(dealerli);
		addCard(DEALERHAND);
		if (checkForBust(DEALERHAND)) {
			WINNER = 'player';
			console.log(WINNER + ' won');
			return;
		}
	}
	whoWon();
}
