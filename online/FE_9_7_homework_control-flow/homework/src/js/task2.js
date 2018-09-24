let number, userNumber, prize, currentPrize, arrayOfPrize, state;
prize = 0;
let maxPrize = 10;
let maxNumber = 5;
arrayOfPrize = [Math.floor(maxPrize), Math.floor(maxPrize / 2), Math.floor(maxPrize / 4)];
let pattern = (maxNumber, i, prize, arrayOfPrize) => `
Enter a number from 0 to ${maxNumber}
Attempts left: ${i}
Total prize: ${prize}$
Possible prize on current attempt: ${arrayOfPrize}$
`;
let game = confirm('Do you want to play a game?');
if (game) {
	while (game) {
		let j = 1;
		number = Math.floor(Math.random() * (maxNumber + j));
	for (let i = 0; i < 3; i++) {
		userNumber = prompt(pattern(maxNumber, i, prize, arrayOfPrize[i]));
		if (userNumber === null) {
			break;
		}else if (+userNumber === number) {
			prize = prize + arrayOfPrize[i];
			currentPrize = arrayOfPrize[i];
			maxPrize = 3 * maxPrize;
			arrayOfPrize = [Math.floor(maxPrize), Math.floor(maxPrize / 2), Math.floor(maxPrize / 4)];
			maxNumber = maxNumber * 2;
			state = 'Congratulation';
			break;
		} else {
			state = '';
		}
	} if (state) {
		game = confirm('Congratulation! Your prize is: ' + currentPrize + '$' + '\nDo you want to continue?');
		if (!game) {
			alert('Thank you for a game. Your prize is ' + prize + '$');
			game = confirm('Do you want to play again?');
		}
	} else {
			prize = 0;
			let k = 10;
			maxPrize = k;
			let g = 5;
			maxNumber = g;
			arrayOfPrize = [Math.floor(maxPrize), Math.floor(maxPrize / 2), Math.floor(maxPrize / 4)];
			alert('Thank you for a game. Your prize is ' + prize + '$');
			game = confirm('Do you want to play again?');
		}
	}
} else {
	alert('You did not become a millionaire, but can')
}