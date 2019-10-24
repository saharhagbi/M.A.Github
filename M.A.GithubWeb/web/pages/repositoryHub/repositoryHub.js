var USER_LIST_URL = "../../userslist";
var REPOSITORY_DATA_URL = "../../repositorydata";
var REPOSITORY_PAGE_URL = "../repositoryPage";
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

    $(repositories).each(function (index, element) {

        $("<tr>" +
            "<th id=" + index + ">" + element.repositoryName + "</th>" +
            "<th>" + element.latestCommit + "</th>" +
            "<th>" + element.message + "</th>" +
            "<th>" + element.activeBranch + "</th>" +
            "<th >" + element.commitAmount + "</th>" +
            "</tr>").appendTo($("#repositoriesDetails"));

        $("#" + index).click(function (event) {
            console.log(index);
            var repoName = $(this).text();

            console.log(repoName);
            $.ajax({
                url: REPOSITORY_PAGE_URL,
                dataType: "json",
                data: {"repoName": repoName},
                success: function () {
                    console.log("Hey! It's working!!");

                    uploadRepositoryData(repositories);
                }
            });
        })
    })
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
