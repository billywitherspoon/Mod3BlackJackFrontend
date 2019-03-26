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
	let increaseButton = createHtmlElement('button', 'btn btn-warning rounded-circle xl', '+', '');
	let decreaseButton = createHtmlElement('button', 'btn btn-warning rounded-circle xl', '-', '');

	betInput.type = 'text';
	betInput.value = '0';
	increaseButton.type = 'button';
	increaseButton.onclick = increaseBet;
	decreaseButton.type = 'button';
	decreaseButton.onclick = decreaseBet;

	colBetButtons.appendChild(increaseButton);
	colBetButtons.appendChild(decreaseButton);
	colBetInput.appendChild(betInput);
	row.appendChild(colBetInput);
	row.appendChild(colBetButtons);
	form.appendChild(row);
	cardBody.appendChild(form);
	card.appendChild(cardHeader);
	card.appendChild(cardBody);
	bettingActions.appendChild(card);
}

function convertToInt(value) {
	value = value.replace(/\D/, '0');
	return Math.round(parseInt(value));
}

function increaseBet() {
	let betInput = document.getElementById('bet-input');
	betInput.value = `${convertToInt(betInput.value) + 1}`;
}

function decreaseBet() {
	let betInput = document.getElementById('bet-input');
	if (parseInt(betInput.value) > 0) {
		betInput.value = `${convertToInt(betInput.value) - 1}`;
	}
}
