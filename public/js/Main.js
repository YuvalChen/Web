var tweets = [];
var users = [];

var myUsername = "Yuval";
var hardCodedId = "cc707c95-f1e3-4caf-906d-f9dd1f394b99";

window.addEventListener('load', loadPage(), false);

function loadTweetsFromServer() {
    var promises = [];
    promises.push(getTweets());
    promises.push(getUsers());

    function getTweets() {
        return axios.get('http://localhost:8000/tweets');
    }

    function getUsers() {
        return axios.get('http://localhost:8000/users');
    }

    axios.all(promises)
        .then(axios.spread(function (responseTweets, responseUsers) {
            tweets = responseTweets.data;
            users = responseUsers.data;
            matchTweetAndUser(users);
            loadTweets();
        }));
}

function matchTweetAndUser(users) {
    for (currTweet in tweets) {
        for (cuurUser in users) {
            if (tweets[currTweet].user == users[cuurUser]._id) {
                tweets[currTweet].username = users[cuurUser].username;
                break;
            }
        }
    }
}

function loadTweets() {
    $("#row").printText("");
    for (tweet in tweets) {
        var elements = "<div class='media col-lg-12'> <div class='media-left'> <a href='#'> <img src='images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + tweets[tweet].username + "</b> <br/> <span>" + tweets[tweet].text + "</span></div></div>"
        $("#row").printText($("#row").getText() + elements);
    }
}

function PublishTweet() {
    var textInput = $("#text-publish");
    var tweet = textInput.value();

    if (tweet == "") {
        $("#wrong-message").printText("Cant publish empty message");
    }
    else {
        tweet = tweet.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
        var newTweet = {user: hardCodedId, text: tweet};
        sendToServer(newTweet);
        textInput.value("");
        $("#wrong-message").printText("");

        axios.get('http://localhost:8000/users/' + newTweet.user).then(function (res) {
                var elements = "<div class='media col-lg-12'> <div class='media-left'><a href='#'> <img src='images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + res.data.username + "</b> <br/> <span>" + newTweet.text + "</span></div></div>"
                $("#row").printText($("#row").getText() + elements);
        }
        )
    }
}

function sendToServer(newTweet) {
    axios.put('http://localhost:8000/tweets', {
        newTweet
    }).then(function (response) {
    }).catch(function (error) {
            console.log(error);
        });
}

function testPublishAdding() {
    var textInput = $("#text-publish");
    textInput.value("testing");
    PublishTweet();
    var newTweets = tweets.filter(function (item) {
        return item.text != "testing";
    });
    var result = newTweets.length != tweets.length;
    tweets = newTweets;
    loadTweets();
    return result;
}

function testNotPublishEmptyString() {
    var textInput = $("#text-publish");
    textInput.value("");
    PublishTweet();
    var newTweets = tweets.filter(function (item) {
        return item.text != "";
    });
    var result = newTweets.length == tweets.length;
    tweets = newTweets;
    $("#wrong-message").printText("");
    loadTweets();
    return result;
}


function testCleanTextBox() {
    var textInput = $("#text-publish");
    textInput.value("testing");
    PublishTweet();
    var newTweets = tweets.filter(function (item) {
        return item.text != "testing";
    });
    tweets = newTweets;
    loadTweets();
    return textInput.value() == "";
}

function loadPage() {
    // test_group('Publish valid', function () {
    //     assert(testPublishAdding(), "Cheacking if publish adding");
    //     assert(testNotPublishEmptyString(), "Cheacking not publish empty string");
    //     assert(testCleanTextBox(), "Cheacking cleaning textbox area after publish");
    // });
    loadTweetsFromServer();
}