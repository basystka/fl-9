//Task 1
function assign (object, defaults, options) {
	for (let keyDef in defaults) {
		if (defaults.hasOwnProperty(keyDef)){
			object[keyDef] = defaults[keyDef];
		}
	}
	for (let keyOpt in options) {
		if (options.hasOwnProperty(keyOpt)){
			object[keyOpt] = options[keyOpt];
		}
	}
	return object;
}

//Task 2
function Bot (obj) {
	this.name = obj.name;
	this.speed = obj.speed;
	this.x = obj.x;
	this.y = obj.y;
	this.defSpeed = obj.speed;
}
Bot.prototype.getSpeed = function () {
	return this.speed;
};
Bot.prototype.setSpeed = function (otherSpeed) {
	this.speed = otherSpeed;
};
Bot.prototype.getDefaultSpeed = function () {
	return this.defSpeed;
};
Bot.prototype.getCoordinates = function () {
	return {x: this.x, y: this.y};
};
Bot.prototype.setCoordinates = function (grid) {
	this.x = grid.x;
	this.y = grid.y;
};

Bot.prototype.move = function (move){
	switch (move) {
		case 'up':
			this.y += this.speed;
			break;
		case 'down':
			this.y -= this.speed;
			break;
		case 'left':
			this.x -= this.speed;
			break;
		case 'right':
			this.x += this.speed;
			break;
		default:
		console.log('ERROR: Direction is specified badly');
	}
};

Bot.prototype.showPosition = function () {
	console.log(`I am ${this.constructor.name} '${this.name}'. I am located at ${this.x}:${this.y}.`);
};

const Racebot = function (name, speed, x, y) {
	Bot.call(this, name, speed, x , y);
	this.prevMove = null;
};
Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;
Racebot.prototype.move = function (move) {
	if (this.prevMove === move) {
		this.speed += 1;
	} else {
		this.speed = this.defSpeed;
	}
	this.prevMove = move;
	return Bot.prototype.move.call(this, move);
};

const Speedbot = function (name, speed, x, y) {
	Bot.call(this, name, speed, x , y);
};

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;
Speedbot.prototype.prepareEngine = function () {
	this.speed += 2;
};
Speedbot.prototype.move = function (move) {
	Bot.prototype.move.call(this, move);
	if (this.speed > this.defSpeed){
		this.speed -= 1;
	}
};