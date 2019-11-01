var repositoryName = 0;
var userName = 1;
var BRANCHES = "1";
var COMMIT_TYPE = "2";
var NAME_TYPE = "3";
var REPOSITORY_TYPE = "5";
var YES = "Yes";
var CHECKOUT_URL = "checkout";
var refreshBranches = 1000;
var FILE_SYSTEM_INFO_URL = "fileSystemServlet";
var DELETE_FILE_SERVLET_URL = "DeleteFileServlet";
// export let isLocalRepository;

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
    $("#branches").empty();

    $.ajax({

        url: REPOSITORY_INFO_URL,
        dataType: "json",
        data: {"requestType": BRANCHES},

        success: function (branches) {

            console.log(branches);

            $.each(branches || [], function (index, branch) {
                console.log("Adding branch #" + index + ": " + branch.m_BranchName);
                //create a new <option> tag with a value in it and
                //appeand it to the #userslist (div with id=userslist) element

                var brancNameTrimmed = branch.m_BranchName;

                if (brancNameTrimmed.includes(" ")) {
                    brancNameTrimmed = brancNameTrimmed.replace(" ", "_");
                }

                $("#branches").append("<li><button type=\"button\" id=" + "\"" + brancNameTrimmed + "\"" + ">" + branch.m_BranchName + "</button></li>");

                $("#" + brancNameTrimmed).click(function () {
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

/*---------------------------request root foler and show subFlders and files-------------------------------------------*/
$(function () {
    $.ajax({

        url: FILE_SYSTEM_INFO_URL,
        dataType: "json",
        data: {"isRootFolder": "true"},

        success: function (rootFolderInfo) {
            console.log("got the list of items from servlet");
            showFolderItems(rootFolderInfo);
        },
        error: function () {
            console.log("couldnt get root folder");
        }
    });
});

function showFolderItems(folderInfo) {
    $("#FileSystemShow").empty();
    $("<th id=" + folderInfo.m_ItemSha1 + ">" + folderInfo.m_ItemName + "</th>").appendTo("#FileSystemShow");
    $("#GoBackButton").click(function () {
        $.ajax({
            url: FILE_SYSTEM_INFO_URL,
            dataType: "json",
            data: {"itemName": folderInfo.m_ItemName, "itemSha1": folderInfo.m_ParentFolderSha1,"isRootFolder":"false"},

            success: function (folder) {
                showFolderItems(folder);
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });


    $.each(folderInfo.m_ItemInfos || [], function (index, item) {
        var td = "<td>"+item.m_ItemName+"</td>";
        $("<tr id=" + item.m_ItemSha1 + ">" + td + "</tr>").appendTo("#"+folderInfo.m_ItemSha1);

        if (item.m_ItemType == "folder") {
            $("#" + item.m_ItemSha1).click(function () {
                $.ajax({
                    url: FILE_SYSTEM_INFO_URL,
                    dataType: "json",
                    data: {"itemName": item.m_ItemName, "itemSha1": item.m_ItemSha1,"isRootFolder":"false"},

                    success: function (folder) {
                        showFolderItems(folder);
                    },
                    error: function () {
                        console.log("couldnt get the requested folder");
                    }
                })
            });

        } else if (item.m_ItemType == "file") {
            $("#" + item.m_ItemSha1).click(function () {
                $.ajax({
                    url: FILE_SYSTEM_INFO_URL,
                    dataType: "json",
                    data: {"itemName": item.m_ItemName,"itemSha1":item.m_ItemSha1,"isRootFolder":"false"},

                    success: function (file) {
                        showFileContent(file);
                    },
                    error: function () {
                        console.log("couldnt get the requested file");
                    }
                })
            });
        } else {
            console.log("the item is no good - it's type is neither FOLDER nor FILE")
        }

    });
}

function showFileContent(fileInfo) {
    $("#FileSystemShow").empty();
    $("#DeleteButton").remove();
    $("<button type=\"button\" id=\"DeleteButton\">Delete File</button>").appendTo("#FileSystem");

    $("#DeleteButton").click(function () {
        $.ajax({
            url: DELETE_FILE_SERVLET_URL,
            dataType: "json",
            data: {"itemName": fileInfo.m_ItemName, "itemSha1": fileInfo.m_ItemSha1},

            success: function (folder) {
                $("#FileSystemShow").empty();
                $("<p><i>File Deleted</i></p>").appendTo("#FileSystemShow");
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });



    $("#GoBackButton").click(function () {
        $.ajax({
            url: FILE_SYSTEM_INFO_URL,
            dataType: "json",
            data: {"itemName": fileInfo.m_ItemName, "itemSha1": fileInfo.m_ParentFolderSha1,"isRootFolder":"false"},

            success: function (folder) {
                showFolderItems(folder);
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });
    $("<textarea placeholder='type new content here'>"+fileInfo.m_FileContent+"</textarea>").appendTo("#FileSystemShow");
}