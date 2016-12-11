function getTweets() {
    return axios.get('/tweets');
}

function getUsers() {
    return axios.get('/users');
}

function getUserById() {
    return axios.get('/myUser');
}

function getAllData() {
    return new Promise(function(resolve, reject) {
        var promises = [];
        promises.push(getTweets());
        promises.push(getUsers());
        promises.push(getUserById());

        axios.all(promises).then(axios.spread(function (responseTweets, responseUsers, responseMyUser) {
            resolve([responseTweets, responseUsers, responseMyUser]);
        }));
    });
}

function sendToServer(newTweet) {
    axios.put('/tweets', {user: newTweet.user, text: newTweet.text}

    ).then(function (response) {
    }).catch(function (error) {
        console.log(error);
    });
}