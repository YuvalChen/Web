var fullStirng;
var cuurGroupResult = true;

function assert(value, name) {
    cuurGroupResult = cuurGroupResult && value;
    var result = value ? "test-success" : "test-failed";
    fullStirng += "<li class='" + result + "'> " + name + " </li>";
}

function test_group(name,test_group_function){
    fullStirng = "";
    fullStirng += "<div id='test-group-id' class='#group-test'>" + name + " <ul id='ul-id'>";
    test_group_function();
    fullStirng  += "</ul></div>";

    fullStirng = fullStirng.replace("#group-test", cuurGroupResult ? "group-success" : "group-failed");
    document.body.innerHTML += fullStirng;
}