let findType = (x) => { 
	return typeof x; 
};

let forEach = (arr, el) => {
	for(let i = 0; i < arr.length; i++) {
		el(arr[i]);
	}
};

let map = (arr, el) => {
	let newArr = [];
	forEach(arr, elm => {
		newArr.push(el(elm));
	});
	return newArr;
};

let filter = (arr, el) => {
	let newArr = [];
	let filtered = (elm) => {
		if (el(elm)){
			newArr.push(elm);
		}
	}
	forEach(arr, filtered);
	return newArr;
};

let getAdultAppleLovers = (data) => {
	let newArr = [];	
	let filter = (el) => {
		if (el.age > 18 && el.favoriteFruit === 'apple'){
			newArr.push(el.name);
		}
	}
	map(data, filter);
	return newArr;
};

let keys = (obj) => {
	let newArr = [];
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			newArr.push(key);
		}
	}
	return newArr;
};

let values = (obj) => {
	let newArr = [];
	for(let prop in obj){
		if(obj.hasOwnProperty(prop)){
			newArr.push(obj[prop]);
		}
	}
	return newArr;
};

let showFormattedDate = (date) => {
	let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let mon = month[date.getMonth()];
	let day = date.getDate();
	let year = date.getFullYear();
	return `It is ${day} of ${mon}, ${year}`;
};
