var repositoryName = 0;
var userName = 1;
var ALL_BRANCHES = "1";
var COMMIT_TYPE = "2";
var NAME_TYPE = "3";
var REPOSITORY_TYPE = "5";
var YES = "Yes";
var CHECKOUT_URL = "checkout";
var refreshBranches = 1000;
var REPOSITORY_INFO_URL = "repositoryInfo";
var PULL_REQUEST_URL = "pullrequest";


// export let isLocalRepository;

/*---------------------------request RepositoryName And userName-------------------------------------------*/

$(function () {
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": REPOSITORY_TYPE},

        success: function (isLocalRepositoryInString) {

            isLocalRepository = isLocalRepositoryInString[0].localeCompare(YES) == 0 ? true : false;

            handleUseCaseOfLocalRepository(isLocalRepositoryInString);

            function addCollaborationButtons() {
                $("#pushBranchSection").append("<button type=\"button\" onclick=\"addAllBranchesForPushing()\">Push Branch</button>")
                $("#pullSection").append("<button type=\"button\" onclick=\"pull()\">Pull</button>")
                $("#createPullRequest").append("<button type=\"button\" onclick=\"createPullRequest()\">Create Pull Request</button>")

                $("#pullRequestsTable").append("<tr>" +
                    "<th>Status</th>" +
                    "<th>Message</th>" +
                    "<th>Confirm</th>" +
                    "<th>Denied</th>" +
                    "</tr>")
            }

            function handleUseCaseOfLocalRepository(isLocalRepository) {
                if (isLocalRepositoryInString[0].localeCompare(YES) == 0) {
                    addCollaborationButtons();
                }
            }
        }
    });
});

$(function () {
    $("#branches").empty();

    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": ALL_BRANCHES},

        success: function (branches) {

            console.log(branches);

            $.each(branches || [], function (index, branch) {
                console.log("Adding branch #" + index + ": " + branch.m_BranchName);
                //create a new <option> tag with a value in it and
                //appeand it to the #userslist (div with id=userslist) element

                var brancNameTrimmed = branch.m_BranchName;

                if (brancNameTrimmed.includes(" ") || brancNameTrimmed.includes("/")) {
                    brancNameTrimmed = brancNameTrimmed.replace(/ /g, "_").replace("/", "_");
                }

                $("#branches").append("<li>" + branch.m_BranchName + "</li>");

                /*$("#" + brancNameTrimmed).click(function () {
                        checkout(branch.m_BranchName)
                })*/
            });
        }
    });
});


/*---------------------------request Commits-------------------------------------------*/

$(function () {
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": COMMIT_TYPE},

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
        }
    });
});

/*---------------------------request RepositoryName And userName-------------------------------------------*/

$(function () {
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": NAME_TYPE},

        success: function (names) {
            console.log(names);

            updateNames(names);

            function updateNames(names) {
                $("#repositoryName").text(names[repositoryName]);
                $("#userName").text(names[userName]);
            }
        }
    });
});

/*-------------------------------------send Pull Request---------------------------------------*/

$("#check").on('click', function () {

    console.log($("#baseBranchName").val());
    console.log($("#targetBranchName").val());
    console.log($("#message").val());

    var branchTargetName = $("#baseBranchName").val();
    var branchBaseName = $("#targetBranchName").val();
    var message = $("#message").val();

    $.ajax({

        url: PULL_REQUEST_URL,
        data: {
            "branchTargetName": branchTargetName,
            "branchBaseName": branchBaseName,
            "message": message
        },

        success: function () {
            alert("in success function");
        },

        error: function (e) {
            alert("in error function");
        }
    });
});
