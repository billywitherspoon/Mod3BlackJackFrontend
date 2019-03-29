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
		let inputGroup = createHtmlElement('div', 'input-group mb-3 col-3', '', 'input-group-1');
		let loginInput = createHtmlElement('input', 'form-control col-12', '', 'login-input');
		let inputGroupAppend = createHtmlElement('div', 'input-group-append', '', 'input-group-append');
		let loginButton = createHtmlElement('button', 'btn btn-danger', 'Login / Sign Up', 'login-button');
		loginInput.placeholder = 'Username';

		loginButton.onclick = signUp;

		inputGroupAppend.appendChild(loginButton);
		inputGroup.appendChild(loginInput);
		inputGroup.appendChild(inputGroupAppend);
		header.appendChild(inputGroup);
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
	renderBlackJackTable();
	renderUserBar(userInfo);
}

function renderUserBar(userInfo) {
	clearHeader();
	// let usernameDiv = createHtmlElement('div', 'col-1', `${userInfo.username}`, 'username');
	let usernameDiv = createHtmlElement('div', 'col-2', `${userInfo.username}$${userInfo.balance}`, 'user-information');
	let logoutButton = createHtmlElement('button', 'col-2 btn btn-dark', 'Logout', 'logout-button');
	let winPercentage = createHtmlElement('div', 'col-3', 'Win Percentage', 'win-percentage');
	let blankCol = createHtmlElement('div', 'col-2');

	sessionStorage.setItem('balance', `${userInfo.balance}`);

	logoutButton.onclick = logout;

	header.appendChild(usernameDiv);
	header.appendChild(blankCol)
	header.appendChild(winPercentage)
	header.appendChild(logoutButton);

	renderBetCard();
	zeroBalance();
}

function renderBlackJackTable() {
	let mainSection = document.getElementById('main-section');
	TABLE = createHtmlElement('div', 'col-7', '', 'blackjack-table');
	DEALERCARDSDIV = createHtmlElement('div', '', '', 'dealer-cards');
	let divResult = createHtmlElement('div', '', '', 'result');
	let h1Result = createHtmlElement('h1', '', '', 'result');
	let h1PlayerScore = createHtmlElement('h1', '', '', 'player-score');
	PLAYERCARDSDIV = createHtmlElement('div', '', '', 'player-cards');

	divResult.appendChild(h1Result);
	TABLE.appendChild(DEALERCARDSDIV);
	TABLE.appendChild(divResult);
	TABLE.appendChild(h1PlayerScore);
	TABLE.appendChild(PLAYERCARDSDIV);
	mainSection.appendChild(TABLE);
	mainSection.insertBefore(TABLE, mainSection.firstChild);
}

function logout() {
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('username');
	sessionStorage.removeItem('amount');
	sessionStorage.removeItem('balance');
	renderLogin();
	clearBetActions();
	resetGame();
	TABLE.remove();
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
	let handsArray;
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
			let userBalance = document.getElementById('user-balance');
			document.getElementById('user-information').textContent = `${json.username}$${json.balance}`;
			sessionStorage.setItem('balance', `${json.balance}`);
			console.log(json)
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
			let userBalance = document.getElementById('user-balance');
			document.getElementById('user-information').textContent = `${json.username}$${json.balance}`;
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

function updateWinPercentage(array){
	let wins = 0
	let totalHands = 0
	if (array.length > 0){
	for (let i = 0; i < array.length; i++){
		totalHands++
		if (array[i].winner == 'Player'){
			wins++
		}
		if (array[i].winner == 'Push'){
			totalHands--
		}
	}
	console.log(wins)
	console.log(totalHands)
	document.getElementById('win-percentage').textContent = `Win Percentage ${Math.ceil((wins/totalHands) * 100)}%`
}
}
