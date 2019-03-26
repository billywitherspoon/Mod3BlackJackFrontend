function checkForBust(hand) {
	if (handTotal(hand) > 21) {
		return true;
	} else {
		return false;
	}
}

function checkForAce(hand) {
	handDisplays = Object.values(hand).map((value) => {
		return value.display;
	});
	if (handDisplays.includes('A')) {
		return true;
	} else {
		return false;
	}
}

function sumArray(array) {
	return array.reduce((a, b) => a + b, 0);
}

function handTotal(hand) {
	handArray = Object.values(hand).map((value) => {
		return value.value;
	});
	return sumArray(handArray);
	// Object.values(hand).forEach((value) => {
	// 	console.log(value.value);
	// });
}

function whoWon() {
	let playerTotal = handTotal(PLAYERHAND);
	let dealerTotal = handTotal(DEALERHAND);

	if (checkForSoft(PLAYERHAND)) {
		playerTotal += 10;
	}

	if (checkForSoft(DEALERHAND)) {
		dealerTotal += 10;
	}

	if (playerTotal > dealerTotal) {
		WINNER = 'player';
	} else if (playerTotal < dealerTotal) {
		WINNER = 'dealer';
	} else {
		WINNER = 'push';
	}
	console.log(WINNER + ' won');
	console.log(DEALERHAND);
	console.log(PLAYERHAND);
}

function addCard(hand) {
	hand.push(DECK.shift());
}

function checkForSoft(hand) {
	if (checkForAce(hand) && handTotal(hand) < 12) {
		return true;
	} else {
		return false;
	}
}
