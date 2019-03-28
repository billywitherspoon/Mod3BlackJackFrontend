let DECK = shuffleDeck(createDeck());
// DECK.unshift(makeSix());
// DECK.unshift(makeTen());
// DECK.unshift(makeFive());
// DECK.unshift(makeFive());
DECK.unshift(makeTen());
DECK.unshift(makeFive());
DECK.unshift(makeAce());
DECK.unshift(makeTen());

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
	currentPlayerTotal = accurateTotal(PLAYERHAND);
	currentDealerTotal = accurateTotal(DEALERHAND);
	document.getElementById('player-score').textContent = currentPlayerTotal;
	if (isTwentyOne(PLAYERHAND) && !isTwentyOne(DEALERHAND)) {
		blackJack();
	} else if (isTwentyOne(DEALERHAND) && !isTwentyOne(PLAYERHAND)) {
		dealerBlackJack();
	} else if (isTwentyOne(DEALERHAND) && isTwentyOne(PLAYERHAND)) {
		doubleBlackJack();
	} else if (isElevenOrTen(PLAYERHAND) && accurateTotal != 21) {
		doubleDown();
	}
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
	let result = document.getElementById('result');
	let winner = whoWon();
	let amount = parseInt(sessionStorage.getItem('amount'));
	if (winType === 'blackjack') {
		updateAccount(Math.round(amount * -2.5));
		result.textContent = `BLACKJACK! You won $${Math.round(amount * 1.5)}!`;
	} else if (winType === 'dealer blackjack') {
		result.textContent = `Dealer Blackjack!`;
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
		} else {
			updateAccount(Math.round(amount * -2));
			result.textContent = `${winner} won $${amount}!`;
			console.log(winner + ' won!');
		}
	}
	logCards('dealer', DEALERHAND);
	logCards('player', PLAYERHAND);
	clearBetActions();
	zeroBalance();
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
