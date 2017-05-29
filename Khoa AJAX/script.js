document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById('submitButton').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var url = "https://api.nasa.gov/planetary/apod?api_key=";
		var appId = "DEMO_KEY";
		url += appId;
		if (document.getElementById("searchDate").value != '') {
			url += "&date=" + document.getElementById("searchDate").value;
		}
		req.open("GET", url, true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				var response = JSON.parse(req.responseText);
				document.getElementById('title').textContent = response.title;
				document.getElementById('date').textContent = response.date;
				document.getElementById('explanation').textContent = response.explanation;
				document.getElementById('pic').src = response.hdurl;
				console.log(response);
			} else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send();
		event.preventDefault();
	});
}
