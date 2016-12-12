var tweets = [];
var users = [];
var myUser;

window.addEventListener('load', loadTweetsFromServer(), false);

function loadTweetsFromServer() {
    getAllData().then(function (response) {
        tweets = response[0].data;
        users = response[1].data;
        myUser = response[2].data;
        if (myUser == "") {
            window.location = "/html/SignUp.html";
        }
        $("#userName").printText(myUser.username);
        matchTweetAndUser();
        loadTweets();
    });
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

function addAttribute() {
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

function printingToHtml(tweet) {
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