var tweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}];

var myUsername = "Yuval";
loadTweets();

function loadTweets() {
    document.getElementById("row").innerHTML = "";
    for (tweet in tweets) {
        var elements = "<div class='media col-lg-12'> <div class='media-left'> <a href='#'> <img src='images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + tweets[tweet].username + "</b> <br/> <span>" + tweets[tweet].text + "</span></div></div>"
        document.getElementById("row").innerHTML += elements;
    }
}

function publish () {
    var tweet = document.getElementById("text-publish").value;
    var newTweet = {username: myUsername, text: tweet};
    tweets.push(newTweet);
    loadTweets();
}