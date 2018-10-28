class Store {
	constructor(pizzaSlicePrice, weekendDiscount, nightDiscount, bonus) {
		this.pizzaSlicePrice = pizzaSlicePrice || 75;
		this.weekendDiscount = weekendDiscount;
		this.nightDiscount = nightDiscount;
		this.bonus = bonus || 0;
	}
	price() {
		return this.pizzaSlicePrice - this.weekendDiscount - this.nightDiscount;
	}
	buyPizzaSlice() {
		return `Price after discount is ${this.price()} and you have ${this.bonus} bonuses`;
	}
}
const setBonus = () => {
	return function () {
		this.bonus += Math.floor(this.price() / 10);
	};
};
const getDiscount = () => {
	return function () {
		let date = new Date();
		date.getDay() === 0 || date.getDay() === 6 ? this.weekendDiscount = 10 : this.weekendDiscount = 0;
		date.getHours() === 23 || date.getHours() <= 6 ? this.nightDiscount = 10 : this.nightDiscount = 0;
		this.price();
	};
};

let alien = new Store();
alien.getDiscount = getDiscount();
alien.setBonus = setBonus();
alien.getDiscount();
alien.setBonus();
console.log(alien.weekendDiscount);
console.log(alien.nightDiscount);
let cat = new Store(100, 0, 0, 0);
cat.getDiscount = getDiscount();
cat.setBonus = setBonus();
cat.getDiscount();
cat.setBonus();
console.log(alien.buyPizzaSlice());
console.log(cat.buyPizzaSlice());