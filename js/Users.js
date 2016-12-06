var users = [
    {image: '../images/Person.png', follow: true, username: 'Bobo'},
    {image: '../images/Person.png', follow: false, username: 'Elvis'},
    {image: '../images/Person.png', follow: false, username: 'Mimi'},
    {image: '../images/Person.png', follow: true, username: 'Yuval'},
    {image: '../images/Person.png', follow: false, username: 'Amit'},
    {image: '../images/Person.png', follow: false, username: 'Rozi'}];

window.addEventListener('load', loadTweets(), false);

function loadTweets() {
    $("#all-users").printText("");
    $("#all-following").printText("");

    for (user in users) {
        var onClickString = "FollowSwitch('" + users[user].username + "')";
        var elements = "<div class='col-lg-2' align='center'><div class='thumbnail followers'><img src=" + users[user].image + "/><div class='caption'> <p> <a href='#' id='" + users[user].username + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user].username + "' role='button'></a></p> <p>" + users[user].username + "</p> </div> </div>";

        if (users[user].username.includes($("#text_filter").value())) {
            $("#all-users").printText($("#all-users").getText() + elements);
        }
        if (users[user].follow) {
            elements = "<div class='thumbnail followers'><img src=" + users[user].image + "/><div class='caption'><p><a href='#' id='" + users[user].username + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user].username + "' role='button'></a></p><p>" + users[user].username + "</p></div></div>";
            $("#all-following").printText($("#all-following").getText() + elements);
        }
        ButtonProperties(users[user]);
    }
};

function ButtonProperties(currUser) {
    var defaultButton = "btn-default";
    var primaryButton = "btn-primary";
    var classes = $("." + currUser.username);
    currUser.follow ? classes.addClass(defaultButton) : classes.addClass(primaryButton)
    currUser.follow ? classes.removeClass(primaryButton) : classes.removeClass(defaultButton)
    currUser.follow ? classes.printText("UnFollow") : classes.printText("Follow")
}

function FollowSwitch(username) {
    var currObject = users.filter(function (obj) {
        return obj.username === username
    });

    currObject[0].follow = !currObject[0].follow;
    loadTweets();
};

function filterByName() {
    loadTweets();
}