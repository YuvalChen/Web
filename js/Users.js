var users = [
    {image: '../images/Person.png', follow: true, username: 'Bobo'},
    {image: '../images/Person.png', follow: false, username: 'Elvis'},
    {image: '../images/Person.png', follow: false, username: 'Mimi'},
    {image: '../images/Person.png', follow: true, username: 'Yuval'},
    {image: '../images/Person.png', follow: false, username: 'Amit'},
    {image: '../images/Person.png', follow: false, username: 'Rozi'}];

var inputText = "";
window.addEventListener('load', loadTweets(), false);

function loadTweets() {

    document.getElementById("all-users").innerHTML = "";
    document.getElementById("all-following").innerHTML = "";

    for (user in users) {
        var onClickString = "FollowSwitch('" + users[user].username + "')";

        var elements = "<div class='col-lg-2' align='center'><div class='thumbnail followers'><img src=" + users[user].image + "/><div class='caption'> <p> <a href='#' id='" + users[user].username + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user].username + "' role='button'></a></p> <p>" + users[user].username + "</p> </div> </div>"
        if (users[user].username.includes(inputText)) {
            document.getElementById("all-users").innerHTML += elements;
        }
        if (users[user].follow)
        {
            elements = "<div class='thumbnail followers'><img src=" + users[user].image + "/><div class='caption'><p><a href='#' id='" + users[user].username + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user].username + "' role='button'></a></p><p>" + users[user].username + "</p></div></div>"
            document.getElementById("all-following").innerHTML += elements;
        }
        ButtonProperties(users[user]);
    }
};

function ButtonProperties (currUser){
    var defaultButton = "btn-default";
    var primaryButton = "btn-primary";
    var objectsList = document.getElementsByClassName(currUser.username);

    for (var index = 0; index< objectsList.length; index++) {
        objectClasses = objectsList[index].classList;
        currUser.follow ? objectClasses.add(defaultButton) : objectClasses.add(primaryButton)
        currUser.follow ? objectClasses.remove(primaryButton) : objectClasses.remove(defaultButton)
        objectsList[index].innerHTML = currUser.follow ? "UnFollow" : "Follow";
    }
}

function FollowSwitch(username) {
    var currObject = users.filter(function (obj) {
        return obj.username === username});

    currObject[0].follow = !currObject[0].follow;
    loadTweets();
};

function filterByName() {
    inputText = document.getElementById("text_filter").value;
    loadTweets();
}