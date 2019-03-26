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

function renderCard(cardObject, cardArea) {
	let newDiv = document.createElement('div');
	newDiv.textContent = `${cardObject.display}${cardObject.suit}`;
	newDiv.className = 'card';

	if ([ '♥', '♦' ].includes(cardObject.suit)) {
		newDiv.classList.add('red');
	} else {
		newDiv.classList.add('black');
	}
	if (cardArea.id == 'player-cards') {
		cardArea.appendChild(newDiv);
	} else {
		cardArea.appendChild(newDiv);
	}
}
