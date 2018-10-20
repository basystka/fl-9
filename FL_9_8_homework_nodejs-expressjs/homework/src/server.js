const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;

app.use('/car', routes);
app.get('/', function(req, res) {
	res.send('Cars server started!');
});

app.listen(port);