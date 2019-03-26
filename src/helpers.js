function isBusted(hand) {
	if (handTotal(hand) > 21) {
		return true;
	} else {
		return false;
	}
}

function hasAce(hand) {
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
}

function finalHandTotal(hand) {
	let total = handTotal(hand);
	if (isSoft(hand)) {
		total += 10;
	}
	return total;
}

function addCard(hand) {
	hand.push(DECK.shift());
}

function isSoft(hand) {
	if (hasAce(hand) && handTotal(hand) < 12) {
		return true;
	} else {
		return false;
	}
}

function logCards(name, hand) {
	let cards = hand.map((card) => {
		return card.value;
	});
	console.log(`${name}: ` + cards);
}
