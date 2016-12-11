var users = [];

function loadUsers() {
    var currUser = {username: $("#username_id").value(), password: $("#password_id").value()};
    axios.post('/users/signIn', currUser).then(function (res) {
        if (!res.data) {
            $("#wrong-message").printText("not valid user in the system");
        }
        else {
            $("#wrong-message").printText("logged in");
        }
    });
};