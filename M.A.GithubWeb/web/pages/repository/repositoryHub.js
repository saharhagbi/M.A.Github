var USER_LIST_URL = buildUrlWithContextPath("userslist");
var REPOSITORY_DATA_URL = "../../repositorydata";
var refreshRate = 2000;

function ajaxUsersList() {
    $.ajax({
        url: USER_LIST_URL,
        success: function (users) {
            refreshUsersList(users);
        }
    });
}

function refreshUsersList(users) {
    //clear all current users
    $("#userslist").empty();

    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function (index, username) {
        console.log("Adding user #" + index + ": " + username);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $('<li>' + username + '</li>').appendTo($("#userslist"));
    });
}

$(function () {

    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
});

/*-----------------------------------refreshRepositoryTable-------------------------------------*/

function uploadRepositoryData(repositories) {
    $("#repositoryDetails").empty();

    $("#repoName").innerText = repositories[0].repositoryName;
    $("#latestCommit").innerText = repositories[0].latestCommit;
    $("#message").innerText = repositories[0].message;
    $("#activeBranch").innerText = repositories[0].activeBranch;
    $("#commitAmount").innerText = repositories[0].commitAmount;


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
