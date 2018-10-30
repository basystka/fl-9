import { multiple,divide,plus,minus } from './calculating-module';
import { renderInterface } from './interface-module.js';
import '../styles/styles.css';

renderInterface();

let inputX = document.getElementById('number1');
let inputY = document.getElementById('number2');
let plusBtn = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let multipleBtn = document.getElementById('multiple');
let divideBtn = document.getElementById('divide');
let result = document.getElementById('result');
let res = document.getElementById('reset');

addClick();
clearInputs();

function putNumbers() {
	if (inputX.value.length === 0 || inputY.value.length === 0) {
		return false
	} else {
		return {
			x: Number(inputX.value),
			y: Number(inputY.value)
		}
	}
}

function operations() {
	clearResult();
	let data = putNumbers();
	if (data) {
		switch (this.id) {
			case 'multiple':
				renderText(data, '×')
				render(multiple(data));
				break;
			case 'plus':
				renderText(data, '+')
				render(plus(data));
				break;
			case 'divide':
				if (data.y === 0) {
					render('You can not divide a number by zero!')
				} else {
					renderText(data, '/')
					render(divide(data));
				}
				break;
			case 'minus':
				renderText(data, '−')
				render(minus(data));
				break;
			default:
				0;
		}
	} else {
		render('Please, enter two numbers!')
	}
	clearInputs();
}

function render(res) {
	let span = document.createElement('span');
	span.innerHTML = `${res}`;
	result.appendChild(span);
}

function renderText(obj, str) {
	let text = `${obj.x} ${str} ${obj.y} = `;
	let span = document.createElement('span');
	span.innerHTML = text;
	result.appendChild(span);
}

function clearResult() {
	result.innerHTML = '';
}

function clearInputs() {
	inputX.value = null;
	inputY.value = null;
}

function clearAll() {
	clearInputs();
	clearResult();
}

function addClick() {
	inputX.addEventListener('click', clearResult);
	inputY.addEventListener('click', clearResult);
	res.addEventListener('click', clearAll);
	multipleBtn.addEventListener('click', operations);
	divideBtn.addEventListener('click', operations);
	plusBtn.addEventListener('click', operations);
	minusBtn.addEventListener('click', operations);
}