function addUser() {
    var username = $("#username_id").value();
    var password = $("#password_id").value();
    var newUser = {username: username, password: password};
    axios.post('/users/signUp', newUser).then(function (req, res) {
        if (!res.data) {
            $("#wrong-message").printText("username all ready exsist");
        }
        else {
            $("#wrong-message").printText("signed up !!");
        }
    });
};