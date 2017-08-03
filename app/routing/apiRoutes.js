var friends = require('../data/friend.js');

module.exports = function (app) {
    // //api path to get the friends data, responds with a json object (an array of friends). Activated on both html pages with blue API Link
    app.get('/api/friends', function (req,res) {
        res.json(friends);
    });



    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post('/api/friends', function (req, res) {

        // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };
        var scoresArray = [];
        for(var i=0; i < req.body.scores.length; i++){
            scoresArray.push( parseInt(req.body.scores[i]) )
        }
        newFriend.scores = scoresArray;


        // Cross check the new friend entry with the existing ones
        var scoreComparisionArray = [];
        for(var i=0; i < friendsData.length; i++){

            // Check each friend's scores and sum difference in points
            var currentComparison = 0;
            for(var j=0; j < newFriend.scores.length; j++){
                currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
            }

            // Push each comparison between friends to array
            scoreComparisionArray.push(currentComparison);
        }

        // Determine the best match using the postion of best match in the friendsData array
        var bestMatchPosition = 0; // assume its the first person to start
        for(var i=1; i < scoreComparisionArray.length; i++){

            // Lower number in comparison difference means better match
            if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
                bestMatchPosition = i;
            }

        }

        // ***NOTE*** If the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen
        var bestFriendMatch = friendsData[bestMatchPosition];



        // Reply with a JSON object of the best match
        res.json(bestFriendMatch);



        // Push the new friend to the friends data array for storage
        friendsData.push(newFriend);

    });

};