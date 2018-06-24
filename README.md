# WebApps-Assessment2

A website is a collection of organised webpages, made up of pictures, video and text. Webpages are documents, typically containing HTML, CSS and JavaScript. APIs, or Application Programming Interfaces, are defined as a set of HTTP requests, along with some definition for structure of the response, usually JSON (JavaScript Object Notation). In general terms, and in the context of web development, people write websites using HTML (for structure), JavaScript (to communicate with APIs and populate the website) and CSS (for style).

This website has been designed for bookworms. More specifically, it’s for people who love to read here in Cardiff.

The website is made up of two pages:

• INDEX.HTML – Here users can search the Google Books API for a particular author, or authors, and view their most popular books, information regarding their publishers and publication dates. If they’re interested in buying a book, they can check the front cover by hovering over that book and, if they click on it, a page will open where they can purchase it.

• STORELOCATOR.HTML – Alternatively, clicking on “Map” in the navbar will prompt the user for permission to access their location (HTML5 Geolocation) and, if accepted, will initialise a map. This map centres on their location, and a marker is dropped right in the middle to represent the location more accurately. Two circles are drawn around the marker to give the map scale, and these circles represent approx. 15 and 20 min walking distances respectively. Under that, browsers may choose a bookshop or bookshops and, by clicking on them, request Google Maps for a location. Another marker is then added representing that shop and the map is recentered, encase the user missed it. If they click on the first marker a popup will appear saying, “You are here” with an up to date weather forecast for that area (OpenWeatherMap). Clicking on the second marker will display a message containing that shop’s name and address. And if all else fails, there are links in the nav to every major bookshop and library in Cardiff.

Browsers can perform as many book searches/map requests as they like and, each time a HTTP request is made, a random sound effect is triggered in keeping with the website’s theme. Data is only lost when closing the browser, or leaving and refreshing the page.

INDEX.HTML is a simple page allowing users to search Google Books for books by a particular author. Responses are parsed, and the desired information is presented in the form of a text string. Each book is numbered (25 in total) and while hovering over that book more information is displayed. Currently, hovering over a book brings up a thumbnail, if available, of the front cover with fixed position. Given more time, the author would have liked to add a NOIMAGEFOUND.JPG to be displayed when thumbnails are not available, and book summaries to accompany these images, but the author had some difficulty with variable scope. Essentially, as you (the reader) will see, there is already some code (now in the form of comments) written attempting to achieve this, however each time a book summary is called only the last one is displayed. The author believes the problem lies with the temporary variable “i” in SCRIPT.JS and with variable scope. Originally, the author used console.log() commands to check variables but, due to time constraints, admitted defeat and started work on the STORELOCATOR.HTML page.

Clicking on any book, by any author brings up an amazon search in a new tab. This search is executed on load as book titles (from the response) are fed directly into the https://www.amazon...keywords= URL using the built in encodeURIComponent function. This works as expected and, given more time, the author would have liked to add similar functionality to the search terms/authors, linking them to their respective Wikipedia pages.

The page is fully responsive, with the layout and more advanced features being dropped on mobile and smaller devices. The Google Books API was chosen because it’s free and, genrally, quite easy to use.

STORELOCATOR.HTML is more complicated, using three distinct APIs (HTML5 Geolocation, Google Maps’ Geocoding and OpenWeatherMap) and resources from both Leaflet and Mapbox. These APIs were chosen because they’re free and because each of them have lots of documentation, and examples for developers to follow. Leaflet and Mapbox were used (instead of Google Maps) because the author believes these libraries and map tiles are easy to use and, ultimately, more customisable. Given more time and, assuming the author could open the page, they would have liked to design their own unique map style. However, due to time constraints, the author chose their favourite (and the most in keeping) map style available.

STORELOCATOR.HTML is more complicated because all three APIs can be called depending what the user wants. For example, just by visiting the page the HTML5 Geolocation API is called and, using the results, creates a map (the main focus of this page). If the browser blocks the API, or clicks on one of the “Useful Links” at the top, everything stops and that’s it. However, if they allow the API, obviously, a map is drawn and centered on their position. A marker and two circles are placed at the centre of the map. Users can click on the marker, or either circle, with each input having a different result. For example, clicking on the centre marker brings up a little message that says, “You are here” and displays an up to date weather forecast (the information already having been requested). Alternatively, by clicking on a shop button at the bottom users can requests Google Maps for latitude-longitude and address (for that shop). Each click sends a GET request, and the results are plotted in on the map above.

The author thinks this page works well, but wanted to do so much more. For example, instead of having weather data included in the user’s popup, given more time, the author could have written a separate div, like a widget, to display the information more clearly. Also, while information regarding user location and weather is correct, due to time constraints, the website rather assumes that users are in the Cardiff area. It would have been nice to change the users latitude-longitude into a town or city/place name, and have the message read “You are here” + place name, or even display local bookshops where they are (outside of Cardiff). Some effort was made to accomplish this, but again the author found it increasingly hard putting responses from one API in as the parameters for the next. console.log()s where used heavy to follow variables through the code, checking scope. Later these commands were removed as unnecessary code.

In conclusion, the author’s quite happy with the result. The author’s particularly proud he was able to use four different APIs successfully (two pages, sometimes two APIs at a time), and that he included a random sound effect function, keeping with the website theme, called each time a GET request is sent. That said, there’s always room for improvement and the author would have liked to show off a little more JavaScript and CSS, perhaps using grids.

Each page follows the same layout (regardless of device width and orientation):

• A Navigation Bar

• Main, and

• Footer

Each page is fully responsive.

Twitter Bootstrap was used to design the website because:

• The author very much likes the style of navbar, buttons and modal elements

• The author believes that Bootstrap achieves an incredibly professional look, both clean,
but with bright, high contrast colours and, finally,

• The author didn’t use Bootstrap designing his first piece of coursework, and it’s good to
learn new things

On reflection the author is very happy with his decision to use Bootstrap, only having changed a few things in his own STYLE.CSS and MAPSTYLE.CSS files. In the author’s opinion, using Bootstrap is much like using a CSS reset, just with lots of added functionality and documentation.

The author believes that a simple layout makes websites easy to navigate and find content, without having too much on-screen. Also, simple layouts are easy to style responsively. Actually, Bootstrap does a lot this work for you, allowing developers to spend more time working on more complex JavaScript.

Finally, the base font size was increased to 16px, and a “.shadow” class was written giving more important text an outline to increase legibility. The colour-pallet was based on the original Whaam! painting by Roy Lichtenstein (later changed to Whaam by Chod due to issues regarding pixilation), and hex colour values were used throughout, as the author believes this model is used more commonly in web development.

The website was tested in Chrome using the Developer Tools, and the code was validated using W3C’s Markup and CSS Validation Services, and AChecher.

No errors were found.
