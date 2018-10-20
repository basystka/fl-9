let dataset = require('../../db/data');
let car;

function getCars() {
	return {status: 200, message: dataset}
}
function putById(id, brand, model, engineVolume, year) {
	car = dataset.find(function (car) {
		return car.id === Number(id);
	});
	if (car) {
		car.brand = brand;
		car.model = model;
		car.engineVolume = engineVolume;
		car.year = year;
		return {status: 200, body: car};
	} else {
		return {status: 404, body: 'Car with such id has not been found.'};
	}
}
function newCar(id, brand, model, engineVolume, year) {
	let carObj = {
		id: id,
		brand: brand,
		model: model,
		engineVolume: engineVolume,
		year: year
	};
	car = dataset.find(function (car) {
		return car.id === carObj.id;
	});
	if (car) {
		return {status: 409, body: {message: 'Car already exists.'}};
	} else {
		dataset.push(carObj);
		return {status: 201, body: carObj};
	}
}
function getById(id) {
	car = dataset.find(function (car) {
		return car.id === Number(id);
	});
	if (car) {
		return {status: 200, body: car};
	} else {
		return {status: 404, body: 'Car with such id has not been found.'};
	}
}
function delCarById(id) {
	car = dataset.find(function (car) {
		return car.id === Number(id);
	});
	if (car) {
		dataset = dataset.filter(function (cars) {
			return cars.id !== Number(id);
		});
		return {status: 200, body: {message: 'The car has been successfully removed'}};
	} else {
		return {status: 404, body: {message: 'Car with such id has not been found.'}};
	}
}

module.exports = {
	'getCars': getCars,
	'newCar': newCar,
	'putById': putById,
	'getById': getById,
	'delCarById': delCarById
};