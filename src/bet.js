function renderBetCard() {
	let bettingActions = document.getElementById('betting-actions');

	let card = createHtmlElement('div', 'card text-center', '', 'bet-card');
	let cardHeader = createHtmlElement('div', 'card-header', 'Place a Bet', 'card-header');
	let cardBody = createHtmlElement('div', 'card-body', '', 'card-body');
	let form = createHtmlElement('form', '', '', 'bet-form');
	let row = createHtmlElement('div', 'row', '', '');
	let colBetInput = createHtmlElement('div', 'col', '', '');
	let colBetButtons = createHtmlElement('div', 'col', '', '');
	let betInput = createHtmlElement('input', 'form-control', '', 'bet-input');
	let increaseButton = createHtmlElement('button', 'btn btn-warning rounded-circle xl h1', '+', '');
	let decreaseButton = createHtmlElement('button', 'btn btn-warning rounded-circle xl h1', '-', '');
	let dealButton = createHtmlElement('button', 'btn btn-secondary mb-2', 'Deal a Hand', 'deal-button');

	// <button type="submit" class="btn btn-primary mb-2">
	// 	Confirm identity
	// </button>;

	betInput.type = 'text';
	betInput.value = '0';

	increaseButton.type = 'button';
	increaseButton.onclick = increaseBet;
	// increaseButton.id = 'increase-button';
	decreaseButton.type = 'button';
	decreaseButton.onclick = decreaseBet;
	// decreaseButton.cl: 'bet-button';
	dealButton.onclick = makeBet;

	colBetButtons.appendChild(increaseButton);
	colBetButtons.appendChild(decreaseButton);
	colBetInput.appendChild(betInput);
	row.appendChild(colBetInput);
	row.appendChild(colBetButtons);
	form.appendChild(row);
	form.appendChild(dealButton);
	cardBody.appendChild(form);
	card.appendChild(cardHeader);
	card.appendChild(cardBody);
	bettingActions.appendChild(card);
}

// function convertToInt(value) {
// 	value = value.replace(/\D/, '0');
// 	return Math.round(parseInt(value));
// }

function increaseBet() {
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput)) {
		betInputElement.value = `${parseInt(betInput) + 1}`;
	} else {
		betInputElement.value = '0';
	}
}

function decreaseBet() {
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput) && betInput > 0) {
		betInputElement.value = `${parseInt(betInput) - 1}`;
	} else {
		betInputElement.value = '0';
	}
}

function setBetInput() {
	return document.getElementById('bet-input');
}

function makeBet(ev) {
	ev.preventDefault();
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput)) {
		// updateAccount();
	} else {
		alert('Please enter a number greater than 0');
		betInputElement.value = '0';
	}
}
