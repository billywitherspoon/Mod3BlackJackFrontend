let TABLE = document.getElementById('blackjack-table');
let DEALERCARDSDIV = document.getElementById('dealer-cards');
let PLAYERCARDSDIV = document.getElementById('player-cards');
let BETTINGACTIONS = document.getElementById('betting-actions');
renderBetCard();
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
	//for git
}

// <div class="col-3 center-text">NAME</div>
// <!-- for merge -->
// <div class="col-3 text-center"> Balance: $150</div>

// let betInput = createHtmlElement('input', 'form-control', '', 'bet-input');
// let dealButton = createHtmlElement('button', 'btn btn-secondary mb-2', 'Deal a Hand', 'deal-button');
// <div id='username' class="col-3 center-text">NAME</div>
// <!-- for merge -->
// <div id='user-balance' class="col-3 text-center"> Balance: $150</div>

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
	let usernameDiv = createHtmlElement('div', 'col-2 bg-primary', `${userInfo.username} `, 'username');
	let balanceSpan = createHtmlElement('span', 'badge badge-danger', `$ ${userInfo.balance}`, 'user-id');
	let logOutButton = createHtmlElement('button', 'col-1 btn btn-secondary mb-2', 'Logout', 'logout-button');

	logOutButton.onclick = logOut;

	usernameDiv.appendChild(balanceSpan);
	header.appendChild(usernameDiv);
	header.appendChild(logOutButton);
}

function logOut() {
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('username');
	renderLogin();
}

function clearHeader() {
	let header = document.getElementById('header');
	while (header.firstChild) {
		header.firstChild.remove();
	}
}

// let loginInput = createHtmlElement('input', 'col-2 form-control', '', 'login-input');
// 	let loginButton = createHtmlElement('button', 'col-1 btn btn-secondary mb-2', 'Login', 'login-button');

// 	loginInput.placeholder = 'username';

// 	loginButton.onclick = retrieveUserInfo;

// 	header.appendChild(loginInput);
// 	header.appendChild(loginButton);
