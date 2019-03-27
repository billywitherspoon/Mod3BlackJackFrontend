function newHand() {
	resetGame();
	renderBetActions();
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		renderCard(PLAYERHAND[i], PLAYERCARDSDIV);
		if (i == 0) {
			renderCard(
				DEALERHAND[i],
				DEALERCARDSDIV,
				'hidden',
				'hidden-card',
				'bottom-right-hidden',
				'top-left-hidden'
			);
		} else {
			renderCard(DEALERHAND[i], DEALERCARDSDIV);
		}
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
	logCards('player', PLAYERHAND);
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		showDealer();
		declareWinner();
	}
}

function playerStay() {
	console.log('you stayed');
	showDealer();
	runDealer();
}

function showDealer() {
	let showTopLeft = document.getElementById('top-left-hidden');
	let showBottomRight = document.getElementById('bottom-right-hidden');
	let showCard = document.getElementById('hidden-card');
	showTopLeft.removeAttribute('id');
	showBottomRight.removeAttribute('id');
	showCard.removeAttribute('id');
	showCard.className = 'playing-card';
}
