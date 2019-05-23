//Creates a new Deck as a global variable and Shuffles it

let DECK = shuffleDeck(createDeck());

//START CARD FORCE TEST CODE

// DECK.unshift(makeSix());
// DECK.unshift(makeSix());
// DECK.unshift(makeTen());
// DECK.unshift(makeFive());
// DECK.unshift(makeTwo());

//END CARD FORCE TEST CODE

//Create a Global Player Hand Array and Global Dealer Hand Array

let PLAYERHAND = [];
let DEALERHAND = [];

//Deals a new hand.  Is async due to intentional card dealing delay.  Checks for blackjacks and double downs.  Calls on reset game prior.

async function newHand() {
	resetGame();
	let amount = parseInt(sessionStorage.getItem('amount'));
	let balance = parseInt(sessionStorage.getItem('balance'));
	for (let i = 0; i < 2; i++) {
		PLAYERHAND[i] = DECK.shift();
		DEALERHAND[i] = DECK.shift();
		await timeout(550);
		renderCard(PLAYERHAND[i], PLAYERCARDSDIV);
		updatePlayerTotalDisplay();
		if (i == 0) {
			await timeout(550);
			renderCard(
				DEALERHAND[i],
				DEALERCARDSDIV,
				'hidden',
				'hidden-card',
				'bottom-right-hidden',
				'top-left-hidden'
			);
		} else {
			await timeout(550);
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

//Clears previous dealer and player hands, creates a new deck if deck is too low.  PS: Mathematically we concluded 18 is the minimum number of cards necessary for a single player/dealer blackjack round.

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

// Runs the player blackjack scenario

async function blackJack() {
	showDealer();
	await timeout(550);
	declareWinner('blackjack');
}

// Runs the dealer blackjack scenario

async function dealerBlackJack() {
	showDealer();
	await timeout(550);
	declareWinner('dealer blackjack');
}

// Runs the dealer and player blackjack scenario

async function doubleBlackJack() {
	showDealer();
	await timeout(550);
	declareWinner('double blackjack');
}

// Takes in the winner as an argument and runs necessary logic.  For example: updates the player account based on win or loss.

async function declareWinner(winType = '') {
	clearBetActions();
	await timeout(550);
	renderBetCard();
	let result = document.getElementById('result');
	let winner = whoWon();
	let amount = parseInt(sessionStorage.getItem('amount'));
	let serverResult;
	if (winType === 'blackjack') {
		serverResult = 'Player';
		result.textContent = `BLACKJACK! You won $${Math.round(amount * 1.5)}!`;
		updateGames(serverResult).then(() => {
			updateAccount(Math.round(amount * -2.5));
		});
	} else if (winType === 'dealer blackjack') {
		serverResult = 'Dealer';
		result.textContent = `Dealer Blackjack!`;
		updateGames(serverResult).then(() => {
			retrieveUserInfo(sessionStorage.getItem('username')).then((userInfo) => {});
		});
		zeroBalance();
	} else if (winType === 'double blackjack') {
		serverResult = 'Push';
		result.textContent = `Double Blackjack!`;
		updateGames(serverResult).then(() => {
			updateAccount(Math.round(amount * -1));
		});
	} else {
		if (winner === 'Push') {
			serverResult = 'Push';
			result.textContent = 'PUSH';
			updateGames(serverResult).then(() => {
				updateAccount(Math.round(amount * -1));
			});
		} else if (winner === 'Dealer') {
			serverResult = 'Dealer';
			result.textContent = `${winner} won!`;
			updateGames(serverResult).then(() => {
				retrieveUserInfo(sessionStorage.getItem('username')).then((userInfo) => {});
			});
			zeroBalance();
		} else {
			serverResult = 'Player';
			result.textContent = `${winner} won $${amount}!`;
			updateGames(serverResult).then(() => {
				updateAccount(Math.round(amount * -2));
			});
		}
	}
}

function updateGames(serverResult) {
	return fetch('http://playblackjackbackend.herokuapp.com/api/v1/hands', {
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

function playSound() {
	let cardSound = document.getElementById('card-sound');
	cardSound.play();
}
