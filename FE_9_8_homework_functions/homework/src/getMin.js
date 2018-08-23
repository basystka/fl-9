function getMin(){
	let x = arguments[0];
	for (let i = 0; i < arguments.length; i++) {
		if (arguments[i] < x) {
			x = arguments[i];
		}
	}
	return x;
}