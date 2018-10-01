function ShoppingCart (obj) {
	this.name = obj.name;
	this.owner = obj.owner;
	this.maxCount = obj.maxCount;
	let products = [];
	let dateOfAddingToCart = [];
	let _logs = '';
	_logs = `${this.name} was created in ${new Date()}`;

	this.addNewProduct = function(prod){
		if (prod instanceof Product) {
			if (products.length > this.maxCount) {
				this.removeProduct(lowestPrice());
			}
			products.push(prod);
		}
		dateOfAddingToCart.push(new Date());
		_logs = _logs + `${prod.name} was added to ${this.name} on ${new Date()}\n`;
		return this;
	};

	this.removeProduct = function(prod){
		products.splice(prod, 1);
		dateOfAddingToCart.splice(prod, 1);
		_logs = _logs + `${prod.name} was removed to ${this.name} on ${new Date()}\n`;
		return this;
	};
  
	function lowestPrice(){
		let prod = 0;
		let min = products[0].getPrice();
			for (let i = 0; i < products.length; i++){
				if (products[i].getPrice() < min){
				prod = i;
				min = products[i].getPrice();
			}
		}
		return prod;
	}

	this.getAvaragePrice = function(){
		return +(this.getTotalPrice() / products.length);
	};

	this.getProducts = function(){
		return products;
	};
  
	this.getFormattedListOfProducts = function () {
		let formattedListOfProd = [];
		for (let i = 0; i < products.length; i++) {
			formattedListOfProd.push(`${products[i].name} - is on ${this.name} from ${dateOfAddingToCart[i]}. 
			Detailed product description: ${JSON.stringify(products[i].description)}`);
		}
		return formattedListOfProd;
	};

	this.getTotalPrice = function(){
		let totalPrice = products.reduce((x, curr) => x + curr.price, 0);
		return totalPrice;
	};

	this.getHistoryLog = function(){
		return _logs;
	};
}

function Product (obj) {
	this.name = obj.name;
	this.description = obj.description;
	this.price = obj.price;
	let products = [];
	let cartOwner = '';
	let _logs = '';

	this.getPrice = function(){
		_logs = _logs + ``
		return this.price;
	};

	this.setPrice = function(secondPrice){
		if (secondPrice > this.price){
			_logs = _logs + `change ${this.price} to ${secondPrice}`;
			this.price = +secondPrice;
		}
		return this;
	};

	this.add = function(name){
		cartOwner = name;
		_logs = _logs + `${this.name} is added to ${cartOwner} on ${new Date()}`;
		return this;
	};

	this.removeProduct = function(prod){
		_logs = _logs + `${products[prod].name} was removed from ${this.name} on ${new Date()}\n`;
		products.splice(prod, 1);
		return this;
	};

	this.getHistoryLog = function(){
		return _logs;
	};
}

const banana = new Product({
name:'banana',
description: {
color:'yellow',
size:'medium'
  },
price:45
});

const apple=new Product({
name:'apple',
description: {
color:'red',
size:'small'
  },
price:30
});
const avocado = new Product({
  name: 'avocado',
  description: 'red',
  price: 60
});

const stevesShopCart = new ShoppingCart({
name:'stevesCart',
owner:'Steve',
maxSize:5
});

stevesShopCart
.addNewProduct(banana)
.addNewProduct(banana)
.addNewProduct(apple)
.removeProduct(banana)
.addNewProduct(avocado);

console.log(stevesShopCart.getHistoryLog());

console.log(banana.getHistoryLog());

console.log('avarage price:', stevesShopCart.getAvaragePrice());
console.log('total price:', stevesShopCart.getTotalPrice());

avocado
  .setPrice(20)
  .setPrice(100);

console.log(avocado.getHistoryLog());

console.table(stevesShopCart.getFormattedListOfProducts());