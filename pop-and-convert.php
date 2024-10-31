<?php

/**
 * Plugin Name:     	Pop and Convert
 * Plugin URI:      	https://popandconvert.com/
 * Description:     	Pop and Convert is a customizable pop-up and notification WordPress plugin to boost engagement, guide visitors, and generate leads.
 * Author:          	Pop and Convert
 * Author URI:      	https://popandconvert.com/about/
 * Text Domain:     	pop-and-convert
 * Domain Path:     	/languages
 * Version:         	1.0.5
 * Requires at least:	6.3
 * Requires PHP:      	7.4
 * License:           	GPL v3 or later
 * License URI:       	https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package         Pop_And_Convert
 */

defined('ABSPATH') || exit;

/**
 * Main plugin file.
 *
 * @since 1.0.0
 */
defined('POP_AND_CONVERT_PLUGIN_FILE__') || define('POP_AND_CONVERT_PLUGIN_FILE__', __FILE__);

/**
 * Plugin directory.
 *
 * @since 1.0.0
 */
defined('POP_AND_CONVERT_PLUGIN_DIR__') || define('POP_AND_CONVERT_PLUGIN_DIR__', plugin_dir_path(POP_AND_CONVERT_PLUGIN_FILE__));
defined('POP_AND_CONVERT_PLUGIN_URL__') || define('POP_AND_CONVERT_PLUGIN_URL__', plugin_dir_url(POP_AND_CONVERT_PLUGIN_FILE__));

defined( 'POP_AND_CONVERT_VERSION' ) || define( 'POP_AND_CONVERT_VERSION', '1.0.5' );

// function to load main class.
function pop_and_convert_load(){
	require_once POP_AND_CONVERT_PLUGIN_DIR__ . 'includes/class-plugin.php';
}

/**
 * Initialize plugin.
 */
pop_and_convert_load();
