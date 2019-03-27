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

	// let dealerScoreTotal = document.getElementById('dealer-score-hidden');
	// dealerScoreTotal.id = 'dealer-score';
	// dealerScoreTotal.textContent = accurateTotal(DEALERHAND);
}

function renderHeader() {
	let login = createHtmlElement('div', 'col-3 center-text', 'Please Enter Username:', 'username-prompt');
	let loginInput = createHtmlElement('input', 'form-control', '', 'login-input');
	let loginButton = createHtmlElement('button', 'btn btn-secondary mb-2', 'Login', 'login-button');

	loginInput.placeholder = 'username';
}

// let betInput = createHtmlElement('input', 'form-control', '', 'bet-input');
// let dealButton = createHtmlElement('button', 'btn btn-secondary mb-2', 'Deal a Hand', 'deal-button');
// <div id='username' class="col-3 center-text">NAME</div>
// <!-- for merge -->
// <div id='user-balance' class="col-3 text-center"> Balance: $150</div>

function retrieveUserInfo() {
	fetch('URL')
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			console.log(json);
		});
}
