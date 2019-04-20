
renderLogin();

async function showDealer() {
	await timeout(650);
	let showTopLeft = document.getElementById('top-left-hidden');
	let showBottomRight = document.getElementById('bottom-right-hidden');
	let showCard = document.getElementById('hidden-card');
	showTopLeft.removeAttribute('id');
	showBottomRight.removeAttribute('id');
	showCard.removeAttribute('id');
	showCard.className = 'playing-card';
	let dealerScore = document.getElementById('dealer-score');
	let bjTable = document.getElementById('blackjack-table');
	dealerScore.textContent = accurateTotal(DEALERHAND);
	bjTable.appendChild(dealerScore);
}

function renderLogin() {
	if (sessionStorage.getItem('username')) {
		loginUser(sessionStorage.getItem('username'));
	} else {
		let loginContainer = createHtmlElement('div', '', '', 'login-container')
		let inputGroup = createHtmlElement('form', 'input-group', '', 'input-group-1');
		let loginInput = createHtmlElement('input', '', '', 'login-input');
		let inputGroupAppend = createHtmlElement('div', '', '', '');
		let loginButton = createHtmlElement('input', 'button', 'Login / Sign Up', 'login-button');
		loginButton.type = 'submit'
		loginInput.placeholder = 'Username';
		loginButton.onclick = (event) => signUp(event);
		inputGroupAppend.appendChild(loginButton);
		inputGroup.appendChild(loginInput);
		inputGroup.appendChild(inputGroupAppend);
		loginContainer.appendChild(inputGroup);
		document.getElementById('page').appendChild(loginContainer)
	}
}

function signUp(event) {
	event.preventDefault();
	let loginInput = document.getElementById('login-input').value;
	if (validUsername(loginInput)) {
		document.getElementById('login-container').remove()
		loginUser(loginInput);
	} else {
		alert('Please enter a valid username');
	}

}

function retrieveUserInfo(username) {
	return fetch('https://blueberry-pudding-46059.herokuapp.com/api/v1/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			username: `${username}`
		})
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});
}

function loginUser(username) {
	let bettingActions = createHtmlElement('div', '', '', 'betting-actions')
	document.getElementById('page').appendChild(bettingActions)
	retrieveUserInfo(username).then((userInfo) => {
		sessionStorage.setItem('user', `${userInfo.id}`);
		sessionStorage.setItem('username', `${userInfo.username}`);
		renderBlackJackTable();
		renderUserBar(userInfo);
	});
}

function renderUserBar(userInfo) {
	let usernameDiv = createHtmlElement(
		'div',
		'col-3',
		`${userInfo.username} $${userInfo.balance}`,
		'user-information'
	);
	let logoutButton = createHtmlElement('button', 'col-2 btn btn-dark', 'Logout', 'logout-button');
	let navBar = createHtmlElement('div', '', '', 'nav-bar')
	let winPercentage = createHtmlElement('div', 'col-4', '', 'win-percentage');
	sessionStorage.setItem('balance', `${userInfo.balance}`);

	logoutButton.onclick = logout;

	navBar.appendChild(usernameDiv);
	navBar.appendChild(winPercentage);
	navBar.appendChild(logoutButton);
	document.getElementById('page').appendChild(navBar)
	let handsArray = userInfo.hands;
	updateWinPercentage(handsArray);
	// clearBetActions();
	renderBetCard();
	zeroBalance();
}

function renderBlackJackTable() {
	let mainSection = createHtmlElement('div', '', '', 'main-section');
	TABLE = createHtmlElement('div', 'col-7', '', 'blackjack-table');
	DEALERCARDSDIV = createHtmlElement('div', '', '', 'dealer-cards');
	let divResult = createHtmlElement('div', '', '', 'result');
	// let h1Result = createHtmlElement('h1', '', '', 'result');
	let playerScore = createHtmlElement('div', '', '', 'player-score');
	let dealerScore = createHtmlElement('h1', '', '', 'dealer-score');
	PLAYERCARDSDIV = createHtmlElement('div', '', '', 'player-cards');

	// divResult.appendChild(h1Result);
	TABLE.appendChild(dealerScore);
	TABLE.appendChild(DEALERCARDSDIV);
	TABLE.appendChild(divResult);
	TABLE.appendChild(PLAYERCARDSDIV);
	TABLE.appendChild(playerScore);
	mainSection.appendChild(TABLE);
	mainSection.insertBefore(TABLE, mainSection.firstChild);
	document.getElementById('page').appendChild(mainSection)
}

function logout() {
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('username');
	sessionStorage.removeItem('amount');
	sessionStorage.removeItem('balance');
	clearNavBar();
	renderLogin();
	clearBetActions();
	resetGame();
	TABLE.remove();
}

function clearNavBar() {
	let navBar = document.getElementById('nav-bar');
	while (navBar.firstChild) {
		navBar.firstChild.remove();
	}
}

function updateAccount(amount) {
	let user = sessionStorage.getItem('user');
	let balance = parseInt(sessionStorage.getItem('balance'));
	let newBalance = balance - amount;
	return fetch(`https://blueberry-pudding-46059.herokuapp.com/api/v1/users/${user}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			balance: newBalance
		})
	})
		.then((response) => response.json())
		.then((json) => {
			// let userBalance = document.getElementById('user-balance');
			document.getElementById('user-information').textContent = `${json.username} $${json.balance}`;
			sessionStorage.setItem('balance', `${json.balance}`);
			console.log(json);
			let handsArray = json.hands;
			updateWinPercentage(handsArray);
			return 'account updated';
		});
}

function zeroBalance() {
	if (parseInt(sessionStorage.getItem('balance')) == 0) {
		document.getElementById('result').textContent = 'Please Add More Chips to Continue';
		let addMoreChips = createHtmlElement('button', 'col-2 bg-secondary', 'Add Chips', 'add-chips');
		addMoreChips.onclick = addChips;
		header.appendChild(addMoreChips);
		clearBetActions();
	}
}

function addChips() {
	let user = sessionStorage.getItem('user');
	let newBalance = 1000;

	return fetch(`https://blueberry-pudding-46059.herokuapp.com/api/v1/users/${user}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			balance: newBalance
		})
	})
		.then((response) => response.json())
		.then((json) => {
			let userBalance = document.getElementById('user-balance');
			document.getElementById('user-information').textContent = `${json.username} $${json.balance}`;
			sessionStorage.setItem('balance', `${json.balance}`);
			document.getElementById('add-chips').remove();
			renderBetCard();
			resetGame();
			return 'Account Updated';
		});
}

function updatePlayerTotalDisplay() {
	currentPlayerTotal = accurateTotal(PLAYERHAND);
	document.getElementById('player-score').textContent = currentPlayerTotal;
}

function updateWinPercentage(array) {
	let wins = 0;
	let totalHands = 0;
	if (array.length > 0) {
		for (let i = 0; i < array.length; i++) {
			totalHands++;
			if (array[i].winner == 'Player') {
				wins++;
			}
			if (array[i].winner == 'Push') {
				totalHands--;
			}
		}
		console.log(wins);
		console.log(totalHands);
		document.getElementById('win-percentage').textContent = `Win Percentage ${Math.ceil(wins / totalHands * 100)}%`;
	}
}
