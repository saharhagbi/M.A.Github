var PULL_REQUEST_TYPE = "4";
var USER_INFO = "userinfo";
var WATCH_PR_URL = "watchPR";
var SEND_NOTIFICATION_URL = "sendnotification";

//need to do setInterval


/*----------------------------------------------------bringing the pull requests----------------------------------------------------*/

/*variablesForCardBody:*/

var card = "card";

var beginTillName = "class=\"card\" style=\"width: 18rem;\">\n" +
    "<div class=\"card-body\">\n" +
    "<h5 class=\"card-title\">";

var middleTillID = " </div>\n" +
    "<ul class=\"list-group list-group-flush\">\n" +
    "<li class=\"list-group-item\">";

var elementInCard = "<li class=\"list-group-item\">";

/*variablesForLabels:*/

var repositoryNameLabel = "Repository Name: ";
var idLabel = "ID: ";
var branchBaseLabel = "Branch Base: ";
var branchTargetLabel = "Branch Target: ";


/*----------------------*/
$(function () {

    $.ajax({

        url: USER_INFO,
        dataType: "json",
        data: {
            "dataType": "pullRequests"
        },

        success: function (pullRequests) {
            console.log(pullRequests);

            alert("in success function");

            creatingPullRequestsCards(pullRequests);
        },

        error: function (e) {
            alert("in error function");
        }
    })

});


function creatingPullRequestsCards(pullRequests) {

    var approve = "approve";
    var denie = "denie";
    var watch = "watch";

    $(pullRequests).each(function (index, element) {

        console.log(element);

        approve += index;
        denie += index;
        watch += index;
        card += index;

        $(`<div id=\"${card}\" ` + beginTillName + repositoryNameLabel + element.repositoryName + '</h5>' +
            '<p class="card-text">' + element.message + '</p>' +
            middleTillID + idLabel + element.id + '</li>' +
            elementInCard + branchBaseLabel + element.baseBranchName + '</li>' +
            elementInCard + branchTargetLabel + element.targetBranchName + '</li>' + " <div class=\"card-body\">" +
            `<a href="#" class=\"card-link\" id=\"${approve}\">Approve</a>\n` +
            `<a href="#" class=\"card-link\" id=\"${denie}\">Denie</a>\n` +
            `<a href="#" class=\"card-link\" id=\"${watch}\">Watch</a>\n` + '</div></div>'
        ).appendTo($("#pullRequestsCards"));

        $("#" + approve).click(function () {
            console.log("click detected");

            ajaxUproveStatus(element);
        });


        $("#" + watch).click(function () {
            console.log("click detected");

            ajaxWatchClick(element);
        });

        $("#" + denie).click(function () {

            console.log("click detected");

            ajaxDenieStatus(element);
        });
    });
}


/*-----------------------------------------------------APPROVED-----------------------------------------------------------*/
function ajaxUproveStatus(element) {


}

/*-----------------------------------------------------DENIED-----------------------------------------------------------*/

function ajaxDenieStatus(element) {

    console.log("click detected");

    var prID = element.id;

    $.ajax({

        url: SEND_NOTIFICATION_URL,
        data: {
            "prID": prID,
            "status": "Denied"
        },


        success: function () {

            alert("in success function");
            console.log("in success function");
        },

        error: function (e) {
            alert("in error function" + e);
        }
    });

}

/*-----------------------------------------------------WATCH-----------------------------------------------------------*/

function ajaxWatchClick(element) {

    window.location.href = 'viewPR/viewPR.html?PRID=' + element.id;
}
