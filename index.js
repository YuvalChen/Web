var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

PORT = 8000;
app.use(bodyParser.json());
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/public/html/Main.html"));
});

app.get('/tweets', function (req, res) {
   // var obj = JSON.parse(fs.readFileSync('tweet.json', 'utf8'));
    res.sendFile(path.normalize(__dirname + "/tweet.json"));
});

app.get('/users', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/users.json"));
});

app.get('/users/:id', function (req, res) {

    var arrayOfUsers = fs.readFileSync('users.json', 'utf8');
    var allUsers = JSON.parse(arrayOfUsers);

    for (currUser in allUsers) {
        if (allUsers[currUser]._id == req.params.id){
            res.send(allUsers[currUser]);
            break;
        }
    }
});


app.put('/tweets', function (req, res) {
    var arrayOfTweets = fs.readFileSync('tweet.json', 'utf8');
    var allTweets = JSON.parse(arrayOfTweets);
    allTweets.push(req.body.newTweet);

    fs.writeFile('tweet.json', JSON.stringify(allTweets), function (err) {
        console.log(err);
    });

});

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
});
