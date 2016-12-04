var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}];

var myUsername = "Yuval";
var rowInput;
window.addEventListener('load', loadPage(), false);

function loadTweets() {
    rowInput.innerHTML = "";
    for (tweet in tweets) {
        var elements = "<div class='media col-lg-12'> <div class='media-left'> <a href='#'> <img src='../images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + tweets[tweet].username + "</b> <br/> <span>" + tweets[tweet].text + "</span></div></div>"
        rowInput.innerHTML += elements;
    }
}

function PublishTweet() {
    var textInput = document.getElementById("text-publish");
    var tweet = textInput.value;
    if (tweet == "") {
        document.getElementById("wrong-message").innerHTML = "Cant publish empty message";
    }
    else {
        var newTweet = {username: myUsername, text: tweet};
        tweets.push(newTweet);
        textInput.value = "";
        document.getElementById("wrong-message").innerHTML = "";

        var elements = "<div class='media col-lg-12'> <div class='media-left'><a href='#'> <img src='../images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + newTweet.username + "</b> <br/> <span>" + newTweet.text + "</span></div></div>"
        rowInput.innerHTML += elements;
    }
}

function testPublishAdding() {
    var textInput = document.getElementById("text-publish");
    textInput.value = "testing";
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
    var textInput = document.getElementById("text-publish");
    textInput.value = "";
    PublishTweet();
    var newTweets = tweets.filter(function (item) {
        return item.text != "";
    });
    var result = newTweets.length == tweets.length;
    tweets = newTweets;
    document.getElementById("wrong-message").innerHTML = "";
    loadTweets();
    return result;
}


function testCleanTextBox() {
    var textInput = document.getElementById("text-publish");
    textInput.value = "testing";
    PublishTweet();
    var newTweets = tweets.filter(function (item) {
        return item.text != "testing";
    });
    tweets = newTweets;
    loadTweets();
    return textInput.value == ""
}

function loadPage() {
    rowInput = document.getElementById("row");
    loadTweets();
    test_group('Publish valid', function () {
        assert(testPublishAdding(), "Cheacking if publish adding");
        assert(testNotPublishEmptyString(), "Cheacking not publish empty string");
        assert(testCleanTextBox(), "Cheacking cleaning textbox area after publish");
    });

    // bug with the testing
    rowInput = document.getElementById("row");
}

