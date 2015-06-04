<div class="vig-slider <?php echo $noHeight ?>">
	<ul class="vig-slides">
		<?php
		//loop through images
		$args = array(
			'posts_per_page' => $post_limit,
			'post_type' => 'attachment',
			'category_name' => $category
		);
		$attachments = get_posts( $args );
		if ( $attachments ) {
			foreach ( $attachments as $attachment ) { ?>
				<li class="vig-slide-image">
					<?php
					echo wp_get_attachment_image( $attachment->ID, $slider_image );
					?>
				</li>
			<?php } // foreach	
		} // if
		//loop through images
		$args = array(
			'posts_per_page' => 1,
			'post_type' => 'attachment',
			'category_name' => $category
		);
		$attachments = get_posts( $args );
		if ( $attachments ) {
			foreach ( $attachments as $attachment ) { ?>
				<li class="vig-slide-image">
					<?php
					echo wp_get_attachment_image( $attachment->ID, $slider_image );
					?>
				</li>
			<?php } // foreach	
		} // if
		return;
		?>
	</ul><!-- end .vig-slides -->
</div><!-- end .vig-slider -->