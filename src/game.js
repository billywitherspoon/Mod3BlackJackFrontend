let DECK = shuffleDeck(createDeck());
let PLAYERHAND = [];
let DEALERHAND = [];
let DEALERCARDSDIV = document.getElementById('dealer-cards');
let PLAYERCARDSDIV = document.getElementById('player-cards');
renderBetCard();

function blackJack() {
	console.log('You got blackjack!');
	if (DEALERHAND[0].value === 1 || DEALERHAND[0].value === 10) {
		console.log('Do you want even money?');
	}
	declareWinner();
}

function declareWinner() {
	let winner = whoWon();
	if (winner === 'push') {
		console.log('push');
	} else {
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
		return 'dealer';
	} else if (dealerTotal > 21) {
		console.log('result: dealer greater than 21');
		return 'player';
	} else if (playerTotal < dealerTotal) {
		console.log('result: dealer greater than player');
		return 'dealer';
	} else if (playerTotal > dealerTotal) {
		console.log('result: player greater than dealer');
		return 'player';
	} else if (playerTotal === dealerTotal) {
		console.log('result: player === dealer');
		return 'push';
	} else {
		console.log('something went wrong with determining result');
	}
}
