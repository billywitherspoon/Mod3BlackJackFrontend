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

	previousBet = sessionStorage.getItem('amount');

	if (previousBet) {
		betInput.value = `${previousBet}`;
	} else {
		betInput.value = `0`;
	}

	betInput.type = 'text';

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
	if (document.getElementById('dealer-score')) {
		document.getElementById('dealer-score').remove();
	}
	document.getElementById('player-score').textContent = '';
	ev.preventDefault();
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput) && hasEnoughMoney(betInput)) {
		betInput = parseInt(betInput);
		clearBetCard();
		sessionStorage.setItem('amount', `${betInput}`);
		// updateAccount(betInput);
		// newHand();
		updateAccount(betInput).then((statement) => {
			// runDealer();
			console.log(statement);
			newHand();
		});
	} else {
		alert('Invalid Bet');
		betInputElement.value = '0';
	}
}

function renderBetActions() {
	let hitButton = createHtmlElement('button', 'btn-danger', 'Hit', 'hit');
	let stayButton = createHtmlElement('button', 'btn-danger', 'Stay', 'stay');
	hitButton.onclick = playerHit;
	stayButton.onclick = playerStay;
	BETTINGACTIONS.appendChild(hitButton);
	BETTINGACTIONS.appendChild(stayButton);
}

function clearBetActions() {
	while (BETTINGACTIONS.firstChild) {
		BETTINGACTIONS.firstChild.remove();
	}
}

function clearBetCard() {
	let betCard = document.getElementById('bet-card');
	betCard.remove();
}

function playerHit() {
	let doubleDownButton = document.getElementById('double-down-button');
	if (doubleDownButton) {
		doubleDownButton.remove();
	}
	addCard(PLAYERHAND, PLAYERCARDSDIV);
	updatePlayerTotalDisplay();
	if (isBusted(PLAYERHAND)) {
		console.log('you busted');
		showDealer();
		declareWinner();
	}
}

function playerStay() {
	console.log('you stayed');
	runDealer();
}

function doubleDown() {
	let doubleDownButton = createHtmlElement('button', '', 'Double Down', 'double-down-button');
	doubleDownButton.onclick = doubleBet;
	BETTINGACTIONS.appendChild(doubleDownButton);
}

function doubleBet() {
	clearBetActions();
	let amount = parseInt(sessionStorage.getItem('amount'));
	sessionStorage.setItem('amount', `${amount * 2}`);
	addCard(PLAYERHAND, PLAYERCARDSDIV);
	updatePlayerTotalDisplay();
	updateAccount(amount).then((statement) => {
		// runDealer();
		console.log(statement);
		runDealer();
	});
}
