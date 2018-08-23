function reverseNumber(a) {
	let line = String(a);
	line = line.split('');
	if (line[0] === '-') {
		line[0] = '';
		line[line.length] = '-';
	}
	line = Number(line.reverse().join(''));
	return line;
}