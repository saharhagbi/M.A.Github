var PUSH_BRANCH_URL = "pushBranch";


function pushBranch(branch) {
    $.ajax({

        url: PUSH_BRANCH_URL,
        data: {
            "branchName": branch,
        },

        success: function () {
            alert("IN Push branch");
        },
        error: function () {
            alert("Problem occured while creating local branch");
        }
    });

}

