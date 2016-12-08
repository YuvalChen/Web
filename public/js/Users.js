var image = '/images/Person.png';
var myUsers = [];
var currUserObject;
window.addEventListener('load', loadDataFromServer(), false);

function loadDataFromServer() {
    var promises = [];
    promises.push(loadUsersFromServer());
    promises.push(loadFollowings());

    function loadUsersFromServer() {
        return axios.get('http://localhost:8000/users');
    }

    function loadFollowings() {
        return axios.get('http://localhost:8000/myUser');
    }

    axios.all(promises)
        .then(axios.spread(function (responseUser, responseFollowing) {
            myUsers = responseUser.data;
            currUserObject = responseFollowing.data;
            insertAttribue();
            loadUsers();
        }));
}

function loadUsers() {

    $("#all-users").printText("");
    $("#all-following").printText("");

    for (var user of myUsers) {
        var onClickString = "FollowSwitch('" + user._id + "')";
        var elements = "<div class='col-lg-2' align='center'><div class='thumbnail followers'><img src='" + image + "' /><div class='caption'> <p> <a href='#' id='" + user._id + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + user._id + "' role='button'></a></p> <p>" + user.username + "</p> </div> </div>";

        if (user.username.includes($("#text_filter").value())) {
            $("#all-users").printText($("#all-users").getText() + elements);
        }
        if (user.follow) {
            elements = "<div class='thumbnail followers'><img src='" + image + "'/><div class='caption'><p><a href='#' id='" + user._id + "' onclick=" + onClickString + " class='btn btn-primary button-class-color " + user._id + "' role='button'></a></p><p>" + user.username + "</p></div></div>";
            $("#all-following").printText($("#all-following").getText() + elements);
        }
    }
    ButtonProperties();
};

function insertAttribue() {

    var listOfId = [];

    for (var currFollow of currUserObject.following) {

        for (var currUser of myUsers) {
            if (listOfId.indexOf(currUser._id) == -1) {
                if (currFollow === currUser._id) {

                    currUser.follow = true;
                    listOfId.push(currFollow);

                }
                else {
                    currUser.follow = false;
                }
            }
        }
    }
}

function ButtonProperties() {
    for (var currUser of myUsers) {

        var defaultButton = "btn-default";
        var primaryButton = "btn-primary";
        var warnning ="btn-warning";
        var classes = $("." + currUser._id);

        if (currUser.follow == true) {
            classes.addClass(defaultButton);
            classes.removeClass(primaryButton);
            classes.printText("UnFollow");
        }
        else {
            if (currUser._id == currUserObject._id) {
                classes.addClass(warnning);
                classes.addClass("disabled");
                classes.printText("Edit profile");
            }
            else {
                classes.addClass(primaryButton);
                classes.removeClass(defaultButton);
                classes.printText("Follow");
            }
        }
    }
}

function FollowSwitch(id) {
    var action;
    for (var currUser of myUsers) {
        if (currUser._id === id) {

            if (!currUser.follow) {
                currUserObject.following.push(currUser._id);
                action = true;
            }
            else {
                currUserObject.following = currUserObject.following.filter(function (currId) {
                    return currId != id;
                });
                action = false;
            }
            currUser.follow = !currUser.follow;
            var jsonNewFollowing = {
                id: id,
                boolean: action
            };
            updateServerFollowing(jsonNewFollowing);
            break;
        }
    }
    loadUsers();
};

function updateServerFollowing(jsonNewFollowing) {
    axios.put('http://localhost:8000/users/' + currUserObject._id, {jsonNewFollowing})
        .then(function (response) {
        }).catch(function (error) {
        console.log(error);
    });
}

function filterByName() {
    loadUsers();
}