document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
 	var year, month, date, imageType;
	document.getElementById('submitButton').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var url = "https://epic.gsfc.nasa.gov/api/";
		imageType = document.getElementById("image_type").value;
		url += imageType + "/";
		var desiredDate = document.getElementById("searchDate").value;

		if (desiredDate != '') {
			url += "date/" + desiredDate;
			year = desiredDate.substring(0, 4);
			month = desiredDate.substring(5, 7);
			date = desiredDate.substring(8, 10);
		}
		console.log(url);

		req.open("GET", url, true);
		req.addEventListener('load', function() {
			if (req.status >= 200 && req.status < 400) {
				var response = JSON.parse(req.responseText);
				if (!response.length){
					document.getElementById('result').textContent = "Unfortunately there is no images available on the selected day. Please select another day!";
					// reset the elements
					document.getElementById('pic').src = "images/pic11.jpg"; 
					document.getElementById('caption').textContent = "";
					document.getElementById('date').textContent = "";
				} else {
					var dateURL = year + "/" + month + "/" + date;
					var picUrl = "https://epic.gsfc.nasa.gov/archive/" + imageType + "/" + dateURL + "/png/" + response[0].image + ".png";
					document.getElementById('result').textContent = "There are " + response.length + " images available. Showing only the first image!";
					document.getElementById('caption').textContent = response[0].caption;
					document.getElementById('date').textContent = response[0].date;
					document.getElementById('pic').src = picUrl;
					console.log(picUrl);
					console.log(response);
				}
			} else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send();
		event.preventDefault();
	});
}
