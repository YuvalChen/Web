var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var id = 1;
var session = require('express-session');

PORT = 8000;
app.use(bodyParser.json());
app.use(express.static('./public'));
;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// app.get('/sessionID', function(req, res) {
//     res.send({userID: req.session.cuurUserId});
// });
//
// app.post('/sessionID', function(req, res) {
//     defineSessionID(req, req.body);
//     res.end();
// });

function getSessionID (req) {
    return req.session.cuurUserId;
}

function defineSessionID (req, id) {
    req.session.cuurUserId = id;
}

app.post('/users/signIn', function (req, res) {
    var arrayOfUsers = fs.readFileSync('users.json', 'utf8');
    var allUsers = JSON.parse(arrayOfUsers);
    var result = false;

    for (var currUser of allUsers) {
        if ((currUser.username === req.body.username) &&
            (currUser.password === req.body.password )) {
            defineSessionID(req, currUser._id);
            result  = true;
            break;
        }
    }
    res.send(result);
});



app.get('/tweets', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/tweet.json"));
});

app.get('/users', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/users.json"));
});

app.get('/myUser', function (req, res) {

    var arrayOfUsers = fs.readFileSync('users.json', 'utf8');
    var allUsers = JSON.parse(arrayOfUsers);

    for (var currUser of allUsers) {
        if (currUser._id == getSessionID(req)) {
            res.send(currUser);
            break;
        }
    }
});


app.put('/users/:id', function (req, res) {
    var arrayOfUsers = fs.readFileSync('users.json', 'utf8');
    var allUsers = JSON.parse(arrayOfUsers);

    for (var currUser in allUsers) {
        if (allUsers[currUser]._id == req.params.id) {
            if (req.body.jsonNewFollowing.boolean) {
                allUsers[currUser].following.push(req.body.jsonNewFollowing.id);
            }
            else {
                allUsers[currUser].following = allUsers[currUser].following.filter(function (currID) {
                    return currID != req.body.jsonNewFollowing.id;
                });
            }
            fs.writeFile('users.json', JSON.stringify(allUsers));
            break;
        }
    }
    res.end();
});

app.put('/tweets', function (req, res) {
    var arrayOfTweets = fs.readFileSync('tweet.json', 'utf8');
    var allTweets = JSON.parse(arrayOfTweets);
    allTweets.push(req.body.newTweet);

    fs.writeFile('tweet.json', JSON.stringify(allTweets));
    res.end();
});

app.post('/users', function (req, res) {
    var arrayOfTweets = fs.readFileSync('users.json', 'utf8');
    var allTweets = JSON.parse(arrayOfTweets);
    var currTweet = req.body;
    currTweet._id = getID();
    defineSessionID(currTweet._id);

    currTweet.following = [];
    allTweets.push(currTweet);
    fs.writeFile('users.json', JSON.stringify(allTweets));
    res.end();
});

function getID() {
    return id;
    id = id + 1;
}


app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
});
