// Renders the betting card and associated betting actions.

function renderBetCard() {
	let wagerGrid = createHtmlElement('div', '', '', 'wager-grid');
	let wagerTitle = createHtmlElement('div', 'flex-center', 'Place a Bet', 'wager-title-div');
	let wagerModifierDiv = createHtmlElement('div', '', '', 'wager-modifier-div');
	let betCurrency = createHtmlElement('div', '', '$', 'bet-currency');
	let betInput = createHtmlElement('input', '', '', 'bet-input');
	let wagerAmountDiv = createHtmlElement('div', '', '', 'wager-amount-div');
	let dealHandDiv = createHtmlElement('div', 'flex-center', '', 'deal-hand-div');
	let dealButton = createHtmlElement('button', '', 'Deal a Hand', 'deal-button');
	let increaseButton = createHtmlElement('button', 'bet-change-button', '+', '');
	let decreaseButton = createHtmlElement('button', 'bet-change-button', '-', '');

	betInput.type = 'text';

	increaseButton.type = 'button';
	increaseButton.onclick = increaseBet;

	decreaseButton.type = 'button';
	decreaseButton.onclick = decreaseBet;

	dealButton.type = 'submit';
	dealButton.onclick = makeBet;

	wagerAmountDiv.appendChild(betCurrency);
	wagerAmountDiv.appendChild(betInput);

	wagerModifierDiv.appendChild(decreaseButton);
	wagerModifierDiv.appendChild(wagerAmountDiv);
	wagerModifierDiv.appendChild(increaseButton);

	dealHandDiv.appendChild(dealButton);

	wagerGrid.appendChild(wagerTitle);
	wagerGrid.appendChild(wagerModifierDiv);
	wagerGrid.appendChild(dealHandDiv);

	document.getElementById('betting-actions').appendChild(wagerGrid);
	let previousBet = sessionStorage.getItem('amount');

	//Checks if the previous bet was a double down to adjust new bet.

	if (previousBet) {
		if (sessionStorage.getItem('double-down') === 'true') {
			betInput.value = `${parseInt(previousBet) / 2}`;
		} else {
			betInput.value = `${previousBet}`;
		}
	} else {
		betInput.value = `5`;
	}
}

//Increases Bet

function increaseBet() {
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput) && betInput !== '') {
		betInputElement.value = `${parseInt(betInput) + 5}`;
	} else {
		betInputElement.value = '5';
	}
}

//Decreases bet, prevents decreasing bet to negative value

function decreaseBet() {
	let betInputElement = setBetInput();
	let betInput = betInputElement.value;
	if (isInteger(betInput) && betInput !== '' && betInput > 5) {
		betInputElement.value = `${parseInt(betInput) - 5}`;
	} else {
		betInputElement.value = '5';
	}
}

//Returns the bet-input element.  This was added because there are several places this element is needed.

function setBetInput() {
	return document.getElementById('bet-input');
}

//Firing function.  When called clears previous bet actions, sets storage, and starts the game.

function makeBet(ev) {
	if (document.getElementById('dealer-score')) {
		document.getElementById('dealer-score').textContent = '';
	}
	document.getElementById('player-score').textContent = '';
	ev.preventDefault();
	let betInputElement = setBetInput();
	sessionStorage.setItem('double-down', 'false');
	let betInput = betInputElement.value;
	if (isInteger(betInput) && hasEnoughMoney(betInput) && parseInt(betInput) > 0) {
		betInput = parseInt(betInput);
		clearBetActions();
		sessionStorage.setItem('amount', `${betInput}`);
		updateAccount(betInput).then(() => {
			newHand();
		});
	} else {
		alert('Please enter a valid bet');
		betInputElement.value = '5';
	}
}

//Renders the bet actions such as Hit or Stay.

function renderBetActions() {
	let hitButton = createHtmlElement('button', 'hit-stay', 'Hit', 'hit');
	let stayButton = createHtmlElement('button', 'hit-stay', 'Stay', 'stay');
	hitButton.onclick = playerHit;
	stayButton.onclick = playerStay;
	let hitStayDiv = createHtmlElement('div', '', '', 'hit-stay-div');
	hitStayDiv.appendChild(stayButton);
	hitStayDiv.appendChild(hitButton);
	document.getElementById('betting-actions').appendChild(hitStayDiv);
}

//Clears the bet actions

function clearBetActions() {
	while (document.getElementById('betting-actions').firstChild) {
		document.getElementById('betting-actions').firstChild.remove();
	}
}

//Adds a card to the players hand

async function playerHit() {
	let doubleDownButton = document.getElementById('double-down-button');
	if (doubleDownButton) {
		doubleDownButton.remove();
	}
	clearBetActions();
	await timeout(650);
	addCard(PLAYERHAND, PLAYERCARDSDIV);
	updatePlayerTotalDisplay();
	if (isBusted(PLAYERHAND)) {
		showDealer();
		declareWinner();
	} else {
		renderBetActions();
	}
}

//Does not deal a player card.  Runs the dealer.

function playerStay() {
	clearBetActions();
	runDealer();
}

//Displays double down button

function doubleDown() {
	let doubleDownButton = createHtmlElement('button', '', 'Double Down', 'double-down-button');
	doubleDownButton.onclick = doubleBet;
	renderBetActions();
	document.getElementById('hit-stay-div').appendChild(doubleDownButton);
}

//Triggers a double down action, doubles bet, deals one card.

function doubleBet() {
	clearBetActions();
	let amount = parseInt(sessionStorage.getItem('amount'));
	sessionStorage.setItem('double-down', 'true');
	sessionStorage.setItem('amount', `${amount * 2}`);
	addCard(PLAYERHAND, PLAYERCARDSDIV);
	updatePlayerTotalDisplay();
	updateAccount(amount).then(() => {
		runDealer();
	});
}
