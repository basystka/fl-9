const userName = prompt('Put your login');
if (userName ==='' || userName === null){
	alert('Canceled');
}else if (userName === 'User'){
	const password = prompt('Enter a password');
		if (password === 'SuperUser' && new Date().getHours() < 20 ){
			alert('Good day');
		}else if (password === 'SuperUser' && new Date().getHours() > 20){
			alert('Good evening');
		}else if (password === '' || password === null){
			alert('Canceled');
		}else{
			alert('Wrong password');
		}
}else if (userName.length < 4) {
	alert(`I don't know any users having name length less than 4 symbols`);
}else{
    alert(`I don’t know you`);
}