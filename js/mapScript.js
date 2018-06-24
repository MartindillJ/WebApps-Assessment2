// Get today's date
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleDateString();

// Define map
var map = L.map("mapContainer");

getLocation();

// Get user lat and lng 
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		console.log("Geolocation is not supported by this browser.");
	}
}

// Set as map centre
function showPosition(position){
	map.setView([position.coords.latitude, position.coords.longitude], 14);
	L.tileLayer("https://api.mapbox.com/styles/v1/feconicuzn/cjbwmseh4dk192rqycq53sd91/tiles/256/{z}/{x}/{y}?access_token={accessToken}", 
	{
		// Set appropriate zoom, based on the content to be shown
		maxZoom: 16,
		minZoom: 12,
		// Access token for Mapbox
		accessToken: "pk.eyJ1IjoiZmVjb25pY3V6biIsImEiOiJjamJtbDMyYXMxeWVnMnFvYjFuYjU5NGZ0In0.mTdYFV3nkyB3vCyZ8dmayQ",
	}).addTo(map);

	// Create circle for scale
	var circle = L.circle([position.coords.latitude, position.coords.longitude], {
		color: "#343333",
		fillColor: "#FFFF01",
		fillOpacity: 0.3,
		radius: 1300,
	}).addTo(map);

	// Give circle a name
	circle.bindPopup("15–20 min walk");

	// Create another circle
	var circle = L.circle([position.coords.latitude, position.coords.longitude], {
		color: "#343333",
		fillColor: "#FB0700",
		fillOpacity: 0.45,
		radius: 975,
	}).addTo(map);

	// Another name
	circle.bindPopup("<15 min walk");

	// AppID for OpenWeatherMap
	const AppID = "b6907d289e10d714a6e88b30761fae22";

	// Define query
	var APICall = "http://openweathermap.org/data/2.5/weather?lat=" + 51.48 + "&lon=" + 3.17 + "&appid=" + AppID;

	console.log(APICall);

	var xhttp = new XMLHttpRequest();
		xhttp.open("GET", APICall);
		xhttp.addEventListener("load", function(){
			// Parse weather results
			var response = JSON.parse(this.response);
			console.log(response);

			var marker = L.marker([position.coords.latitude, position.coords.longitude]);

			// Create marker with geocoding and weather data embedded
			marker.bindPopup("You are here <br><br><strong> Weather for Cardiff, UK </strong><br>" + response.weather[0].description + "<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='OpenWeatherMap Icon'><br>" + response.main.temp + "&#8451;");
			marker.addTo(map);
		})

		xhttp.send();
}

// APIKey for Google Geocoding API, requested but not necessary
// const APIKey = "AIzaSyDa11H6AKELCU3RZvWzLQrxum0Li75E2c4";

// Define string
var baseURL = "https://maps.googleapis.com/maps/api/geocode/";

var outputFormat = "json";

// Only works if you're in Cardiff 
var loc = " Cardiff";

var params = ["Troutmark Books" + loc, 
	"Wellfield Bookshop" + loc, 
	"Waterstones" + loc, 
	"Oxfam Bookshop" + loc, 
	"Caban" + loc, 
	"The Comic Guru" + loc,
	"Churches Together Book Shop" + loc, 
	"Heath Christian Bookshop" + loc, 
	"Bear Island" + loc, 
	"The Works" + loc, 
	"WHSmith" + loc, 
	"Octavo's Book Cafe and Wine Bar" + loc, 
	"Books Plus" + loc, 
	"Halls Bookshop" + loc, 
	"Super Tomato" + loc, 
	"Camelot Books" + loc, 
	"Sawtul Islam" + loc];

// Define Shops
for(var i = 0; i < params.length; i++){
	let shopName = params[i];

	// Specify location for output
	var outputDiv = document.querySelector("#output");
	var shopButton = document.createElement("button");
	// Style button
	shopButton.setAttribute("class", "btn btn-danger whaamClose");
	// Remove Cardiff from end
	var shopButtonText = document.createTextNode(shopName.slice(0, -8));
	shopButton.appendChild(shopButtonText);
	outputDiv.appendChild(shopButton);

	shopButton.id = shopName;

	// Play random sound effect when clicking on Shop Buttons
	shopButton.addEventListener("click", function(){
		var mySnds = ["soundEffects/bomb.mp3", 
			"soundEffects/car.mp3", 
			"soundEffects/clang.mp3", 
			"soundEffects/fire_engine.mp3", 
			"soundEffects/pat.mp3", 
			"soundEffects/punch.mp3", 
			"soundEffects/reflect.mp3", 
			"soundEffects/slap.mp3", 
			"soundEffects/smashing.mp3", 
			"soundEffects/whack.mp3"]
		var rand = mySnds[Math.floor(Math.random() * mySnds.length)];
		var snd = new Audio(rand);
		snd.play();
		// Always start playing from the beginning 
		snd.currentTime = 0;

		var clickedButton = document.getElementById(shopName);
		console.log(clickedButton);

		var queryURL = baseURL + outputFormat + "?address=" + encodeURIComponent(shopName);

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", queryURL);
		xhttp.addEventListener("load", function(){
			// Parse results shop lat and lng
			var response = JSON.parse(this.response);
			console.log(response);

			processResponse(response);
		})

		xhttp.send();

		// Create marker
		var processResponse = function(response){

			// Define variables
			var address = response.results[0].formatted_address.replace(/, /g, ",<br>");

			var lat = response.results[0].geometry.location.lat;

			var lng = response.results[0].geometry.location.lng;

			// Centre map
			map.setView([lat, lng], 15);

			// Create address
			var popupString = "<strong>" + shopName.replace("Cardiff", " ") + "</strong><br>" + address.replace("United Kingdom", "UK");

			var marker = L.marker([lat, lng]);
			marker.bindPopup(popupString);
			marker.addTo(map);
		}
	})
}