var USER_LIST_URL = "../../userslist";
var All_REPOSITORIES_DETAILS_URL = "allRepositoriesDetails";
var refreshRate = 2000;


/*-----------------------------------refreshRepositoryTable-------------------------------------*/

function uploadRepositoryData(repositories) {
    //$("#repositoryDetails").empty();


    $(repositories).each(function (index, element) {
        console.log(element);
        console.log(element.repositoryName);

        $("<tr>" +
            "<th >" + element.repositoryName + "</th>" +
            "<th>" + element.latestCommit + "</th>" +
            "<th>" + element.message + "</th>" +
            "<th>" + element.activeBranch + "</th>" +
            "<th >" + element.commitAmount + "</th>" +
            "</tr>").appendTo($("#repositoriesDetails"));
    })

    /*$("#repoName").text(repositories[0].repositoryName);
    $("#latestCommit").text(repositories[0].latestCommit);
    $("#message").text(repositories[0].message);
    $("#activeBranch").text(repositories[0].activeBranch);
    $("#commitAmount").text(repositories[0].commitAmount);*/
}

$(function () {

    console.log("its working!");
    $.ajax({

        url: All_REPOSITORIES_DETAILS_URL,
        success: function (repositories) {
            console.log(repositories);

            uploadRepositoryData(repositories);
        },
        error: function () {
            console.log("rttt");
        }
    });
});
