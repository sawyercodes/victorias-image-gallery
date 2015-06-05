<?php
/*
Plugin Name: Victoria's Image Gallery
Plugin URI: http://victoriasawyer.com
Description: Create image galleries and sliders automatically by category.
Version: 1.0
Author: Victoria Sawyer
Author URI: http://victoriasawyer.com
License: GPL2
*/

//Add Categories taxonomy
function vig_add_category_to_attachments() {
    register_taxonomy_for_object_type( 'category', 'attachment' );
}
add_action( 'init' , 'vig_add_category_to_attachments' );

//Enqueue scripts
function vig_gallery_scripts() {
	wp_enqueue_style( 'vig-gallery-style', plugins_url('stylesheet.css', __FILE__ ) );
	wp_register_script( 'vig-lightbox-script', plugins_url( 'lightbox-script.js' , __FILE__ ), array(), '1.0.0', true );
    wp_register_script( 'vig-slider-script', plugins_url( 'slider-script.js' , __FILE__ ), array(), '1.0.0', true ); 
}

add_action( 'wp_enqueue_scripts', 'vig_gallery_scripts' );

function vig_gallery_create( $atts, $content = null, $tag ) {
    extract( shortcode_atts(  array(
        'category' => '',
        'lightbox' => '',
        'post_limit' => '-1',
        //'slider_height' => '',
        'slider_image' => 'full'
    ), $atts ) );
    switch( $tag ) {
        case "vig_gallery":
            ob_start();
                include 'gallery.php';
                //run lightbox script if attribute is true
                if($atts['lightbox'] == 'true') {
                    wp_enqueue_script('vig-lightbox-script');
                }
            return ob_get_clean();
            break;
        case "vig_slider":
            if($atts['slider_height'] == '') {
                $noHeight = 'slider-no-height';
            }
            ob_start();
                include 'slider.php';
                wp_enqueue_script('vig-slider-script');
            return ob_get_clean();
            break;
    }
    //if ( $category != '' )
        //return '<iframe width="' . $w . '" height="' . $h . '" src="' . $src . $id . '" class="iframevideo"></iframe>';
    //return;
}
add_shortcode( 'vig_gallery', 'vig_gallery_create' );
add_shortcode( 'vig_slider', 'vig_gallery_create' );

?>