// Dependencies- Node Modules
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


//Configure the Express application
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


//Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Expose the public directory to access CSS files sets up express to serve static files
// =============================================================
app.use(express.static(path.join(__dirname, "app/public"))); //app.use(express.static('app/public'));


// // These routes give our server a "map" of how to respond when users visit or request data
// =============================================================
require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);


var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");
//var getFriends = require("./app/data/friend.js");

//Call the apiRoutes and htmlRoutes functions and pass in app
// =============================================================
apiRoutes(app);
htmlRoutes(app);


//Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("Friend Finder App is listening on PORT " + PORT);
});