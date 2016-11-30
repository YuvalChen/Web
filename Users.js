var users = [
    {image: 'images/Person.png', follow: true, username: 'Bobo'},
    {image: 'images/Person.png', follow: false, username: 'Elvis'},
    {image: 'images/Person.png', follow: false, username: 'Mimi'}];

var follows = [
    {image: 'images/Person.png', follow: true, username: 'Bobo'}];


loadTweets();
loadFollowers();

function loadTweets() {
    document.getElementById("all-users").innerHTML = "";
    for (user in users) {
        var onClickString = "FollowSwitch('" + users[user].username + "')";

        var elements = "<div class='col-lg-2' align='center'><div class='thumbnail followers'><img src=" + users[user].image + "/><div class='caption'> <p> <a href='#' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user].username + "' role='button'></a></p> <p>" + users[user].username + "</p> </div> </div>"
        document.getElementById("all-users").innerHTML += elements;
        GetStatios(users[user]);
    }
};

function loadFollowers() {
    document.getElementById("all-following").innerHTML = "";
    for (user in follows) {
        var onClickString = "FollowSwitch('" + follows[user].username + "')";
        var elements = "<div class='thumbnail followers'><img src=" + follows[user].image + "/><div class='caption'><p><a href='#' onclick=" + onClickString + " class='btn btn-primary button-class-color " + follows[user].username + "' role='button'></a></p><p>" + follows[user].username + "</p></div></div>"
        document.getElementById("all-following").innerHTML += elements;
        GetStatios(follows[user]);
    }
};


function FollowSwitch(username) {
    var currObject = users.filter(function (obj) {
        return obj.username === username});

    if (currObject[0].follow) {
        //follows.pop(currObject[0]);
        follows = follows.filter(function (obj) {
            return obj.username != username});

        currObject[0].follow = false;
        GetStatios(currObject[0]);
    }
    else {
        currObject[0].follow = true;
        follows.push(currObject[0]);
        GetStatios(currObject[0]);
    }
    loadTweets();
    loadFollowers();
};

function GetStatios(user) {
    var listOfElements = document.getElementsByClassName(user.username)
    for (index in listOfElements) {
        listOfElements[index].innerHTML = user.follow ? "UnFollow" : "Follow";
    }
};