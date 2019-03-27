let DECK = shuffleDeck(createDeck());
let PLAYERHAND = [];
let DEALERHAND = [];
let TABLE = document.getElementById('blackjack-table');
let DEALERCARDSDIV = document.getElementById('dealer-cards');
let PLAYERCARDSDIV = document.getElementById('player-cards');
renderBetCard();

function blackJack() {
	console.log('You got blackjack!');
	if (DEALERHAND[0].value === 1 || DEALERHAND[0].value === 10) {
		console.log('Do you want even money?');
	}
	showDealer();
	declareWinner();
}

function declareWinner() {
	let result = document.getElementById('result');
	let winner = whoWon();
	if (winner === 'push') {
		result.textContent = 'PUSH';
		console.log('push');
	} else {
		result.textContent = `${winner} won!`;
		console.log(winner + ' won!');
	}
	logCards('dealer', DEALERHAND);
	logCards('player', PLAYERHAND);
}

function whoWon() {
	playerTotal = finalHandTotal(PLAYERHAND);
	dealerTotal = finalHandTotal(DEALERHAND);

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
		return 'push';
	} else {
		console.log('something went wrong with determining result');
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
