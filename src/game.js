function declareWinner() {
	let winner = whoWon();

	let playerLogCards = PLAYERHAND.map((card) => {
		return card.value;
	});
	let dealerLogCards = DEALERHAND.map((card) => {
		return card.value;
	});
	if (winner === 'push') {
		console.log('push');
	} else {
		console.log(winner + ' won!');
	}
	console.log('player cards: ' + playerLogCards);
	console.log('dealer cards: ' + dealerLogCards);
}
