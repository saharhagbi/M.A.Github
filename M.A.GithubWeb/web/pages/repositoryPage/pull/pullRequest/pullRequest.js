var PULL_REQUEST_TYPE = "4";
var PULL_REQUEST_URL = "pullrequest";


//need to do setInterval

function uploadPullRequestData(pullRequests) {

    $(pullRequests).each(function (index, element) {

        console.log(element);

        $("<tr>" +
            "<td>" + element.message + "</td>" +
            "<td>" + "<input type='button' value='Confirm' id=ButtonConfirmed" + index + ">" + "</td>" +
            "<td>" + "<input type='button' value='Denied' id=ButtonDenied" + index + ">" + "</td>" +
            "</tr>").appendTo($("#pullRequestsTable"));

        $("#ButtonConfirmed" + index).click(function () {
            changeStatusConfirmed(element)
        });

        $("#ButtonDenied" + index).click(function () {
            changeStatusDenied(element)
        });
    });
}

function changeStatusConfirmed(pullRequest) {
    alert("In Change status confirmed" + pullRequest);
}

function changeStatusDenied(pullRequest) {
    alert("In change status denied" + pullRequest);
}

$("#check").on('click', function () {

    console.log($("#baseBranchName").val());
    console.log($("#targetBranchName").val());
    console.log($("#message").val());

    var branchTargetName = $("#baseBranchName").val();
    var branchBaseName = $("#targetBranchName").val();
    var message = $("#message").val();

    $.ajax({

        url: PULL_REQUEST_URL,
        dataType: "json",
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

