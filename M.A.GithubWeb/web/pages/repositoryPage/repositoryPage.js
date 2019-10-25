var REPOSITORY_INFO_URL = "repositoryInfo";

console.log("worked till here");

$(function () {
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": "1"},

        success: function (branches) {

            console.log(branches);

            // rebuild the list of users: scan all users and add them to the list of users
            $.each(branches || [], function (index, branch) {
                console.log("Adding branch #" + index + ": " + branch.m_BranchName);
                //create a new <option> tag with a value in it and
                //appeand it to the #userslist (div with id=userslist) element
                $('<li>' + branch.m_BranchName + '</li>').appendTo($("#branches"));
            });
        },

        error: function (e) {
            console.log(e.toString());
        }
    });
});

/*---------------------------request Commits-------------------------------------------*/

$(function () {
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": "2"},

        success: function (commits) {
            console.log(commits);

            updateCommitsTable(commits);

            function updateCommitsTable(commits) {

                $(commits).each(function (index, element) {

                    console.log(element);

                    $("<tr>" +
                        "<td id=" + index + ">" + element.sha1 + "</td>" +
                        "<td>" + element.message + "</td>" +
                        "<td>" + element.creator + "</td>" +
                        "<td>" + element.branchPointed + "</td>" +
                        "</tr>").appendTo($("#commitsTable"));
                });
            }
        },

        error: function (e) {
            console.log(e.toString());
        }
    });
});