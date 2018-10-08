function* factorial (n) {
	var res = 1;
	for (var i = 1; i <= n; i++) {
		res *= i;
		yield res;
	}
}	

for (var n of factorial(5)) {
	console.log(n)
}