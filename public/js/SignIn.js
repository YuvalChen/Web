var users = [];

function loadUsers() {
    var currUser = {username: $("#username_id").value(), password: $("#password_id").value()};
    axios.post('/users/signIn', currUser).then(function (res) {
        if (!res.data) {
            $("#wrong-message").printText("not good");
        }
        else {
            $("#wrong-message").printText("good");
        }
    });
};