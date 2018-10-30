function renderInp() {
	let root = document.getElementById('root');
	let title = document.createElement('h1');
	title.innerText = 'Web Calculator';
	root.appendChild(title);
	let labelX = document.createElement('label');
	labelX.innerText = 'Number 1:';
	root.appendChild(labelX);
	let inputX = document.createElement('input');
	inputX.setAttribute('type', 'number');
	inputX.id = 'number1';
	root.appendChild(inputX);
	let labelY = document.createElement('label');
	labelY.innerText = 'Number 2:';
	root.appendChild(labelY);
	let inputY = document.createElement('input');
	inputY.setAttribute('type', 'number');
	inputY.id = 'number2';
	root.appendChild(inputY);
}

function renderBtn() {
	let root = document.getElementById('root');
	let arr = [{
			id: 'plus',
			value: '+'
		},
		{
			id: 'minus',
			value: '−'
		},
		{
			id: 'multiple',
			value: '×'
		},
		{
			id: 'divide',
			value: '/'
		},
		{
			id: 'reset',
			value: 'CE'
		}
	];
	arr.forEach(function(el) {
		let button = document.createElement('input');
		button.id = el.id;
		button.setAttribute('type', 'button');
		button.value = el.value;
		root.appendChild(button);
	})
}

function renderRes() {
	let root = document.getElementById('root');
	let res = document.createElement('div');
	res.id = 'result';
	root.appendChild(res);

}

export function renderInterface() {
	renderInp();
	renderBtn();
	renderRes();
}