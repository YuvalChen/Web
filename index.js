var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var id = 1;
var usersFileName = './db/users.json';
var tweetsFileName = './db/tweet.json';
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

function getID() {
    return id.toString();
    id = id + 1;
}

function getSessionID (req) {
    return req.session.cuurUserId;
}

function defineSessionID (req, id) {
    req.session.cuurUserId = id;
}

function readFile(fileName) {
    var arrayOfUsers = fs.readFileSync(fileName, 'utf8');
    var allData = JSON.parse(arrayOfUsers);
    return allData;
}
app.get('/tweets', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/" + tweetsFileName));
});

app.get('/users', function (req, res) {
    res.sendFile(path.normalize(__dirname + "/" + usersFileName));
});

app.get('/myUser', function (req, res) {
    var allUsers = readFile(usersFileName);
    var isConnect = false;
    for (var currUser of allUsers) {
        if (currUser._id == getSessionID(req)) {
            isConnect = true;
            res.send(currUser);
            break;
        }
    }
    if(!isConnect) {
        res.send(null);
    }
});


app.put('/users', function (req, res) {
    var allUsers = readFile(usersFileName);
    var currID = getSessionID(req);
    for (var currUser in allUsers) {
        if (allUsers[currUser]._id === currID) {
            if (req.body.boolean) {
                allUsers[currUser].following.push(req.body.id);
            }
            else {
                allUsers[currUser].following = allUsers[currUser].following.filter(function (currID) {
                    return currID != req.body.id;
                });
            }
            fs.writeFile(usersFileName, JSON.stringify(allUsers));
            break;
        }
    }
    res.end();
});

app.put('/tweets', function (req, res) {
    var allTweets = readFile(tweetsFileName);
    req.body.text = req.body.text.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
    allTweets.push(req.body);

    fs.writeFile(tweetsFileName, JSON.stringify(allTweets));
    res.end();
});

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
});

app.post('/users/signIn', function (req, res) {
    var allUsers = readFile(usersFileName);
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

app.post('/users/signUp', function (req, res) {
    var users = readFile(usersFileName);
    var result = true;
    var newUser = req.body;
    for (var currUser of users) {
        if (currUser.username === newUser.username) {
            result  = false;
            break;
        }
    }
    if (result) {
        newUser._id = getID();
        newUser.following = [];
        defineSessionID(req, newUser._id);
        users.push(newUser);
        fs.writeFile(usersFileName, JSON.stringify(users));
    }
    res.send(result);
});