function isBusted(hand) {
	if (hardTotal(hand) > 21) {
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

function hardTotal(hand) {
	handArray = Object.values(hand).map((value) => {
		return value.value;
	});
	return sumArray(handArray);
}

function accurateTotal(hand) {
	let total = hardTotal(hand);
	if (isSoft(hand)) {
		total += 10;
	}
	return total;
}

function addCard(hand) {
	hand.push(DECK.shift());
}

function isSoft(hand) {
	if (hasAce(hand) && hardTotal(hand) < 12) {
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

function isTwentyOne(hand) {
	if (accurateTotal(hand) === 21) {
		return true;
	} else {
		return false;
	}
}

function createHtmlElement(tag = '', className = '', textContent = '', id = '') {
	let element = document.createElement(tag);
	element.className = className;
	element.textContent = textContent;
	element.id = id;
	return element;
}

function isInteger(value) {
	let regex = /\D/;
	return !regex.test(value);
}
