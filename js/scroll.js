$(function() {


	$.scrollify({
		section:".panel",
		//sectionName:false,
		scrollSpeed:1100,
		after:function(i) {


/*
			if(i===2) {
				$.scrollify.setOptions({
					easing:"easeOutExpo"
				});
			}*/

		}
	});

	$(".scroll,.scroll-btn").click(function(e) {
		e.preventDefault();

		$.scrollify.next();



	});


	var hasHovered = false;
	$(".coffee").on("mouseenter focus",function() {
		if(hasHovered===false) {
			ga('send', 'event', 'Coffee', 'hover', 'Buy me a coffee');
			hasHovered = true;
		}
	});

});