
console.log('HTML Route Connected Successfully');

// Dependencies
// =============================================================
var path = require('path');


// Export HTML routes - HTML GET Requests
// =============================================================

function htmlRoutes (app) {

    // Basic route that sends the user first to the Home Page
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    // Sends user to survey HTML
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    // If no matching route is found default to home
    app.use(function(req, res){
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

}

module.exports = htmlRoutes;