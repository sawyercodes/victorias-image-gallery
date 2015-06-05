(function($) {
	//set gallery variables
	var vigGallery = $('.vig-gallery');
	var vigThumb = $('.vig-gallery-image');
	//add pointer to thumbs
	vigThumb.css('cursor', 'pointer');
	//add lightbox
	$('body').append('<div id="vig-lightbox"><div id="vig-lightbox-container"><div id="close">Close</div><img src="" class="vig-lightbox-image" /><div id="left">Previous</div><div id="right">Next</div></div></div>');
	//set lightbox variables
	var vigLightbox = $('#vig-lightbox');
	var vigLbCont = $('#vig-lightbox-container');
	var vigLbImg = $('.vig-lightbox-image');
	var close = $('#close');
	var left = $('#left');
	var right = $('#right');

	//add incrementing id to each lightbox on the page
	var i = 0;
	vigGallery.each(function() {
		i++;
		$(this).attr('id', 'lightbox-' + i);
	});

	//open lightbox on click
	vigThumb.click(function() {
		//get the unique id of the lightbox gallery and add it to lighbox
		var lightboxID = ($(this).parent().attr('id'));
		vigLightbox.attr('data-name', lightboxID);
		//set current thumb to active
		$(this).attr('id', 'active');
		//show lightbox
		$(vigLightbox).css('display', 'table');
		//hide image until it loads
		$(vigLbImg).hide(0);
		//set image src
		var src = $(this).data('lightbox');
		var vigLbImg = $('.vig-lightbox-image');
		$(vigLbImg).attr('src', src);
		//show image
		$(vigLbImg).load(function() {
			$(vigLbImg).show();
		})
	})

	//position lightbox buttons
	vigLbImg.load(function() {
		var bodyW = $('body').width();
		var bodyH = $('body').height();
		//set height of image
		vigLbImg.css('max-height', bodyH / 2)
		var width = vigLbImg.width();
		var height = vigLbImg.height();
		var pos = (bodyW - width) / 2;
		//set close position
		close.width(width);
		close.css('padding-left', pos + 'px');
		//set left and right positions
		left.css('left', pos + 'px')
		right.css('right', pos + 'px')
	})

	//create close function
	function closeImg() {
		vigLightbox.css('display', 'none');
		$('#active').removeAttr('id');
	}// closeImg

	//create previous image function
	function prevImg() {
		//get the name of the current lightbox and find all its thumbs
		var thisLightbox = vigLightbox.attr('data-name');
		var thumbs = $('#' + thisLightbox).find('.vig-gallery-image');
		var x = thumbs.length;
		//var y = $('#active').index(thumbs);
		var y = $('#active').index();
		$('#active').removeAttr('id');
		var z = y - 1;
		//if on the first image
		if (z == -1) {
			var z = x - 1;
		}
		var prev = thumbs.get(z);
		$(prev).attr('id', 'active');
		var src = $(prev).data('lightbox');
		vigLbImg.attr('src', src);
	}// prevImg

	//create next image function
	function nextImg() {
		//get the name of the current lightbox and find all its thumbs
		var thisLightbox = vigLightbox.attr('data-name');
		var thumbs = $('#' + thisLightbox).find('.vig-gallery-image');
		var x = thumbs.length;
		var y = $('#active').index();
		$('#active').removeAttr('id');
		var z = y + 1;
		//if on the last image
		if (z == x) {
			var z = 0;
		}
		var prev = thumbs.get(z);
		$(prev).attr('id', 'active');
		var src = $(prev).data('lightbox');
		vigLbImg.attr('src', src);
	}// nextImg

	//Run lightbox buttons functions
	close.click(function() {
		closeImg();
	})
	left.click(function() {
		prevImg();
	})
	right.click(function() {
		nextImg();
	})
	//Close lightbox when background is clicked
	vigLightbox.click(function() {
		closeImg();
	})

	// Key presses
	$(document).on('keyup',function(keypress) {
		// Escape key
	    if (keypress.keyCode == 27) {
	       closeImg();
	    }
	    // Left arrow
	    if (keypress.keyCode == 37) {
			prevImg();
	    }
	    // Right arrow
	    if (keypress.keyCode == 39) {
			nextImg();
	    }
	})// Keypresses

	//Stop bubbling so the buttons dont close lightbox
	close.on('click', function (e){
	  e.stopPropagation();
	});
	left.on('click', function (e){
	  e.stopPropagation();
	});
	right.on('click', function (e){
	  e.stopPropagation();
	});
	vigLbImg.on('click', function (e){
	  e.stopPropagation();
	});





})( jQuery );

