<?php
/*
Plugin Name: Custom Repeater Block
*/

function custom_repeater_block_init() {

    wp_register_script(
        'custom_repeater_block_script',
        plugins_url( 'js/custom_repeater_block_script.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );

    wp_register_style(
        'custom_repeater_block_style',
        plugins_url( 'css/custom_repeater_block_style.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom_repeater_block_style.css' )
    );

    register_block_type( 'custom-repeater-block/repeater', array(
        'editor_script' => 'custom_repeater_block_script',
        'style'  => 'custom_repeater_block_style',
    ) );

    wp_register_script(
        'custom_repeater_block_row_script',
        plugins_url( 'js/custom_repeater_block_row_script.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' )
    );

    register_block_type( 'custom-repeater-block/repeater-row', array(
        'editor_script' => 'custom_repeater_block_row_script',
    ) );

}
add_action( 'init', 'custom_repeater_block_init' );