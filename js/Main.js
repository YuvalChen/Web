var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}];

var myUsername = "Yuval";
window.addEventListener('load', loadPage(), false);

function loadTweets() {
    $("#row").printText("");
    for (tweet in tweets) {
        var elements = "<div class='media col-lg-12'> <div class='media-left'> <a href='#'> <img src='../images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + tweets[tweet].username + "</b> <br/> <span>" + tweets[tweet].text + "</span></div></div>"
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
        var newTweet = {username: myUsername, text: tweet};
        tweets.push(newTweet);
        textInput.value("");
        $("#wrong-message").printText("");

        var elements = "<div class='media col-lg-12'> <div class='media-left'><a href='#'> <img src='../images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + newTweet.username + "</b> <br/> <span>" + newTweet.text + "</span></div></div>"
        $("#row").printText($("#row").getText() + elements)
    }
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
    loadTweets();
    test_group('Publish valid', function () {
        assert(testPublishAdding(), "Cheacking if publish adding");
        assert(testNotPublishEmptyString(), "Cheacking not publish empty string");
        assert(testCleanTextBox(), "Cheacking cleaning textbox area after publish");
    });
}