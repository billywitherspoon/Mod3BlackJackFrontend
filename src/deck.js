let suits = [ '♠', '♥', '♣', '♦' ];
let displays = [ 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K' ];

class Card {
	constructor(display, suit, value) {
		this.display = display;
		this.suit = suit;
		this.value = value;
	}
}

function createValue(display) {
	let value = 0;
	switch (display) {
		case 'A':
			value = 1;
			break;
		case 'J':
		case 'Q':
		case 'K':
			value = 10;
			break;
		default:
			value = display;
	}
	return value;
}

function createDeck() {
	let newDeck = [];
	suits.forEach((suit) => {
		displays.forEach((display) => {
			let value = createValue(display);
			let card = new Card(display, suit, value);
			newDeck.push(card);
		});
	});
	return newDeck;
}

function makeAce() {
	return new Card('A', '♠', 1);
}

function makeTen() {
	return new Card('10', '♠', 10);
}
function makeSix() {
	return new Card('5', '♠', 5);
}
function makeFive() {
	return new Card('6', '♠', 6);
}

function shuffleDeck(deckArray) {
	let counter = deckArray.length;

	// While there are elements in the deckArray
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = deckArray[counter];
		deckArray[counter] = deckArray[index];
		deckArray[index] = temp;
	}
	return deckArray;
}

function renderCard(
	cardObject,
	cardArea,
	className = 'playing-card',
	id = 'rendered-card',
	bR = 'bottom-right',
	tL = 'top-left'
) {
	let newDiv = document.createElement('div');
	newDiv.className = className;
	newDiv.id = id;
	let topLeft = document.createElement('div');
	let bottomRight = document.createElement('div');
	// let logo = document.createElement('img')
	// logo.src = 'img/logo.png'
	// logo.className = 'logo'
	bottomRight.textContent = `${cardObject.display}${cardObject.suit}`;
	topLeft.textContent = `${cardObject.display}${cardObject.suit}`;
	bottomRight.className = 'bottom-right';
	topLeft.className = 'top-left';
	bottomRight.id = bR;
	topLeft.id = tL;
	// newDiv.appendChild(logo)
	newDiv.appendChild(bottomRight);
	newDiv.appendChild(topLeft);

	if ([ '♥', '♦' ].includes(cardObject.suit)) {
		bottomRight.classList.add('red');
		topLeft.classList.add('red');
	} else {
		bottomRight.classList.add('black');
		topLeft.classList.add('black');
	}
	if (cardArea.id == 'player-cards') {
		cardArea.appendChild(newDiv);
	} else {
		cardArea.appendChild(newDiv);
	}
}
