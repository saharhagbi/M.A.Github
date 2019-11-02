var repositoryName = 0;
var userName = 1;
var ALL_BRANCHES = "1";
var COMMIT_TYPE = "2";
var NAME_TYPE = "3";
var REPOSITORY_TYPE = "5";
var YES = "Yes";
var CHECKOUT_URL = "checkout";
var refreshBranches = 1000;
var REPOSITORY_INFO_URL = "repositoryInfo";
var SHOW_COMMIT_FILE_SYSTEM_SERVLET = "ShowCommitFileSystemServlet"
var FILE_SYSTEM_INFO_URL = "fileSystemServlet";
var CHANGE_FILE_SERVLET_URL = "ChangeFileServlet";
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
                $("#pushBranchSection").append("<button type=\"button\" onclick=\"addAllBranchesForPushing()\">Push Branch</button>")
                $("#pullSection").append("<button type=\"button\" onclick=\"pull()\">Pull</button>")
                $("#createPullRequest").append("<button type=\"button\" onclick=\"createPullRequest()\">Create Pull Request</button>")

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
        data: {"requestType": ALL_BRANCHES},

        success: function (branches) {

            console.log(branches);

            $.each(branches || [], function (index, branch) {
                console.log("Adding branch #" + index + ": " + branch.m_BranchName);
                //create a new <option> tag with a value in it and
                //appeand it to the #userslist (div with id=userslist) element

                var brancNameTrimmed = branch.m_BranchName;

                if (brancNameTrimmed.includes(" ") || brancNameTrimmed.includes("/")) {
                    brancNameTrimmed = brancNameTrimmed.replace(/ /g, "_").replace("/", "_");
                }

                $("#branches").append("<li>" + branch.m_BranchName + "</li>");

                /*$("#" + brancNameTrimmed).click(function () {
                        checkout(branch.m_BranchName)
                })*/
            });
        }
    });
});


/*---------------------------request Commits-------------------------------------------*/

