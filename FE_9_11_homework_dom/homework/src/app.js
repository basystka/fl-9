const rootNode = document.getElementById('root');
const take = (selector, selectAll = false) => 
	!selectAll ? document.querySelector(selector) : document.querySelectorAll(selector);

const createElement = (tag, attributes = {}, innerTEXT = '') => {
	const el = document.createElement(tag);
			if (Object.keys(attributes).length) {
			for (let key in attributes) {
			if (attributes.hasOwnProperty(key)) {
				el.setAttribute(key, attributes[key]);
			}
		}
	}
	if (innerTEXT) {
		el.appendChild(document.createTextNode(innerTEXT));
	}
	return el;
};

const inputAddTask = take('.add-name');
const addButton = take('.adding');
const tasks = take('.list');
const infoMessage = take('.info');
let counter = 0;
let maxItems = 10;

const itemInList = innerFill => {
	const checkBox = createElement('i', {'class': 'material-icons'}, 'check_box_outline_blank');
	const deleteCan = createElement('i', {'class': 'material-icons'}, 'delete');
	const mark = createElement('span', {}, innerFill);
	const checkButton = createElement('button', {'class': 'checking'});
	const deleteButton = createElement('button', {'class': 'delete-item'});
	const listItem = createElement('li', {'class': 'list_item', 'draggable': true});

	checkButton.appendChild(checkBox);
	checkButton.appendChild(mark);
	deleteButton.appendChild(deleteCan);
	listItem.appendChild(checkButton);
	listItem.appendChild(deleteButton);
	tasks.appendChild(listItem);

	checkButton.onclick = () => {
		checkBox.textContent = 'check_box';
	};
	deleteButton.onclick = () => {
		listItem.remove();
		counter--; 
		inputAddTask.disabled = false;
		infoMessage.style.display = 'none';  
	};
	if (++counter >= maxItems) {
		inputAddTask.disabled = true;
		infoMessage.style.display = 'block';
	}
	inputAddTask.value = '';
	addButton.disabled = true;
};

inputAddTask.onchange = inputAddTask.onkeyup = action => {
	const innerFill = inputAddTask.value.trim();
	addButton.disabled = !innerFill;
	if (action.code === 'Enter' && innerFill) {
		itemInList(innerFill);
	}
};

addButton.onclick = () => {
	itemInList(inputAddTask.value.trim());
};

let dragItem;
tasks.addEventListener('dragstart', ev => {
	dragItem = ev.target;
});
tasks.addEventListener('dragover', ev => {
	ev.preventDefault();
	let rect = ev.target.getBoundingClientRect();
});
tasks.addEventListener('drop', ev => {
	ev.preventDefault();
    if (ev.target.style['border-bottom'] !== '') {
		ev.target.style['border-bottom'] = '';
		tasks.insertBefore(dragItem, ev.target.nextSibling);
    } else {
		ev.target.style['border-top'] = '';
		tasks.insertBefore(dragItem, ev.target.previousSibling);
	}
});