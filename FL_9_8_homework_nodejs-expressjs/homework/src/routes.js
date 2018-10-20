const express = require('express');
const routes = express.Router();
const car = require('./handlers/car');
const del = require('./middlewares/delete-authorization');
const bodyParser = require('body-parser');
let result;

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({
	extended: true
}));

routes.post('/', function (req, res) {
	result = car.newCar(req.body.id, req.body.brand, req.body.model, req.body.engineVolume, req.body.year);
	res.status(result.status).send(result.body);
});

routes.get('/', function (req, res) {
	result = car.getCars();
	res.status(result.status).send(result.body);
});

routes.get('/:id', function (req, res) {
	result = car.getById(req.params.id);
	res.status(result.status).send(result.body);
});
routes.put('/:id', function (req, res) {
	result = car.putById(req.params.id, req.body.brand, req.body.model, req.body.engineVolume, req.body.year);
	res.status(result.status).send(result.body);
});

routes.use('/:id', function (req, res, next) {
	result = del.check(req.headers.authorization);
	if (result) {
		next();
	} else {
		res.status(401).send('Unauthorized');
	}
});

routes.delete('/:id', function (req, res) {
	result = car.delCarById(req.params.id);
	res.status(result.status).send(result.body);
});

module.exports = routes;