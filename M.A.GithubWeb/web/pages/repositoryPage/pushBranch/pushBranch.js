var PUSH_BRANCH_URL = "pushBranch";
var LOCAL_BRANCHES = "6";
var BRANCH_NAME = "branchName";
var FOR_PUSHING = "forPushingBranch";

function showAllBranches(branches) {
    $.each(branches || [], function (index, branch) {
        console.log("Adding branch #" + index + ": " + branch.m_BranchName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element

        var branchNameID = branch.m_BranchName;

        if (branchNameID.includes(" ")) {
            branchNameID = branchNameID.replace(" ", "_");
        }

        branchNameID += FOR_PUSHING;

        $("#branchesList").append("<li><button type=\"button\" id=" + "\"" + branchNameID + "\"" + ">" + branch.m_BranchName + "</button></li>");

        $("#" + branchNameID).click(function () {
            pushBranch(branch.m_BranchName);
        })
    });
}

function showBranchesListForPushing() {
    $.ajax({
        url: REPOSITORY_INFO_URL,
        data: {"requestType": LOCAL_BRANCHES},

        success: function (branches) {
            console.log(branches);
            $("#branchesList").empty();

            if ((branches === undefined) || (branches.length == 0))
                $("#branchesList").append("<h4>There are no local branches</h4>");
            else {
                $("#branchesList").append("<h4>Choose Branch for pushing</h4>");

                showAllBranches(branches);
            }
        }
    });
}

function pushBranch(branch) {

    $.ajax({

        url: PUSH_BRANCH_URL,
        data: {
            "branchName": branch,
        },

        success: function () {
            alert("Branch Pushed Successfully");
        },
        error: function () {
            alert("Problem occured while creating local branch");
        }
    });
}


