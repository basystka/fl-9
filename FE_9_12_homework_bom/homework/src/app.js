const rootNode = document.getElementById('root');
let todoItems = [];

const addingEl = (tag, attributes = {}, inputText = '') => {
	const el = document.createElement(tag);
		if (Object.keys(attributes).length) {
			for (let key in attributes) {
				if (attributes.hasOwnProperty(key)) {
				el.setAttribute(key, attributes[key]);
			}
		}
	}
	if (inputText) {
		el.appendChild(document.createTextNode(inputText));
	}
	return el;
};

const patern = {
	main(todoItems) {
		const header = addingEl('h1', {}, 'Simple TODO application');
		const addingBtn = addingEl('button', {'id': 'add_task'}, 'Add new task');
		const todoList = addingEl('ul', {'id': 'list'});
		const info = addingEl('p', {'class': 'info'}, 'TODO is empty');

		addingBtn.onclick = () => {
		window.location.hash = '/add';
	};
	rootNode.appendChild(header);
	rootNode.appendChild(addingBtn);
	rootNode.appendChild(todoList);
	rootNode.appendChild(info);

	if (todoItems.length) {
		for (let item of todoItems) {
			const li = addingEl('li', {'id': item.id});
			const checkbox = addingEl('button', {
			'class': item.isDone ? 'check_done' : 'check_not_done'
		});
		const todoText = addingEl('button', {
		'class': 'input_text'
		}, item.description);
		const deleteItem = addingEl('button', {'class': 'delete_item'});

		checkbox.onclick = () => {
			if (checkbox.className === 'check_not_done') {
				checkbox.className = 'check_done';
				addStorageInfo.putDoneId(item.id);
				todoList.appendChild(li);
			}
		};

		todoText.onclick = () => {
			window.location.hash = `/modify/${item.id}`;
		};

		deleteItem.onclick = () => {
			li.remove();
			addStorageInfo.deletedId(item.id);
		};
		li.appendChild(checkbox);
		li.appendChild(todoText);
		li.appendChild(deleteItem);
		todoList.appendChild(li);
		}
	}
		return rootNode;
	},

	addNewTask() {
		const rootNode = addingEl('div', {'id': 'adding'});
		const header = addingEl('h1', {}, 'Add task');
		const input = addingEl('input', {
			'type': 'text',
			'placeholder': 'Task description'
		});
		const bothBtns = addingEl('div', {'class': 'btns'});
		const cancel = addingEl('button', {}, 'Cancel');
		const save = addingEl('button', {'class': 'save_button', 'disabled': 'true'}, 'Save changes');

		input.onchange = input.onkeyup = () => {
		const description = input.value.trim();

		save.disabled = !description;
			if (event.code === 'Enter' && description) {
			save.click();
		}
	};

	cancel.onclick = () => {
		window.location.hash = '/main';
	};

	save.onclick = () => {
		addStorageInfo.addNewTask(input.value.trim());
		window.location.hash = '/main';
	};
		bothBtns.appendChild(cancel);
		bothBtns.appendChild(save);
		rootNode.appendChild(header);
		rootNode.appendChild(input);
		rootNode.appendChild(bothBtns);
		return rootNode;
	},

	modify(item) {
		const rootNode = this.addNewTask();
		rootNode.id = 'change_text';
		rootNode.querySelector('h1').textContent = 'Modify item';
		rootNode.querySelector('input').value = item.description;
		rootNode.querySelector('.save_button').onclick = () => {
		addStorageInfo.rewritedProfile(item.id, rootNode.querySelector('input').value.trim());
		window.location.hash = '/main';
	};
		return rootNode;
	}
};

const path = {
	refresh() {
	const hash = window.location.hash;

		if (hash.endsWith('/add')) {
			this.addNewTask();
		} else if ((/\/modify\/item-\d+$/).test(hash)) {
			const id = hash.slice(hash.lastIndexOf('/') + 1);
			this.modify(id);
		} else {   
			this.main();
		}
	},

	main() {
		window.history.pushState('', '/', window.location.pathname);
		document.title = 'Main page';
		rootNode.innerHTML = '';
		patern.main(todoItems);
	},
	addNewTask() {
		document.title = 'Add new task';

		rootNode.innerHTML = '';
		rootNode.appendChild(patern.addNewTask());
	},
	modify(id) {
		const item = addStorageInfo.takeById(id);
		document.title = `Modify ${item.description}`;
		rootNode.innerHTML = '';
		rootNode.appendChild(patern.modify(item));
	}
};

const addStorageInfo = {
	addNewTask(description) {
		const id = 'item-' + +new Date();
		const item = {isDone: false, id, description};
		todoItems.push(item);
		localStorage.setItem('todoItems', JSON.stringify(todoItems));
		return todoItems;
	},
	takeAll() {
		return JSON.parse(localStorage.getItem('todoItems'));
	},
	takeById(id) {
		return this.takeAll().find(item => item.id === id);
	},
	putCheck() {
		return this.putNotDone().concat(this.putDone());
	},
	putDone() {
		return this.takeAll().filter(item => item.isDone === true);
	},
	putNotDone() {
		return this.takeAll().filter(item => item.isDone === false);
	},
	putDoneId(id) {
		const rewritedList = this.takeAll().map(item => {
		if (item.id === id) {
			item.isDone = true;
		}
		return item;
	});
		localStorage.setItem('todoItems', JSON.stringify(rewritedList));
		return todoItems;
	},
	deletedId(id) {
		const rewritedList = this.takeAll().filter(item => item.id !== id);
		localStorage.setItem('todoItems', JSON.stringify(rewritedList));
		return todoItems;
	},
	rewritedProfile(id, description) {
		const rewritedList = this.takeAll().map(item => {
		if (item.id === id) {
			item.description = description;
		}
		return item;
	});
		localStorage.setItem('todoItems', JSON.stringify(rewritedList));
		return todoItems;
	}
};

window.onload = window.onhashchange = () => {
	if (localStorage.getItem('todoItems')) {
		todoItems = addStorageInfo.putCheck();
	}
	path.refresh();
};