let TABLE = document.getElementById('blackjack-table');
let DEALERCARDSDIV = document.getElementById('dealer-cards');
let PLAYERCARDSDIV = document.getElementById('player-cards');
let BETTINGACTIONS = document.getElementById('betting-actions');
renderBetCard();
renderHeader();

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

function renderHeader() {
	let header = document.getElementById('header');

	let loginInput = createHtmlElement('input', 'col-2 form-control', '', 'login-input');
	let blankColumn = createHtmlElement('div', 'col-1', '', '');
	let loginButton = createHtmlElement('button', 'col-1 btn btn-secondary mb-2', 'Login', 'login-button');

	loginInput.placeholder = 'username';

	loginButton.onclick = retrieveUserInfo;

	header.appendChild(loginInput);
	header.appendChild(blankColumn);
	header.appendChild(loginButton);
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

function retrieveUserInfo() {
	let loginInput = document.getElementById('login-input').value;
	if (validUsername(loginInput)) {
		fetch('http://localhost:3000/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				username: `${loginInput}`
			})
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				// loginUser(json);
			});
	} else {
		alert('Please enter a valid username');
	}
}

// function loginUser(json) {
// 	document.cookie = `user=${userID}`;
// 	renderUserBar(){}
// }

// function renderUserbar() {

// }