function showFileContent_ShowOnly(file, commit) {
    $("#FileSystemShow_ShowOnly").empty();
    $("<button class='btn btn-success btn-sm' type=\"button\" id=\"GoBackButton_ShowOnly\">Go Back</button>").appendTo("#FileSystemShow_ShowOnly");
    $("#GoBackButton_ShowOnly").click(function () {
        $.ajax({
            url: SHOW_COMMIT_FILE_SYSTEM_SERVLET,
            dataType: "json",
            data: {"commitSha1": commit, "path": file.m_ParentFolderPath, "isRootFolder": "false"},

            success: function (folder) {
                showFolderItems_ShowOnly(folder,commit);
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });
    $("<textarea id='contentTextArea_ShowOnly' placeholder='type new content here'>" + file.m_FileContent + "</textarea>").appendTo("#FileSystemShow_ShowOnly");
    $("#contentTextArea_ShowOnly").prop("disabled", true);
}

function showFolderItems_ShowOnly(folderInfo, commitSha1) {
    $("#FileSystemShow_ShowOnly").empty();
    $("<button class='btn btn-success btn-sm' type=\"button\" id=\"GoBackButton_ShowOnly\">Go Back</button>").appendTo("#FileSystemShow_ShowOnly");
    $("<th id='NameOfFolder_ShowOnly'>" + folderInfo.m_ItemName + "</th>").appendTo("#FileSystemShow_ShowOnly");
    var wc = "workingCopy";
    $("#GoBackButton_ShowOnly").click(function () {
        $.ajax({
            url: SHOW_COMMIT_FILE_SYSTEM_SERVLET,
            dataType: "json",
            data: {"path": folderInfo.m_ParentFolderPath, "isRootFolder": "false", "commitSha1": commitSha1},

            success: function (folderInfo) {FileSystemShow_ShowOnly
                showFolderItems_ShowOnly(folderInfo, commitSha1);
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });


    $.each(folderInfo.m_ItemInfos || [], function (index, item) {
        var td = "<td>" + item.m_ItemName + "</td>";
        $("<tr id=" + index + wc + ">" + td + "</tr>").appendTo("#NameOfFolder_ShowOnly");

        if (item.m_ItemType == "folder") {
            $("#" + index + wc).click(function () {
                $.ajax({
                    url: SHOW_COMMIT_FILE_SYSTEM_SERVLET,
                    dataType: "json",
                    data: {"commitSha1": commitSha1, "path": item.m_ItemPath, "isRootFolder": "false"},

                    success: function (folder) {
                        showFolderItems_ShowOnly(folder, commitSha1);
                    },
                    error: function () {
                        console.log("couldnt get the requested folder");
                    }
                })
            });

        } else if (item.m_ItemType == "file") {
            $("#" + index + wc).click(function () {
                $.ajax({
                    url: SHOW_COMMIT_FILE_SYSTEM_SERVLET,
                    dataType: "json",
                    data: {"commitSha1": commitSha1, "path": item.m_ItemPath, "isRootFolder": "false"},

                    success: function (file) {
                        showFileContent_ShowOnly(file, commitSha1);
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
                        "<td scope=\"row\" id=" + index + ">" + element.sha1 + "</td>" +
                        "<td >" + element.message + "</td>" +
                        "<td>" + element.creator + "</td>" +
                        "<td>" + element.branchPointed + "</td>" +
                        "</tr>").appendTo($("#commitsTable"));


                    $("#" + index).click(function () {
                        $.ajax({
                            url: SHOW_COMMIT_FILE_SYSTEM_SERVLET,
                            dataType: "json",
                            data: {"isRootFolder": "true", "commitSha1": element.sha1},

                            success: function (folderInfo) {
                                console.log(folderInfo);
                                showFolderItems_ShowOnly(folderInfo, element.sha1);

                            },
                            error: function () {
                                console.log("couldnt get commit root folder info");
                            }

                        })

                    })
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
    $("#DeleteButton").remove();
    $("#NewFileButton").remove();
    $("<button class='btn btn-success btn-sm' type=\"button\" id=\"NewFileButton\">New FIle</button>").appendTo("#FileSystemShow");
    $("<th id='NameOfFolder'>" + folderInfo.m_ItemName + "</th>").appendTo("#FileSystemShow");
    var wc = "workingCopy";
    $("#GoBackButton").click(function () {
        $.ajax({
            url: FILE_SYSTEM_INFO_URL,
            dataType: "json",
            data: {"itemName": folderInfo.m_ItemName, "path": folderInfo.m_ParentFolderPath, "isRootFolder": "false"},

            success: function (folder) {
                showFolderItems(folder);
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });

    $("#NewFileButton").click(function (){
        $("<textarea class=\"form-control\" id=\"newFileTextArea\">type here the contenet of the new file</textarea>").appendTo("#FileSystemShow");
        $("#SaveButton").click(function () {
            var newContent = $("#newFileTextArea").val();
            $("#newFileTextArea").remove();
            var nameOfNewFile = prompt("Please enter the name of the new File", "newFile");
                $.ajax({
                    url: CHANGE_FILE_SERVLET_URL,
                    dataType: "json",
                    data: {"newContent": newContent, "path": folderInfo.m_ItemPath, "changeOrDelete": "new","newName":nameOfNewFile},
                    error: function () {
                        console.log("couldnt create new file");
                    }
                })


            })
    });


    $.each(folderInfo.m_ItemInfos || [], function (index, item) {
        var td = "<td>" + item.m_ItemName + "</td>";
        $("<tr id=" + index + wc + ">" + td + "</tr>").appendTo("#NameOfFolder");

        if (item.m_ItemType == "folder") {
            $("#" + index + wc).click(function () {
                $.ajax({
                    url: FILE_SYSTEM_INFO_URL,
                    dataType: "json",
                    data: {"itemName": item.m_ItemName, "path": item.m_ItemPath, "isRootFolder": "false"},

                    success: function (folder) {
                        showFolderItems(folder);
                    },
                    error: function () {
                        console.log("couldnt get the requested folder");
                    }
                })
            });

        } else if (item.m_ItemType == "file") {
            $("#" + index + wc).click(function () {
                $.ajax({
                    url: FILE_SYSTEM_INFO_URL,
                    dataType: "json",
                    data: {"itemName": item.m_ItemName, "path": item.m_ItemPath, "isRootFolder": "false"},

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
    $("#SaveButton").remove();
    $("#NewFileButton").remove();
    $("<button class='btn btn-success btn-sm' type=\"button\" id=\"DeleteButton\">Delete File</button>").appendTo("#FileSystem");
    $("<button class='btn btn-success btn-sm' type=\"button\" id=\"SaveButton\">Save Changes</button>").appendTo("#FileSystem");
    $("#DeleteButton").click(function () {
        $.ajax({
            url: CHANGE_FILE_SERVLET_URL,
            dataType: "json",
            data: {"itemName": fileInfo.m_ItemName, "path": fileInfo.m_ItemPath, "changeOrDelete": "delete"},

            success: function (folder) {
                $("#FileSystemShow").empty();
                $("<p><i>File Deleted</i></p>").appendTo("#FileSystemShow");
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });

    $("#SaveButton").click(function () {

        var newContent = $("#contentTextArea").val();
        $.ajax({
            url: CHANGE_FILE_SERVLET_URL,
            dataType: "json",
            data: {"newContent": newContent, "path": fileInfo.m_ItemPath, "changeOrDelete": "change"},

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
            data: {"itemName": fileInfo.m_ItemName, "path": fileInfo.m_ParentFolderPath, "isRootFolder": "false"},

            success: function (folder) {
                showFolderItems(folder);
            },
            error: function () {
                console.log("couldnt get the requested folder");
            }
        })
    });
    $("<textarea class=\"form-control\" id='contentTextArea' placeholder='type new content here'>" + fileInfo.m_FileContent + "</textarea>").appendTo("#FileSystemShow");
}