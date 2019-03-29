function renderBetCard() {
	let card = createHtmlElement('card', 'text-center bg-dark text-white border-dark', '', 'bet-card');
	let cardHeader = createHtmlElement(
		'div',
		'card-title border-dark bg-dark col-12',
		'Place a Bet',
		'bet-card-header'
	);
	let cardBody = createHtmlElement('div', 'card-body', '', 'card-body');
	let form = createHtmlElement('form', '', '', 'bet-form');
	let row = createHtmlElement('div', 'row justify-content-center', '', 'betting-rows');
	let row2 = createHtmlElement('div', 'row justify-content-center', '', 'betting-rows');
	let row3 = createHtmlElement('div', 'row justify-content-center', '', 'betting-rows');
	let betInputCol = createHtmlElement('div', 'col-6', '', '');
	let betCurrency = createHtmlElement('div', 'col-1', '$', 'bet-currency');
	let betInput = createHtmlElement('input', 'form-control', '', 'bet-input');
	let dealButton = createHtmlElement('button', 'btn btn-secondary mb-2 col-10', 'Deal a Hand', 'deal-button');
	let increaseButtonDiv = createHtmlElement('div', 'col-6', '', 'increase-button-div');
	let decreaseButtonDiv = createHtmlElement('div', 'col-6', '', 'decrease-button-div');
	let increaseButton = createHtmlElement('button', 'btn btn-danger col-6', '+', 'bet-change-buttons');
	let decreaseButton = createHtmlElement('button', 'btn btn-danger col-6', '-', 'bet-change-buttons');

	previousBet = sessionStorage.getItem('amount');

	if (previousBet) {
		betInput.value = `${previousBet}`;
	} else {
		betInput.value = `1`;
	}

	betInput.type = 'text';

	increaseButton.type = 'button';
	increaseButton.onclick = increaseBet;

	decreaseButton.type = 'button';
	decreaseButton.onclick = decreaseBet;

	dealButton.type = 'submit';
	dealButton.onclick = makeBet;

	increaseButtonDiv.appendChild(increaseButton);
	decreaseButtonDiv.appendChild(decreaseButton);
	betInputCol.appendChild(betInput);
	row.appendChild(betCurrency);
	row.appendChild(betInputCol);
	row2.appendChild(decreaseButtonDiv);
	row2.appendChild(increaseButtonDiv);
	row3.appendChild(dealButton);
	form.appendChild(row);
	form.appendChild(row2);
	form.appendChild(row3);
	cardBody.appendChild(form);
	card.appendChild(cardHeader);
	card.appendChild(cardBody);
	BETTINGACTIONS.appendChild(card);
}

function increaseBet() {
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput)) {
		betInputElement.value = `${parseInt(betInput) + 1}`;
	} else {
		betInputElement.value = '1';
	}
}

function decreaseBet() {
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput) && betInput > 1) {
		betInputElement.value = `${parseInt(betInput) - 1}`;
	} else {
		betInputElement.value = '1';
	}
}

function setBetInput() {
	return document.getElementById('bet-input');
}

function makeBet(ev) {
	if (document.getElementById('dealer-score')) {
		document.getElementById('dealer-score').textContent = '';
	}
	document.getElementById('player-score').textContent = '';
	ev.preventDefault();
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput) && hasEnoughMoney(betInput) && parseInt(betInput) > 0) {
		betInput = parseInt(betInput);
		clearBetActions();
		sessionStorage.setItem('amount', `${betInput}`);
		updateAccount(betInput).then((statement) => {
			newHand();
		});
	} else {
		alert('Please enter a valid bet');
		betInputElement.value = '1';
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

async function playerHit() {
	let doubleDownButton = document.getElementById('double-down-button');
	if (doubleDownButton) {
		doubleDownButton.remove();
	}
	clearBetActions();
	await timeout(1000);
	addCard(PLAYERHAND, PLAYERCARDSDIV);
	updatePlayerTotalDisplay();
	if (isBusted(PLAYERHAND)) {
		showDealer();
		declareWinner();
	} else {
		renderBetActions();
	}
}

function playerStay() {
	clearBetActions();
	runDealer();
}

function doubleDown() {
	let doubleDownButton = createHtmlElement('button', '', 'Double Down', 'double-down-button');
	doubleDownButton.onclick = doubleBet;
	renderBetActions();
	BETTINGACTIONS.appendChild(doubleDownButton);
}

function doubleBet() {
	clearBetActions();
	let amount = parseInt(sessionStorage.getItem('amount'));
	sessionStorage.setItem('amount', `${amount * 2}`);
	addCard(PLAYERHAND, PLAYERCARDSDIV);
	updatePlayerTotalDisplay();
	updateAccount(amount).then((statement) => {
		runDealer();
	});
}
