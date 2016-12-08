var tweets = [];
var users = [];
var myUser;

window.addEventListener('load', loadTweetsFromServer(), false);

function loadTweetsFromServer() {
    var promises = [];
    promises.push(getTweets());
    promises.push(getUsers());
    promises.push(getUserById());

    function getTweets() {
        return axios.get('http://localhost:8000/tweets');
    }

    function getUsers() {
        return axios.get('http://localhost:8000/users');
    }

    function getUserById() {
        return axios.get('http://localhost:8000/myUser');
    }

    axios.all(promises)
        .then(axios.spread(function (responseTweets, responseUsers, responseMyUser) {
            tweets = responseTweets.data;
            users = responseUsers.data;
            myUser = responseMyUser.data;
            matchTweetAndUser();
            loadTweets();
        }));
}

function matchTweetAndUser() {
    var myFollowingTweets = [];

    for (var currTweet of tweets) {
        if (myUser._id === currTweet.user) {
            myFollowingTweets.push(currTweet);
        }
        for (var following of myUser.following) {
            if (following === currTweet.user) {
                myFollowingTweets.push(currTweet);
            }
        }
    }
    tweets = myFollowingTweets;
    addAttribute();

}
function addAttribute () {
    for (var currTweet of tweets) {
        for (var cuurUser of users) {
            if (currTweet.user == cuurUser._id) {
                currTweet.username = cuurUser.username;
                break;
            }
        }
    }
}
function loadTweets() {
    $("#row").printText("");
    for (var tweet of tweets) {
        printingToHtml(tweet);
    }
}

function printingToHtml (tweet) {
    var elements = "<div class='media col-lg-12'> <div class='media-left'> <a href='#'> <img src='images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + tweet.username + "</b> <br/> <span>" + tweet.text + "</span></div></div>";
    $("#row").printText($("#row").getText() + elements);
}


function PublishTweet() {
    var textInput = $("#text-publish");
    var tweet = textInput.value();

    if (tweet == "") {
        $("#wrong-message").printText("Cant publish empty message");
    }
    else {
        tweet = tweet.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
        var newTweet = {user: myUser._id, text: tweet};
        sendToServer(newTweet);
        tweets.push(newTweet);
        textInput.value("");
        $("#wrong-message").printText("");
        addAttribute();
        printingToHtml(newTweet);
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
    //loadTweetsFromServer();
}