let DECK = shuffleDeck(createDeck());
// DECK.unshift(makeSix());
// DECK.unshift(makeFive());
// // DECK.unshift(makeAce());
// DECK.unshift(makeFive());
// DECK.unshift(makeSix());
// DECK.unshift(makeSix());

let PLAYERHAND = [];
let DEALERHAND = [];

function newHand() {
	resetGame();
	let amount = parseInt(sessionStorage.getItem('amount'));
	let balance = parseInt(sessionStorage.getItem('balance'));
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
	currentPlayerTotal = accurateTotal(PLAYERHAND);
	currentDealerTotal = accurateTotal(DEALERHAND);
	document.getElementById('player-score').textContent = currentPlayerTotal;
	if (isTwentyOne(PLAYERHAND) && !isTwentyOne(DEALERHAND)) {
		blackJack();
	} else if (isTwentyOne(DEALERHAND) && !isTwentyOne(PLAYERHAND)) {
		dealerBlackJack();
	} else if (isTwentyOne(DEALERHAND) && isTwentyOne(PLAYERHAND)) {
		doubleBlackJack();
	} else if (isElevenOrTen(PLAYERHAND) && accurateTotal != 21 && amount <= balance) {
		doubleDown();
	}
}

function resetGame() {
	// let blackJackTable = document.getElementById('blackjack-table');
	// while (blackJackTable.firstChild) {
	// 	blackJackTable.firstChild.remove();
	// }
	let result = document.getElementById('result');
	result.textContent = '';
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
	if (document.getElementById('player-score')) {
		document.getElementById('player-score').textContent = '';
	}
	if (document.getElementById('dealer-score')) {
		document.getElementById('dealer-score').textContent = '';
	}
}

function blackJack() {
	console.log('You got blackjack!');
	showDealer();
	declareWinner('blackjack');
}

function dealerBlackJack() {
	console.log('Dealer got blackjack!');
	showDealer();
	declareWinner('dealer blackjack');
}

function doubleBlackJack() {
	console.log('double blackjack!');
	showDealer();
	declareWinner('double blackjack');
}

function declareWinner(winType = '') {
	clearBetActions();
	renderBetCard();
	let result = document.getElementById('result');
	let winner = whoWon();
	let amount = parseInt(sessionStorage.getItem('amount'));
	if (winType === 'blackjack') {
		updateAccount(Math.round(amount * -2.5));
		result.textContent = `BLACKJACK! You won $${Math.round(amount * 1.5)}!`;
	} else if (winType === 'dealer blackjack') {
		result.textContent = `Dealer Blackjack!`;
		zeroBalance();
	} else if (winType === 'double blackjack') {
		updateAccount(Math.round(amount * -1));
		result.textContent = `Double Blackjack!`;
		console.log('push');
	} else {
		if (winner === 'Push') {
			updateAccount(Math.round(amount * -1));
			result.textContent = 'PUSH';
			console.log('push');
		} else if (winner === 'Dealer') {
			result.textContent = `${winner} won!`;
			console.log(winner + ' won!');
			zeroBalance();
		} else {
			updateAccount(Math.round(amount * -2));
			result.textContent = `${winner} won $${amount}!`;
			console.log(winner + ' won!');
		}
	}
	logCards('dealer', DEALERHAND);
	logCards('player', PLAYERHAND);
	// debugger
	// if (winner == 'You'){
	// 	let serverResult = win
	// }
	// else if (winner ==)
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

function addCard(hand, div) {
	hand.push(DECK.shift());
	renderCard(hand[hand.length - 1], div);
	console.log('added a card');
	logCards('player', PLAYERHAND);
	logCards('dealer', DEALERHAND);
}
