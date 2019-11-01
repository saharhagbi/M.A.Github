var COMMIT_URL = "commit";
var COMMIT_MSG = "commitMsg";

function commitChanges() {

    var commitMsg = prompt("Please enter your commit message");
    if (!inputIsValid(commitMsg))
        return;

    $.ajax({

        url: COMMIT_URL,
        data: {"commitMsg": commitMsg},

        success: function () {
            alert("Commit Done!!");
            location.replace("repositoryPage.html");
        },

        error: function () {
            alert("Problem occured while commit changes");
        }
    });
}