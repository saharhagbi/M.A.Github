function checkout(branchName) {

    if (branchName.contains('\\')) {
        createRTB(branchName);
    } else {
        executeCheckout();
    }
}

function executeCheckout() {
    $.ajax({

        url: CHECKOUT_URL,
        data: {BRANCH_NAME: branchName},

        success: function () {
            alert("checkout done!");
        }
    });
}

function createRTB(branchName) {
    var newRTBName = branchName.split("\\");

    $.ajax({

        url: NEW_BRANCH_URL,
        data: {BRANCH_NAME: branchName},

        success: function () {
            alert("checkout done!");
        }
    });

}