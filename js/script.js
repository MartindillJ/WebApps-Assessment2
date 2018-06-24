// Gets today's date
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleDateString();

// API Key for Google Books
const APIKey = "AIzaSyCGhJS9z8hgH2rD8DHBxeUhts12I0REsZs";

var processResponse = function(response){
	// Specify location for output
	var outputDiv = document.querySelector("#output");
	var books = response.items;

	// Create linebreak first, to seperate search results
	var lineBreak = document.createElement("br");
	outputDiv.appendChild(lineBreak);

	// Heading = last searchTerm
	var heading = document.createElement("h3");
	heading.setAttribute("class", "text-primary");
	var headingText = document.createTextNode(searchTerm.value);
	heading.appendChild(headingText);
	outputDiv.appendChild(heading);

	// Seperates the searchTerm from searchTerm results
	var horizontalRule = document.createElement("hr");
	outputDiv.appendChild(horizontalRule);

	// Define variables
	for(var i = 0; i < books.length; i++){
		let title = books[i].volumeInfo.title;

		var publisher = books[i].volumeInfo.publisher;
		var date = books[i].volumeInfo.publishedDate;

		let paragraph = document.createElement("p");

		if (books[i].volumeInfo.imageLinks != undefined){
			let image = books[i].volumeInfo.imageLinks.thumbnail;

			// Define hover function in JS
			paragraph.addEventListener("mouseover", mouseOver);
			paragraph.addEventListener("mouseout", mouseOut);

			// Create thumbnail
			var thumbnail = document.createElement("img");
			thumbnail.setAttribute("class", "gone");

			// var description = document.createElement("p");

			function mouseOver(){
				// paragraph.setAttribute("class", "info text-info");

				// Set image src
				thumbnail.setAttribute("src", image);
				thumbnail.setAttribute("class", "fixed");

				// description.setAttribute("class", "fix");
			}

			function mouseOut(){
				// paragraph.setAttribute("class", "default text-default");

				thumbnail.setAttribute("class", "gone");

				// description.setAttribute("class", "gone");
			}

			outputDiv.appendChild(thumbnail);
		}
		// let desc = books[i].volumeInfo.description;

		// Removes undefined publishers (approx. 21 in 250)
		// Not doing this for publish date (as only approx. 1 in 250)
		if(publisher === undefined){
			var paragraphText = document.createTextNode(i+1 + ". " + title + ", " + date);
			} else {
			var paragraphText = document.createTextNode(i+1 + ". " + title + ", " + publisher + ", " + date);
		}

		paragraph.appendChild(paragraphText);
		paragraph.id = title;

		// var descriptionText = document.createTextNode(desc);

		// Creates a purchase link
		paragraph.addEventListener("click", function(){
			var clickedParagraph = document. getElementById(title);
			console.log(clickedParagraph);

			function openInNewTab(title) {
				var win = window.open("https://www.amazon.co.uk/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=" + encodeURIComponent(title), '_blank');
				win.focus();
			}

			openInNewTab(title);
		})

		// Changes font, in keeping with the theme
		paragraph.addEventListener("mouseover", mouseOverP);
		paragraph.addEventListener("mouseout", mouseOutP);

		// var description = document.createElement("p");

		function mouseOverP(){
			paragraph.setAttribute("class", "whaam");

			// description.setAttribute("class", "fix");
		}

		function mouseOutP(){
			paragraph.setAttribute("class", "default text-default");

			// description.setAttribute("class", "gone");
		}

		// description.appendChild(descriptionText);

		// Put results in output div
		outputDiv.appendChild(paragraph);
	}

	// outputDiv.appendChild(description);
}

var assembleQuery = function(parameters){
	var queryStrings = [];

	for(var key in parameters){
		if(parameters.hasOwnProperty(key)){

			// Define string
			var paramString = encodeURIComponent(key) + "=" + "inauthor:" + encodeURIComponent(parameters[key]);
			queryStrings.push(paramString);
		}
	}

	return queryStrings.join("&");
}

var doSearch = function(searchTerm){
	var baseURL = "https://www.googleapis.com/books/v1/volumes"

	var params = {
		q: searchTerm
	}

	// Define query string
	var queryURL = baseURL + "?" + assembleQuery(params) + "&maxResults=25" + "&key=" + APIKey;

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", queryURL);
	xhttp.addEventListener("load", function(){
		// Parse results
		var response = JSON.parse(this.response);
		console.log(response);

		processResponse(response);
	})

	xhttp.send();
}

// Play random sound effect when clicking on the search button
var searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", function(){
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

	var searchTerm = document.querySelector("#searchTerm").value;
	console.log(searchTerm);
	doSearch(searchTerm);
})