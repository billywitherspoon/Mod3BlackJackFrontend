let TABLE = document.getElementById('blackjack-table');
let DEALERCARDSDIV = document.getElementById('dealer-cards');
let PLAYERCARDSDIV = document.getElementById('player-cards');
let BETTINGACTIONS = document.getElementById('betting-actions');
renderLogin();

function showDealer() {
	let showTopLeft = document.getElementById('top-left-hidden');
	let showBottomRight = document.getElementById('bottom-right-hidden');
	let showCard = document.getElementById('hidden-card');
	showTopLeft.removeAttribute('id');
	showBottomRight.removeAttribute('id');
	showCard.removeAttribute('id');
	showCard.className = 'playing-card';
	let dealerScore = createHtmlElement('h1', '', '', 'dealer-score');
	let bjTable = document.getElementById('blackjack-table');
	dealerScore.textContent = accurateTotal(DEALERHAND);
	bjTable.appendChild(dealerScore);
}

function renderLogin() {
	clearHeader();
	if (sessionStorage.getItem('username')) {
		retrieveUserInfo(sessionStorage.getItem('username'));
	} else {
		let header = document.getElementById('header');

		let loginInput = createHtmlElement('input', 'col-2 form-control', '', 'login-input');
		let blankColumn = createHtmlElement('div', 'col-1', '', '');
		let loginButton = createHtmlElement('button', 'col-1 btn btn-secondary mb-2', 'Login', 'login-button');

		loginInput.placeholder = 'username';

		loginButton.onclick = signUp;

		header.appendChild(loginInput);
		header.appendChild(blankColumn);
		header.appendChild(loginButton);
	}
}

function signUp() {
	let loginInput = document.getElementById('login-input').value;
	if (validUsername(loginInput)) {
		retrieveUserInfo(loginInput);
	} else {
		alert('Please enter a valid username');
	}
}

function retrieveUserInfo(username) {
	fetch('http://localhost:3000/api/v1/users', {
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
			loginUser(json);
		});
}

function loginUser(userInfo) {
	sessionStorage.setItem('user', `${userInfo.id}`);
	sessionStorage.setItem('username', `${userInfo.username}`);
	renderUserBar(userInfo);
}

function renderUserBar(userInfo) {
	clearHeader();
	let usernameDiv = createHtmlElement('div', 'col-2 bg-secondary', `${userInfo.username} `, 'username');
	let balanceSpan = createHtmlElement('span', 'badge badge-danger', `$ ${userInfo.balance}`, 'user-balance');
	sessionStorage.setItem('balance', `${userInfo.balance}`);

	let logoutButton = createHtmlElement('button', 'col-1 btn btn-danger mb-2', 'Logout', 'logout-button');

	logoutButton.onclick = logout;

	usernameDiv.appendChild(balanceSpan);
	header.appendChild(usernameDiv);
	header.appendChild(logoutButton);
	renderBetCard();
	zeroBalance();
}

function logout() {
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('username');
	sessionStorage.removeItem('amount');
	renderLogin();
	while (BETTINGACTIONS.firstChild) {
		BETTINGACTIONS.firstChild.remove();
	}
	while (DEALERCARDSDIV.firstChild) {
		DEALERCARDSDIV.firstChild.remove();
	}
	while (PLAYERCARDSDIV.firstChild) {
		PLAYERCARDSDIV.firstChild.remove();
	}
	document.getElementById('player-score').textContent = '';
	document.getElementById('dealer-score').textContent = '';
}

function clearHeader() {
	let header = document.getElementById('header');
	while (header.firstChild) {
		header.firstChild.remove();
	}
}

function updateAccount(amount) {
	let user = sessionStorage.getItem('user');
	let balance = parseInt(sessionStorage.getItem('balance'));
	let newBalance = balance - amount;
	return fetch(`http://localhost:3000/api/v1/users/${user}`, {
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
			console.log(json);
			let userBalance = document.getElementById('user-balance');
			userBalance.textContent = `$ ${json.balance}`;
			sessionStorage.setItem('balance', `${json.balance}`);
			return 'account updated';
		});

	// .catch(alert('Server Error'));
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

	return fetch(`http://localhost:3000/api/v1/users/${user}`, {
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
			console.log('added chips!');
			console.log(json);
			let userBalance = document.getElementById('user-balance');
			userBalance.textContent = `$ ${json.balance}`;
			sessionStorage.setItem('balance', `${json.balance}`);
			renderBetCard();
			resetGame();
			return 'Account Updated';
		});
}

function updatePlayerTotalDisplay() {
	currentPlayerTotal = accurateTotal(PLAYERHAND);
	document.getElementById('player-score').textContent = currentPlayerTotal;
}
