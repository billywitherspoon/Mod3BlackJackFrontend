async function runDealer() {
	showDealer();
	await timeout(650);
	while (isSoft(DEALERHAND)) {
		if (hardTotal(DEALERHAND) < 8) {
			await timeout(650);
			addCard(DEALERHAND, DEALERCARDSDIV);
			updateDealerTotalDisplay();
		} else if (hardTotal(DEALERHAND) >= 8) {
			break;
		}
	}
	while (hardTotal(DEALERHAND) < 17 && !isSoft(DEALERHAND)) {
		await timeout(650);
		addCard(DEALERHAND, DEALERCARDSDIV);
		updateDealerTotalDisplay();
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
