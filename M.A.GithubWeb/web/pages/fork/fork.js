var CLONE_SERVLET_URL = "CloneServlet";
var All_REPOSITORIES_DETAILS_URL = "allRepositoriesDetails";
var USER_LIST_HISTORY_URL = "../../usersListHistory";
/*var refreshRate = 4000;*/

/*-----------------------------------refreshRepositoryTable-------------------------------------*/
$(function () {
    $.ajax({
        url: USER_LIST_HISTORY_URL,
        success: function (users) {
            refreshUsersList(users);
        }
    });
})


function refreshUsersList(users) {
    //clear all current users
    $("#userList").empty();

    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function (index, user) {
        console.log("Adding user #" + index + ": " + user.userName);
        $("<li id=" + "\"" + user.userName + "\"" + ">" + user.userName + "</li>").appendTo($("#userList"));
        $("#" + user.userName).click(function (event) {
            console.log("click detected");
            $.ajax({
                url: All_REPOSITORIES_DETAILS_URL,
                data: {"username": user.userName},
                success: function (repositories) {
                    console.log("in success");
                    uploadRepositoryData(repositories)
                },
                error: function () {
                    console.log("in error");
                }
            });
        });
    });
}

function uploadRepositoryData(repositories) {
    $("#tb").after().empty();
    $(repositories).each(function (index, element) {
        var buttonNumber = 0;
        var button = "<input type=\"button\" id =" + buttonNumber + " value=\"clone this\">";

        $("<tr>" +
            "<td>" + button + "</td>" +
            "<td >" + element.repositoryName + "</td>" +
            "<td>" + element.latestCommit + "</td>" +
            "<td>" + element.message + "</td>" +
            "<td>" + element.activeBranch + "</td>" +
            "<td>" + element.commitAmount + "</td>" +
            "</tr>").appendTo($("#tb"));

        $("#" + buttonNumber).click(function (event) {
            console.log(buttonNumber);
            var repoName = prompt("Enter The Name Of The Repository", "Repositoryation");
            $.ajax({
                url: CLONE_SERVLET_URL,
                /*todo:sendredirect to correct page*/
                data: {"repositoryName": element.repositoryName,
                    "username": element.userName,
                     "repoNewName":repoName},
                success: function () {
                    console.log("in success");
                },
                error: function () {
                    console.log("in error");
                },

                return: true
            });
        });

        buttonNumber++;
    })
}

