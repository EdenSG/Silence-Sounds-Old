$(function() {
	var 
    $("#silence-title").load("silence-title.html");
    $("#main-nav").load("main-nav.html");
    $("#menu-button").bind("tap", function(e) {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $("#main-nav").removeClass("shown");
            $("#main-nav a").focus(function() {
                $(this).blur();
            });
        } else {
            $(this).addClass('shown');
            $("#main-nav").addClass("shown");
            $("#main-nav a").eq(0).focus();
        }
    });
});
