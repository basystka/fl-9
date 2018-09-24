function userCard(key) {
	let balance = 100;
	let transactionLimit = 100;
	let historyLogs = [];
	let amount;
	let taxes = 0.005; 
	let transformedDate = new Date().toLocaleString('en-GB');
	return { 
		getCardOptions() {
			return {balance, transactionLimit, historyLogs, key};
		},
		putCredits(amount) {
			balance += amount;
			historyLogs.push({operationType: 'Received credits', 
			credits: amount,
			operationTime: transformedDate});      
		},
		takeCredits(amount) {
			if (balance >= amount && transactionLimit >= amount){
				balance -= amount;
				historyLogs.push({operationType: 'Withdrawal of credits', 
				credits: amount,
				operationTime: transformedDate});
			} else {
				console.log('Your balance or transaction limits are invalid');
			}
		},
		setTransactionLimit(amount) {
			transactionLimit = amount;
			historyLogs.push({operationType: 'Transaction limit change', 
			credits: amount,
			operationTime: transformedDate});
		},
		transferCredits(amount, card) {
			let transfer = taxes * amount + amount;
			if (transfer > balance && transfer > transactionLimit){
				console.log('ERROR: Your balance or transaction limit of credits are invalid');
			} else {
				this.takeCredits(transfer);
				card.putCredits(amount);
			}
		}
	};	
}
class UserAccount {
	constructor(name) {
		this.name = name;
		this.cards = [];
		this.cardsLimit = 3;
	}
	addCard() {
		if (this.cards.length < this.cardsLimit) {
			this.cards.push(userCard(this.cards.length + 1));
		} else {
			console.log('ERROR: limit of cards are overfull');
		}
	}
	getCardByKey(key) {
		return this.cards[key - 1];
	}
}