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
    var repoNameTrimmed;
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function (index, user) {
        repoNameTrimmed = user.userName;
        console.log("Adding user #" + index + ": " + repoNameTrimmed);
        if (user.userName.indexOf(' ') >= 0) {
            repoNameTrimmed = repoNameTrimmed.replace(/ /g, "_");
            console.log(repoNameTrimmed);
        }
        $("<li id=" + "\"" + repoNameTrimmed + "\"" + ">" + user.userName + "</li>").appendTo($("#userList"));
        /*todo: fix- when a name is with space in it example: "roy roy" as opposed to "royroy" click does'nt work*/
        $("#" + repoNameTrimmed).on("click", function (event) {
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
                data: {
                    "repositoryName": element.repositoryName,
                    "username": element.userName,
                    "repoNewName": repoName
                },
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

