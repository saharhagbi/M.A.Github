var PULL_REQUEST_TYPE = "4";


//need to do setInterval
$(function () {
    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": PULL_REQUEST_TYPE},

        success: function (pullRequests) {
            console.log(pullRequests);
            uploadPullRequestData(pullRequests);
        },

        error: function (e) {
            console.log(e.toString());
        }
    });
});


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

function createPullRequest() {

}