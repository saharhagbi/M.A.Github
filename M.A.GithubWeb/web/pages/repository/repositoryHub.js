var USER_LIST_URL = "../../userslist";
var REPOSITORY_DATA_URL = "../../repositorydata";
var refreshRate = 2000;

function ajaxUsersList() {
    $.ajax({
        url: USER_LIST_URL,
        success: function (users) {
            console.log(users);
            refreshUsersList(users);
        }
    });
}

function refreshUsersList(users) {
    //clear all current users
    $("#userslist").empty();

    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function (index, user) {
        console.log("Adding user #" + index + ": " + user.userName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $('<li>' + user.userName + '</li>').appendTo($("#userslist"));
    });
}

$(function () {

    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
});

/*-----------------------------------refreshRepositoryTable-------------------------------------*/

function uploadRepositoryData(repositories) {
    $("#repositoryDetails").empty();


    $("#repoName").text(repositories[0].repositoryName);
    $("#latestCommit").text(repositories[0].latestCommit);
    $("#message").text(repositories[0].message);
    $("#activeBranch").text(repositories[0].activeBranch);
    $("#commitAmount").text(repositories[0].commitAmount);
}

$(function () {

    $.ajax({
        url: REPOSITORY_DATA_URL,
        success: function (repositories) {
            console.log(repositories)

            uploadRepositoryData(repositories);
        }
    });
});
