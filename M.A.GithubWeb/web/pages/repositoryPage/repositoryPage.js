var repositoryName = 0;
var userName = 1;
var BRANCH_TYPE = "1";
var COMMIT_TYPE = "2";
var NAME_TYPE = "3";
var REPOSITORY_TYPE = "5";
var YES = "Yes";
var CHECKOUT_URL = "checkout";
var BRANCH_NAME = "branchName";
export let isLocalRepository;
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
                $("#pushBranchSection").append("<button type=\"button\" onclick=\"pushBranch()\">Push Branch</button>")
                $("#pullSection").append("<button type=\"button\" onclick=\"pull()\">Pull</button>")
                $("#createPullRequest").append("<button type=\"button\" onclick=\"createPullRequest()\">Pull Branch</button>")

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
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": BRANCH_TYPE},

        success: function (branches) {

            console.log(branches);

            $.each(branches || [], function (index, branch) {
                console.log("Adding branch #" + index + ": " + branch.m_BranchName);
                //create a new <option> tag with a value in it and
                //appeand it to the #userslist (div with id=userslist) element

                $("#branches").append("<li><button type=\"button\" id=" + "\"" + branch.m_BranchName + "\"" + ">" + branch.m_BranchName + "</button></li>");

                $("#" + branch.m_BranchName).click(function () {
                    checkout(branch.m_BranchName)
                })
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

/*--------------------------------------------checkout--------------------------------------------------*/
function checkout(branchName) {

    $.ajax({

        url: CHECKOUT_URL,
        data: {BRANCH_NAME: branchName},

        success: function () {
            alert("checkout done!");
        }
    });
}

