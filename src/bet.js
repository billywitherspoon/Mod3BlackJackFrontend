function renderBetCard() {
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

	betInput.type = 'text';
	betInput.value = '0';

	increaseButton.type = 'button';
	increaseButton.onclick = increaseBet;

	decreaseButton.type = 'button';
	decreaseButton.onclick = decreaseBet;

	dealButton.type = 'submit';
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
	BETTINGACTIONS.appendChild(card);
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
		clearBetCard();
		newHand();
		// updateAccount();
	} else {
		alert('Please enter a number greater than 0');
		betInputElement.value = '0';
	}
}

function renderBetActions() {
	let hitButton = createHtmlElement('button', '', 'Hit', 'hit');
	let stayButton = createHtmlElement('button', '', 'Stay', 'stay');
	hitButton.onclick = playerHit;
	stayButton.onclick = playerStay;
	BETTINGACTIONS.appendChild(hitButton);
	BETTINGACTIONS.appendChild(stayButton);
}

function clearBetActions() {
	let hitButton = document.getElementById('hit');
	let stayButton = document.getElementById('stay');
	hitButton.remove();
	stayButton.remove();
	renderBetCard();
}

function clearBetCard() {
	let betCard = document.getElementById('bet-card');
	betCard.remove();
}

function playerHit() {
	addCard(PLAYERHAND);
	currentTotal = accurateTotal(PLAYERHAND);
	// document.getElementById('player-score').textContent = currentTotal;
	renderCard(PLAYERHAND[PLAYERHAND.length - 1], PLAYERCARDSDIV);
	console.log('you hit');
	logCards('player', PLAYERHAND);
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		showDealer();
		declareWinner();
	}
}

function playerStay() {
	console.log('you stayed');
	showDealer();
	runDealer();
}

// function updateAccount() {}
