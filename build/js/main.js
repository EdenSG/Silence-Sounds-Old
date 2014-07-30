$(function() {
    $("#silence-title").load("silence-title.html");
    $("#main-nav").load("main-nav.html");
    $("#menu-button").bind("tap", function(e) {
    	$(this).toggleClass("shown");
        $("#main-nav").toggleClass("shown");
    });
});
