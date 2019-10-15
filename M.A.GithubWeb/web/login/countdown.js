var refreshRate = 2000; //milli seconds
var counter = 0;

function counting() {
    /*$("#counter").
    counter ++;*/
}

$(function () {
    //The users list is refreshed automatically every second
    setInterval(counting, refreshRate);
});