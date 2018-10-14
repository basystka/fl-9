//Task 1
const http = {
	get: function(url) {
		return new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.addEventListener('load', function() {
				if (xhr.status < 400) {
					resolve(checkEarth(xhr.responseText));
				} else {
					reject(err(xhr.statusText));
				}
			});
			xhr.addEventListener('error', function() {
				errNetwork();
			});
			xhr.send();
		});
	}
};
//Task 2
let butTrack = document.getElementById('but-track');
let loader = document.getElementById('loader');
let result = document.getElementById('result');
let res = document.getElementById('res');
let warning = document.getElementById('warning');
let resultGet = new Error();

butTrack.addEventListener('click', function() {
	let enterDataLat = document.getElementById('enter-lat').value;
	let enterDataLong = document.getElementById('enter-long').value;
	if (validateData(enterDataLat, enterDataLong)) {  
		hideResult();
		loader.style.display = 'block'; 
		http.get(`https://api.onwater.io/api/v1/results/${enterDataLat},${enterDataLong}`);     
	} else {
		warning.style.display = 'block';
		hideResult();
		setTimeout(function() {
			warning.style.display = 'none';
		}, 3000);
	}
});

function validateData(lat, long) {
	let x = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
	let y = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
	return x.test(lat) && y.test(long);
}

function checkEarth(respon) {
	result.style.display = 'block';
	res.style.display = 'block';
	validateData(JSON.parse(respon));
	hideLoader();
	res.innerHTML = `<ul>
	<li>Lat: ${JSON.parse(respon).lat.toFixed(2)}</li>
	<li>Lon: ${JSON.parse(respon).lon.toFixed(2)}</li>
	<li>Water: ${JSON.parse(respon).water}</li>
	</ul>`;
	let water = JSON.parse(respon).water;
	if (water !== false){
		result.innerHTML = `<img class="water"></img>`;
	} else {
		result.innerHTML = `<img class="land"></img>`;
	}
}

function err(respon) {
	hideLoader();
	resultGet('Request failed: ' + respon);
}
function errNetwork() {
	hideLoader();
	resultGet('Network error');
}
function hideLoader(){
	loader.style.display = 'none';
}
function hideResult(){
	res.style.display = 'none';
	result.style.display = 'none';
}