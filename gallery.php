<div class="vig-gallery">
	<?php
	$args = array(
		'posts_per_page' => $post_limit,
		'post_type' => 'attachment',
		'category_name' => $category
	);
	$attachments = get_posts( $args );
	if ( $attachments ) {
		foreach ( $attachments as $attachment ) { 
		$attachmentSrc = wp_get_attachment_image_src($attachment->ID, 'full');
		$attachmentSrc = $attachmentSrc[0];
		?>
			<div class="vig-gallery-image" data-lightbox="<?php echo $attachmentSrc ?>">
				<?php
				echo wp_get_attachment_image( $attachment->ID, 'thumbnail' );
				?>
			</div>
		<?php } // foreach	
	} // if
	?>
</div><!-- end #vig-gallery -->