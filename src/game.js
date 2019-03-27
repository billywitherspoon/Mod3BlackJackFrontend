let DECK = shuffleDeck(createDeck());
let PLAYERHAND = [];
let DEALERHAND = [];

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
	currentPlayerTotal = accurateTotal(PLAYERHAND);
	currentDealerTotal = accurateTotal(DEALERHAND);
	document.getElementById('player-score').textContent = currentPlayerTotal;
}

function resetGame() {
	let result = document.getElementById('result');
	result.textContent = '';
	// let cards = document.getElementsByClassName("card");
	while (DEALERCARDSDIV.firstChild) {
		DEALERCARDSDIV.removeChild(DEALERCARDSDIV.firstChild);
	}
	while (PLAYERCARDSDIV.firstChild) {
		PLAYERCARDSDIV.removeChild(PLAYERCARDSDIV.firstChild);
	}
	PLAYERHAND = [];
	DEALERHAND = [];
	if (DECK.length < 18) {
		DECK = shuffleDeck(createDeck());
	}
}

function blackJack() {
	console.log('You got blackjack!');
	if (DEALERHAND[0].value === 1 || DEALERHAND[0].value === 10) {
		console.log('Do you want even money?');
	}
	showDealer();
	declareWinner('blackjack');
}

function declareWinner(winType = '') {
	let result = document.getElementById('result');
	let winner = whoWon();
	let amount = parseInt(sessionStorage.getItem('amount'));
	if (winType === 'blackjack') {
		updateAccount(amount * -2.5);
		result.textContent = 'BLACKJACK';
	} else {
		if (winner === 'Push') {
			updateAccount(amount * -1);
			result.textContent = 'PUSH';
			console.log('push');
		} else if (winner === 'Dealer') {
			updateAccount(amount);
			result.textContent = `${winner} won!`;
			console.log(winner + ' won!');
		} else {
			updateAccount(amount * -2);
			result.textContent = `${winner} won!`;
			console.log(winner + ' won!');
		}
	}
	sessionStorage.setItem('amount', '');
	logCards('dealer', DEALERHAND);
	logCards('player', PLAYERHAND);
	clearBetActions();
}

function whoWon() {
	playerTotal = accurateTotal(PLAYERHAND);
	dealerTotal = accurateTotal(DEALERHAND);

	if (playerTotal > 21) {
		console.log('result: player greater than 21');
		return 'Dealer';
	} else if (dealerTotal > 21) {
		console.log('result: dealer greater than 21');
		return 'You';
	} else if (playerTotal < dealerTotal) {
		console.log('result: dealer greater than player');
		return 'Dealer';
	} else if (playerTotal > dealerTotal) {
		console.log('result: player greater than dealer');
		return 'You';
	} else if (playerTotal === dealerTotal) {
		console.log('result: player === dealer');
		return 'Push';
	} else {
		console.log('something went wrong with determining result');
	}
}
