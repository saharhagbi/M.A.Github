var USER_LIST_URL = "../../userslist";
var REPOSITORY_DATA_URL = "../../repositorydata";
var LOAD_REPOSITORY_URL = "../loadRepository";
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
    $.each(users || [], function (index, user) {
        console.log("Adding user #" + index + ": " + user);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $('<li>' + user + '</li>').appendTo($("#userslist"));
    });
}

$(function () {

    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
});

/*-----------------------------------refreshRepositoryTable-------------------------------------*/

function uploadRepositoryData(repositories) {

    $(repositories).each(function (index, element) {

        $("<tr id=" + index + ">" +
            "<td>" + element.repositoryName + "</td>" +
            "<td>" + element.latestCommit + "</td>" +
            "<td>" + element.message + "</td>" +
            "<td>" + element.activeBranch + "</td>" +
            "<td >" + element.commitAmount + "</td>" +
            "</tr>").appendTo($("#repositoriesDetails"));

        $("#" + index).click(function (event) {
            console.log(index);
            var repoName = $(this).text();
            console.log(repoName);

            $.ajax({
                url: LOAD_REPOSITORY_URL,
                data: {"repoName": repoName},
                success: function () {

                    console.log("in success");
                    location.replace("../repositoryPage/repositoryPage.html");
                },
            });
        });
    });
}

$(function () {
    $.ajax({
        url: REPOSITORY_DATA_URL,
        success: function (repositories) {
            console.log(repositories);

            uploadRepositoryData(repositories);
        }
    });
});
