var PULL_REQUEST_TYPE = "4";
var USER_INFO = "userinfo"

//need to do setInterval


/*----------------------------------------------------bringing the pull requests----------------------------------------------------*/

/*variablesForCardBody:*/

var beginTillName = "<div class=\"card\" style=\"width: 18rem;\">\n" +
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

        $(beginTillName + repositoryNameLabel + element.repositoryName + '</h5>' +
            '<p class="card-text">' + element.message + '</p>' +
            middleTillID + idLabel + element.id + '</li>' +
            elementInCard + branchBaseLabel + element.baseBranchName + '</li>' +
            elementInCard + branchTargetLabel + element.targetBranchName + '</li>' + " <div class=\"card-body\">" +
            `<a href="#" class=\"card-link\" id=\"${approve}\">Approve</a>\n` +
            `<a href="#" class=\"card-link\" id=\"${denie}\">Denie</a>\n` +
            `<a href="#" class=\"card-link\" id=\"${watch}\">Watch</a>\n` + '</div></div>'
        ).appendTo($("#pullRequestsCards"));

        $("#approve").click(function () {
            ajaxUpdateStatus("approve");
        });


        $("#watch").click(function () {
            //open watch pull request data
        });

        $("#denie").click(function () {
            ajaxUpdateStatus("approve");
        });
    });


    /*
   <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Repository Name</h5>
        <p class="card-text">pr of master to test.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">id: 1</li>
        <li class="list-group-item">Base branch: master</li>
        <li class="list-group-item">target branch: fitcher 1</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Approve</a>
        <a href="#" class="card-link">Denie</a>
        <a href="#" class="card-link">Watch</a>

    </div>
</div>
    */

    /*private Status status;
    private String userName;
    private String targetBranchName; // my branch
    private String baseBranchName; // merge to branch
    private String message;
    private int id;*/


}
