function runDealer() {
	showDealer();
	while (isSoft(DEALERHAND)) {
		if (hardTotal(DEALERHAND) < 8) {
			// currently infinite while loop
			// addCard(DEALERHAND, DEALERCARDSDIV).then((result) => {
			addCard(DEALERHAND, DEALERCARDSDIV);
			updateDealerTotalDisplay();
			console.log(result);
			// });
		} else if (hardTotal(DEALERHAND) >= 8) {
			console.log('broke out of soft');
			break;
		}
	}
	while (hardTotal(DEALERHAND) < 17 && !isSoft(DEALERHAND)) {
		// currently infinite while loop
		// dealerAddCard(DEALERHAND, DEALERCARDSDIV).then((result) => {
		addCard(DEALERHAND, DEALERCARDSDIV);
		updateDealerTotalDisplay();
		console.log(result);
		// });
		if (isBusted(DEALERHAND)) {
			console.log('broke out of hard');
			break;
		}
	}
	declareWinner();
}

function updateDealerTotalDisplay() {
	dealerScore = document.getElementById('dealer-score');
	dealerScore.textContent = accurateTotal(DEALERHAND);
}

// function dealerAddCard(hand, div) {
// 	let delayDealerDeal = setTimeout(dealerDeal, 1000);

// 	return setTimeout(() => {
// 		hand.push(DECK.shift());
// 		renderCard(hand[hand.length - 1], div);
// 		return 'dealer added card';
// 	}, 1000);
// }

var myVar;

function myFunction() {
	myVar = setTimeout(alertFunc, 3000);
}

function alertFunc() {
	alert('Hello!');
}
