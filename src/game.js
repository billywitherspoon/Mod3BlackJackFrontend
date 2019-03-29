let DECK = shuffleDeck(createDeck());
// DECK.unshift(makeAce());

let PLAYERHAND = [];
let DEALERHAND = [];

async function newHand() {
	resetGame();
	let amount = parseInt(sessionStorage.getItem('amount'));
	let balance = parseInt(sessionStorage.getItem('balance'));
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		await timeout(1000);
		renderCard(PLAYERHAND[i], PLAYERCARDSDIV);
		updatePlayerTotalDisplay();
		if (i == 0) {
			await timeout(1000);
			renderCard(
				DEALERHAND[i],
				DEALERCARDSDIV,
				'hidden',
				'hidden-card',
				'bottom-right-hidden',
				'top-left-hidden'
			);
		} else {
			await timeout(1000);
			renderCard(DEALERHAND[i], DEALERCARDSDIV);
		}
	}
	if (isTwentyOne(PLAYERHAND) && !isTwentyOne(DEALERHAND)) {
		blackJack();
	} else if (isTwentyOne(DEALERHAND) && !isTwentyOne(PLAYERHAND)) {
		dealerBlackJack();
	} else if (isTwentyOne(DEALERHAND) && isTwentyOne(PLAYERHAND)) {
		doubleBlackJack();
	} else if (isElevenOrTen(PLAYERHAND) && accurateTotal != 21 && amount <= balance) {
		doubleDown();
	} else {
		renderBetActions();
	}
}

function resetGame() {
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

async function blackJack() {
	showDealer();
	await timeout(1000);
	declareWinner('blackjack');
}

async function dealerBlackJack() {
	showDealer();
	await timeout(1000);
	declareWinner('dealer blackjack');
}

async function doubleBlackJack() {
	showDealer();
	await timeout(1000);
	declareWinner('double blackjack');
}

async function declareWinner(winType = '') {
	clearBetActions();
	await timeout(1000);
	renderBetCard();
	// setTimeout(() => {
	let result = document.getElementById('result');
	let winner = whoWon();
	let amount = parseInt(sessionStorage.getItem('amount'));
	let serverResult;
	if (winType === 'blackjack') {
		updateAccount(Math.round(amount * -2.5));
		result.textContent = `BLACKJACK! You won $${Math.round(amount * 1.5)}!`;
		serverResult = 'Player';
	} else if (winType === 'dealer blackjack') {
		result.textContent = `Dealer Blackjack!`;
		serverResult = 'Dealer';
		zeroBalance();
	} else if (winType === 'double blackjack') {
		serverResult = 'Push';
		updateAccount(Math.round(amount * -1));
		result.textContent = `Double Blackjack!`;
	} else {
		if (winner === 'Push') {
			updateAccount(Math.round(amount * -1));
			result.textContent = 'PUSH';
			serverResult = 'Push';
		} else if (winner === 'Dealer') {
			result.textContent = `${winner} won!`;
			serverResult = 'Dealer';
			zeroBalance();
		} else {
			serverResult = 'Player';
			updateAccount(Math.round(amount * -2));
			result.textContent = `${winner} won $${amount}!`;
		}
	}
	updateGames(serverResult);
}

function updateGames(serverResult) {
	return fetch('http://localhost:3000/api/v1/hands', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			user_id: sessionStorage.getItem('user'),
			winner: serverResult,
			bet_amount: parseInt(sessionStorage.getItem('amount'))
		})
	}).then(() => {
		return 'updated';
	});
}

function whoWon() {
	playerTotal = accurateTotal(PLAYERHAND);
	dealerTotal = accurateTotal(DEALERHAND);

	if (playerTotal > 21) {
		return 'Dealer';
	} else if (dealerTotal > 21) {
		return 'You';
	} else if (playerTotal < dealerTotal) {
		return 'Dealer';
	} else if (playerTotal > dealerTotal) {
		return 'You';
	} else {
		return 'Push';
	}
}

function addCard(hand, div) {
	hand.push(DECK.shift());
	renderCard(hand[hand.length - 1], div);
}
