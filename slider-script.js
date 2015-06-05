(function($) {

	//set variables
	var slider = $('.vig-slider');
	var slides = $('.vig-slides');
	var imageCont = $('.vig-slide-image');
	var image = $('.vig-slide-image img');

	//add incrementing id to each slider on the page
	var i = 0;
	slider.each(function() {
		i++;
		$(this).attr('id', 'slider-' + i);
	});

	//for each slider
	slider.each(function() {
		//get unique slider id
		var sliderID = $(this).attr('id');
		//get wdth of slider
		var width = $('#' + sliderID).width();
		//set width of slides
		$(this).find('.vig-slide-image').width(width);

		//if slider height is not set set height to 45% its width
		if ($(this).hasClass('slider-no-height')) {
			$(this).height(width * 0.45);
		}
		var height = $(this).height();
		$(this).find('.vig-slide-image').height(height);
		$(this).find('.vig-slide-image').css('line-height', height + 'px');

		var image = $(this).find('.vig-slide-image img');
		image.each(function() {
			var imageW = $(this).width();
			var imageH = $(this).height();
			//is image a square
			if (imageW === imageH) {
				$(this).addClass('vig-square');
			}
			//is image a landscape
			if (imageW > imageH) {
				$(this).addClass('vig-landscape');
			}
			//is image a portrait
			if (imageW < imageH) {
				$(this).addClass('vig-portrait');
			}
			var imageW = $(this).width();
			var imageH = $(this).height();
			//is image too tall
			if (imageH > height) {
				$(this).removeClass('vig-landscape');
				$(this).addClass('vig-portrait');
			}
		});

		var width = $(this).width();
		var thisSlider = $(this);
		var theseSlides = $(this).find('.vig-slides');

		var currentSlide = 1;
		var x = $(this).find('.vig-slide-image').length;

		//animation
		var animationSpeed = 1200;
		var pause = 3500;

		var loop;

		function start() {
			loop = setInterval(function() {
				theseSlides.animate({'margin-left': '-=' + width}, animationSpeed, function(){
					currentSlide++;
					if (currentSlide == x) {
						currentSlide = 1;
						console.log(currentSlide);
						theseSlides.css('margin-left', 0);
					};
				})
			}, pause);
		}

		function stop() {
			clearInterval(loop);
		}

		start();

		$(this).on('mouseenter', stop).on('mouseleave', start);

	});


})( jQuery );

