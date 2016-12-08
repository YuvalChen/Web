function addUser() {
    var username = $("#username_id").value();
    var password = $("#password_id").value();
    var newUser = {username: username, password: password};
    axios.post('/users', newUser).then(function (req, res) {
    });
};