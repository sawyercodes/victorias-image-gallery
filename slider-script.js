(function($) {

	//set variables
	var slider = $('.vig-slider');
	var slides = $('.vig-slides');
	var imageCont = $('.vig-slide-image');
	var image = $('.vig-slide-image img');
	//set width of slider
	var width = slider.width();
	//set width of list items
	imageCont.width(width);

	//set height if no user height set
	var noHeight = $('.slider-no-height');
	noHeight.height(width * 0.45);

	//get height
	var height = slider.height();
	//set height of list items
	imageCont.height(height);
	imageCont.css('line-height', height + "px");

	//set image size
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
		//is image too tall
		if (imageH > height) {
			$(this).removeClass('vig-landscape');
			$(this).addClass('vig-portrait');
		}
	})


	//setup current slide
	var currentSlide = 1;
	//count slides
	var x = imageCont.length;
	//animation
	var animationSpeed = 1200;
	var pause = 3500;

	var sliderLoop;

	function startSlider() {
		sliderLoop = setInterval(function() {
			slides.animate({'margin-left': '-=' + width}, animationSpeed, function() {
				currentSlide++;
				//if on last slide
				if ( currentSlide == x ) {
					currentSlide = 1;
					slides.css('margin-left', 0);

				};//end if 
			});// end animate
		}, pause);
	}

	function stopSlider() {
		clearInterval(sliderLoop)
	}

	//pause on mouse hover
	slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

	startSlider();



})( jQuery );

