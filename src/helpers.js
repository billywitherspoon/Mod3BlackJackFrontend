function isBusted(hand) {
	if (hardTotal(hand) > 21) {
		return true;
	} else {
		return false;
	}
}

function hasAce(hand) {
	let handDisplays = Object.values(hand).map((value) => {
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
	let handArray = Object.values(hand).map((value) => {
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

function isElevenOrTen(hand) {
	if (hardTotal(hand) === 11 || hardTotal(hand) === 10) {
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
	return value === '' ? false : !regex.test(value);
}

function validUsername(input) {
	if (input !== '') {
		return true;
	} else {
		return false;
	}
}

function hasEnoughMoney(betInput) {
	let sessionBalance = parseInt(sessionStorage.getItem('balance'));
	return parseInt(betInput) <= sessionBalance;
}

function timeout(ms) {
	return new Promise((done) => setTimeout(done, ms));
}

// async function sleep2000(fn, ...args) {

// 	return fn(...args);
// }
