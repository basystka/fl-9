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
	forEach(arr, elm => {
		if (el(elm)){
			newArr.push(elm);
		}
	});
	return newArr;
};

let getAdultAppleLovers = (data) => {
	let newArr = [];
	for(let i = 0; i < data.length; i++){
		if (data[i].age > 18 && data[i].favoriteFruit === 'apple'){
			newArr.push(data[i].name);
		}
	}	
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
