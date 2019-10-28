function checkout(branchName) {

    //check if the currentBranch is rtb
    if (branchName.includes('\\')) {
        createRTB(branchName);
    } else {
        executeCheckout(branchName);
    }
}


function executeCheckout(branchName) {
    $.ajax({

        url: CHECKOUT_URL,
        data: {"branchName": branchName},

        success: function () {
            location.replace("repositoryPage.html");
            alert("checkout done!");
        }
    });
}
