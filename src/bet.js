function renderBetCard() {
	let betAmount = 0;

	let card = createHtmlElement('div', 'card text-center', '', 'bet-card');
	let cardHeader = createHtmlElement('div', 'card-header', 'Place a Bet', 'card-header');
	let cardBody = createHtmlElement('div', 'card-body', '', 'card-body');

	let form = createHtmlElement('form', '', '', 'bet-form');
	let row = createHtmlElement('div', 'row', '', '');
	let colBet = createHtmlElement('div', 'col', '', '');
	let betInput = createHtmlElement('input', 'form-control', '', '');
	betInput.type = 'text';
	betInput.placeholder = `${betAmount}`;

	colBet.appendChild(betInput);
	row.appendChild(colBet);
	form.appendChild(row);
	cardBody.appendChild(form);
	card.appendChild(cardHeader);
	card.appendChild(cardBody);
}

// <form>
//   <div class="row">
//     <div class="col">
//       <input type="text" class="form-control" placeholder="First name">
//     </div>
//     <div class="col">
//       <input type="text" class="form-control" placeholder="Last name">
//     </div>
//   </div>
// </form>

// <div class="form-group row">
// <div class="col-sm-10">
//   <button type="submit" class="btn btn-primary">Sign in</button>
// </div>
// </div>

// function createHtmlElement(tag = '', className = '', textContent = '', id = '')

// <div class="card text-center">
//   <div class="card-header">
//     Featured
//   </div>
//   <div class="card-body">
//     <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
//   <div class="card-footer text-muted">
//     2 days ago
//   </div>
// </div>
