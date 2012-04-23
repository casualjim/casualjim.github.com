		$(document).ready(function() {
			/*
			*   Examples - images
			*/

			$("a#example1").fancybox();

			$("a#example2").fancybox({
				'overlayShow'	: false,
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic'
			});

			$("a.zoom").fancybox({
				'transitionIn'	: 'none',
				'transitionOut'	: 'none'	
			});

		});