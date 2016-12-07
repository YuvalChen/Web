var users = [];
    // {id: '1', image: '../images/Person.png', follow: true, username: 'Bobo'},
    // {id: '2', image: '../images/Person.png', follow: false, username: 'Elvis'},
    // {id: '3', image: '../images/Person.png', follow: false, username: 'Mimi'},
    // {id: '4', image: '../images/Person.png', follow: true, username: 'Yuval'},
    // {id: '5', image: '../images/Person.png', follow: false, username: 'Amit'},
    // {id: '6', image: '../images/Person.png', follow: false, username: 'Rozi'}];
var image = 'images/Person.png';

window.addEventListener('load', loadUsersFromServer(), false);

function loadUsersFromServer() {
    axios.get('http://localhost:8000/users')
        .then(function (response) {
            users = response.data;
            loadUsers();
        })
        .catch(function (error) {
            console.log(error);
        });
};

function loadUsers() {

    $("#all-users").printText("");
    $("#all-following").printText("");

    for (user in users) {
        var onClickString = "FollowSwitch('" + users[user]._id + "')";
        var elements = "<div class='col-lg-2' align='center'><div class='thumbnail followers'><img src=" + image + "/><div class='caption'> <p> <a href='#' id='" + users[user]._id + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user]._id + "' role='button'></a></p> <p>" + users[user].username + "</p> </div> </div>";

        if (users[user].username.includes($("#text_filter").value())) {
            $("#all-users").printText($("#all-users").getText() + elements);
        }
        if (users[user].follow) {
            elements = "<div class='thumbnail followers'><img src=" + image + "/><div class='caption'><p><a href='#' id='" + users[user]._id + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + users[user]._id + "' role='button'></a></p><p>" + users[user].username + "</p></div></div>";
            $("#all-following").printText($("#all-following").getText() + elements);
        }
        ButtonProperties(users[user]);
    }
};

function ButtonProperties(currUser) {
    var defaultButton = "btn-default";
    var primaryButton = "btn-primary";
    var classes = $("." + currUser._id);
    currUser.follow ? classes.addClass(defaultButton) : classes.addClass(primaryButton)
    currUser.follow ? classes.removeClass(primaryButton) : classes.removeClass(defaultButton)
    currUser.follow ? classes.printText("UnFollow") : classes.printText("Follow")
}

function FollowSwitch(id) {
    var currObject = users.filter(function (obj) {
        return obj._id === id
    });

    currObject[0].follow = !currObject[0].follow;
    loadUsers();
};

function filterByName() {
    loadUsers();
}