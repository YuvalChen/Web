var tweets = [];
var users = [];
var myUser;

window.addEventListener('load', loadTweetsFromServer(), false);

function loadTweetsFromServer() {

    // tweets = [
    //     {
    //         "text": "Lorem sunt proident tempor qui amet ea quis aliqua qui.",
    //         "user": "5e07631e-3974-47f8-a89c-bb41ce1e0e3d"
    //     },
    //     {
    //         "text": "Dolore dolor aute enim ipsum id Lorem velit fugiat est laborum quis magna deserunt exercitation.",
    //         "user": "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"
    //     },
    //     {
    //         "text": "Id tempor Lorem pariatur ad.",
    //         "user": "953ee40c-77d3-46cc-8258-fc815c9b1f90"
    //     },
    //     {
    //         "text": "Adipisicing proident ad consequat nisi ullamco minim sunt.",
    //         "user": "10c06b27-d8ee-4435-9cee-0a2a838ca14a"
    //     }];
    // users = [{
    //     "_id": "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22",
    //     "username": "Butler",
    //     "password": "consequat",
    //     "following": [
    //         "10c06b27-d8ee-4435-9cee-0a2a838ca14a",
    //         "c28dd406-3595-42f6-8e36-15d4cd495293"
    //     ]
    // },
    //     {
    //         "_id": "cf462068-e996-4bf5-8395-c77b6df6ae3e",
    //         "username": "Sargent",
    //         "password": "nulla",
    //         "following": [
    //             "740b0aa3-7b00-4eeb-9c5b-7a302b63fec5",
    //             "c28dd406-3595-42f6-8e36-15d4cd495293",
    //             "953ee40c-77d3-46cc-8258-fc815c9b1f90",
    //             "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"
    //         ]
    //     },
    //     {
    //         "_id": "b328d5c3-8cab-4c6f-b027-39ad9138dbf0",
    //         "username": "Munoz",
    //         "password": "incididunt",
    //         "following": [
    //             "b328d5c3-8cab-4c6f-b027-39ad9138dbf0",
    //             "953ee40c-77d3-46cc-8258-fc815c9b1f90",
    //             "740b0aa3-7b00-4eeb-9c5b-7a302b63fec5",
    //             "953ee40c-77d3-46cc-8258-fc815c9b1f90",
    //             "c28dd406-3595-42f6-8e36-15d4cd495293",
    //             "b328d5c3-8cab-4c6f-b027-39ad9138dbf0"
    //         ]
    //     }];
    // myUser = {
    //     "_id": "b328d5c3-8cab-4c6f-b027-39ad9138dbf0",
    //     "username": "Munoz",
    //     "password": "incididunt",
    //     "following": [
    //         "b328d5c3-8cab-4c6f-b027-39ad9138dbf0",
    //         "953ee40c-77d3-46cc-8258-fc815c9b1f90",
    //         "740b0aa3-7b00-4eeb-9c5b-7a302b63fec5",
    //         "953ee40c-77d3-46cc-8258-fc815c9b1f90",
    //         "c28dd406-3595-42f6-8e36-15d4cd495293",
    //         "b328d5c3-8cab-4c6f-b027-39ad9138dbf0"
    //     ]
    // };

    getAllData().then(function (response) {
        tweets = response[0].data;
        users = response[1].data;
        myUser = response[2].data;
        if (myUser == "") {
            window.location = "/html/SignUp.html";
        }
        $("#userName").printText(myUser.username);
        matchTweetAndUser();
        loadTweets();
    });





    /*
     var promises = [];
     promises.push(getTweets());
     promises.push(getUsers());
     promises.push(getUserById());



     axios.all(promises)
     .then(axios.spread(function (responseTweets, responseUsers, responseMyUser) {
     tweets = responseTweets.data;
     users = responseUsers.data;
     myUser = responseMyUser.data;
     if (myUser == "") {
     window.location = "/html/SignUp.html";
     }
     $("#userName").printText(myUser.username);
     matchTweetAndUser();
     loadTweets();
     }));*/
}

function matchTweetAndUser() {
    var myFollowingTweets = [];

    for (var currTweet of tweets) {
        if (myUser._id === currTweet.user) {
            myFollowingTweets.push(currTweet);
        }
        for (var following of myUser.following) {
            if (following === currTweet.user) {
                myFollowingTweets.push(currTweet);
            }
        }
    }
    tweets = myFollowingTweets;
    addAttribute();

}

function addAttribute() {
    for (var currTweet of tweets) {
        for (var cuurUser of users) {
            if (currTweet.user == cuurUser._id) {
                currTweet.username = cuurUser.username;
                break;
            }
        }
    }
}

function loadTweets() {
    $("#row").printText("");
    for (var tweet of tweets) {
        printingToHtml(tweet);
    }
}

function printingToHtml(tweet) {
    var elements = "<div class='media col-lg-12'> <div class='media-left'> <a href='#'> <img src='images/Person.png'/> </a> </div> <div class='media-body'> <b class='media-heading'> " + tweet.username + "</b> <br/> <span>" + tweet.text + "</span></div></div>";
    $("#row").printText($("#row").getText() + elements);
}


function PublishTweet() {
    var textInput = $("#text-publish");
    var tweet = textInput.value();

    if (tweet == "") {
        $("#wrong-message").printText("Cant publish empty message");
    }
    else {
        tweet = tweet.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt');
        var newTweet = {user: myUser._id, text: tweet};
        sendToServer(newTweet);
        tweets.push(newTweet);
        textInput.value("");
        $("#wrong-message").printText("");
        addAttribute();
        printingToHtml(newTweet);
    }
}

function isUserFollow (user, id) {
    return user.following.indexOf(id) != -1;
};

describe("isUserFollowing", function () {
    it("userFollowId", function () {
        let tempUser = {
            "_id": "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22",
            "username": "Butler",
            "password": "consequat",
            "following": [
                "10c06b27-d8ee-4435-9cee-0a2a838ca14a",
                "c28dd406-3595-42f6-8e36-15d4cd495293"
            ]
        };
        expect(isUserFollow(tempUser, "10c06b27-d8ee-4435-9cee-0a2a838ca14a")).toBe(true);
    });
});