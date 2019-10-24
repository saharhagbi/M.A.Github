var CLONE_SERVLET_URL = "/CloneServlet";
var All_REPOSITORIES_DETAILS_URL = "allRepositoriesDetails";

/*-----------------------------------refreshRepositoryTable-------------------------------------*/


function uploadRepositoryData(repositories) {
    $(repositories).each(function (index, element) {
        var buttonNumber = 0;
        var button = "<input type=\"button\" id =" + buttonNumber + " value=\"click here\">";

        $("<tr id = counter>" +
            "<td>" + button + "</td>" +
            "<td >" + element.repositoryName + "</td>" +
            "<td>" + element.latestCommit + "</td>" +
            "<td>" + element.message + "</td>" +
            "<td>" + element.activeBranch + "</td>" +
            "<td>" + element.commitAmount + "</td>" +
            "</tr>").appendTo($("#repositoriesDetails"));

        $("#" + buttonNumber).click(function (event) {
            console.log(buttonNumber);
            $.ajax({
                url: CLONE_SERVLET_URL,
                /*todo:sendredirect to correct page*/
                data: {"repositoryName": element.repositoryName, "userName": element.userName},
                success: function () {
                    console.log("in success");
                },
                error: function () {
                    console.log("in error");
                },

                return: true
            });
        });

    })

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
