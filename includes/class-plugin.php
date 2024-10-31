<?php
/**
 * Plugin Main Class.
 *
 * @since 1.0.0
 * @package Pop_And_Convert
 */

namespace Pop_And_Convert;

/**
 * Plugin main class.
 *
 * @since 1.0.0
 */
class Pop_And_Convert {

	/**
	 * The single instance of the class.
	 *
	 * @var Pop_And_Convert|null
	 */
	protected static $_instance = null;

	public function __construct() {
		$this->define_constants();
		$this->includes();
		$this->register_hooks();
	}

	/**
	 * Main Pop_And_Convert Instance.
	 *
	 * Ensures only one instance of Pop_And_Convert is loaded or can be loaded.
	 *
	 * @return Pop_And_Convert - Main instance.
	 * @since 1.0.0
	 * @static
	 *
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Include required files.
	 *
	 * @since 1.0.0
	 */
	private function includes() {
		require POP_AND_CONVERT_PLUGIN_DIR__ . '/includes/class-notification-rest-controller.php';
		require POP_AND_CONVERT_PLUGIN_DIR__ . '/includes/extras.php';
	}

	/**
	 * Register hooks.
	 *
	 * @since 1.0.0
	 */
	private function register_hooks() {

		add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );

		// Add menu page pop and convert.

		add_action( 'admin_menu', array( $this, 'add_menu_page' ) );

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );

		//Frontend Enqueue
		add_action( 'wp_enqueue_scripts', array( $this, 'public_scripts' ) );

		add_action( 'wp_footer', array( $this, 'notification_on_frontend' ) );

		add_filter( 'wp_kses_allowed_html', array( $this, 'wp_kses_allowed_html' ), 10, 2 );
	}

	/**
	 * Add SVG to allowed HTML.
	 *
	 * @param array $allowedtags
	 * @param mixed $context
	 *
	 * @return array
	 */
	public function wp_kses_allowed_html( array $allowedtags, $context ): array {

		$additional_tags = [];
		if ( 'allow_svg_html' === $context ) {
			$additional_tags = [
				'svg'  => array(
					'class'           => true,
					'aria-hidden'     => true,
					'aria-labelledby' => true,
					'role'            => true,
					'xmlns'           => true,
					'width'           => true,
					'height'          => true,
					'viewbox'         => true,
					'id'              => true,
					"title"           => true,
				),
				'g'    => array( 'fill' => true ),
				'path' => array(
					'id'                => true,
					'd'                 => true,
					'fill'              => true,
					'stroke'            => true,
					'stroke-width'      => true,
					'stroke-linecap'    => true,
					'stroke-linejoin'   => true,
					'stroke-miterlimit' => true,
				),
			];
		} else if ( 'allow_image_html' === $context ) {
			$additional_tags = array(
				'img' => array(
					'class'    => true,
					'src'      => true,
					'srcset'   => true,
					'decoding' => true,
					'alt'      => true,
					'width'    => true,
					'height'   => true,
					'loading'  => true,
					'sizes'    => true,
				),
			);
		}

		return array_merge( $allowedtags, $additional_tags );
	}

	/**
	 * Define constants.
	 *
	 * @since 1.0.0
	 */
	private function define_constants() {
		// Define plugin directory url.
		if ( ! defined( 'POP_AND_CONVERT_PLUGIN_DIR__URL' ) ) {
			define( 'POP_AND_CONVERT_PLUGIN_DIR__URL', plugin_dir_url( POP_AND_CONVERT_PLUGIN_FILE__ ) );
		}
	}

	/**
	 * Load textdomain.
	 *
	 * @since 1.0.0
	 */
	public function load_textdomain() {
		load_plugin_textdomain( 'pop -and- convert', false, POP_AND_CONVERT_PLUGIN_DIR__ . 'languages' );
		add_image_size( 'pac-popup-lay-one', 500, 540, true );
	}

	/**
	 * Add menu page.
	 *
	 * @since 1.0.0
	 */
	public function add_menu_page() {

		add_menu_page(
			__( 'Pop and Convert', 'pop-and-convert' ),
			__( 'Pop and Convert', 'pop-and-convert' ),
			$this->get_user_capability(),
			'pop-and-convert',
			array( $this, 'render_menu_page' ),
			POP_AND_CONVERT_PLUGIN_URL__ . '/includes/assets/admin-pac-icon.png',
			'2.2'
		);

		add_submenu_page(
			'pop-and-convert',
			__( 'Add New', 'pop-and-convert' ),
			__( 'Add New', 'pop-and-convert' ),
			$this->get_user_capability(),
			'pacp-add-setting',
			array( $this, 'render_submenu_page_add_callback' )
		);

		add_submenu_page(
			'pop-and-convert',
			__( 'All Notifications', 'pop-and-convert' ),
			__( 'All Notifications', 'pop-and-convert' ),
			$this->get_user_capability(),
			'pacp-all-setting',
			array( $this, 'render_submenu_page_all_callback' )
		);

		add_submenu_page(
			'pop-and-convert',
			__( 'Settings', 'pop-and-convert' ),
			__( 'Settings', 'pop-and-convert' ),
			$this->get_user_capability(),
			'pacp-global-setting',
			array( $this, 'render_submenu_page_callback' )
		);

		$pages = [
			'pacp-home-setting' => admin_url( 'admin.php?page=pop-and-convert' ),
			'pacp-all-setting'  => admin_url( 'admin.php?page=pop-and-convert#/notifications?q=' ),
			'pacp-add-setting'  => admin_url( 'admin.php?page=pop-and-convert#/notifications/create' ),
		];

		if ( ! isset( $_GET[ 'page' ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return;
		}

		$page_name = sanitize_text_field( wp_unslash( $_GET[ 'page' ] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		if ( ! isset( $pages[ $page_name ] ) ) {
			return;
		}

		wp_safe_redirect( $pages[ $page_name ] );
		exit;

	}

	/**
	 * Check the role of the user and add menu capability accordingly
	 *
	 * @return string
	 */
	public function get_user_capability() {
		$roles = pop_and_convert_get_saved_roles();
		$current_roles = wp_get_current_user()->roles;

		if ( is_array( $current_roles ) ) {
			foreach ( $roles as $role ) {
				if ( in_array( $role, $current_roles ) ) {
					return 'read';
				}
			}
		}

		return 'manage_options';
	}

	/**
	 * Render menu page.
	 *
	 * @since 1.0.0
	 */
	public function render_menu_page() {
		wp_enqueue_style( 'pop-and-convert-admin' );
		wp_enqueue_script( 'pop-and-convert-admin' );

		// Add Translation support for Admin Dashboard
		wp_set_script_translations( 'pop-and-convert-admin', 'pop-and-convert', POP_AND_CONVERT_PLUGIN_DIR__ . 'languages/' );

		wp_enqueue_media();
		?>
		<div class="wrapper">
			<div id="pop-and-convert" class="pac-wrapper"
				 style="margin-left: -20px; background-color: #f8fafc; min-height: 90dvh;"></div>
		</div>
		<?php
	}

	public function render_submenu_page_add_callback() {
		//Not needed
	}

	public function render_submenu_page_callback() {
		wp_enqueue_style( 'pop-and-convert-admin' );
		wp_enqueue_script( 'pop-and-convert-settings' );

		// Add Translation support for Settings Dashboard
		wp_set_script_translations( 'pop-and-convert-settings', 'pop-and-convert', POP_AND_CONVERT_PLUGIN_DIR__ . 'languages/' );
		?>
		<div class="wrapper">
			<div id="pacp-global-settings" class="pac-wrapper"
				 style="margin-left: -20px; background-color: #f8fafc; min-height: 90dvh"></div>
		</div>
		<?php
	}

	/**
	 * Enqueue admin scripts.
	 *
	 * @since 1.0.0
	 */
	public function admin_scripts( $hooks ) {

		if ( 'toplevel_page_pop-and-convert' == $hooks || 'pop-and-convert_page_pacp-global-setting' == $hooks ) {
			$permalink_structure          = get_option( 'permalink_structure' ); //get permalink structure for the site

			$admin_dependencies = POP_AND_CONVERT_PLUGIN_DIR__ . 'build/admin.asset.php';
			if ( file_exists( $admin_dependencies ) ) {
				$admin_asset_file      = require $admin_dependencies;
				$admin_js_dependencies    = ( ! empty( $admin_asset_file[ 'dependencies' ] ) ) ? $admin_asset_file[ 'dependencies' ] : [];
				$admin_version            = ( ! empty( $admin_asset_file[ 'version' ] ) ) ? $admin_asset_file[ 'version' ] : POP_AND_CONVERT_VERSION;

				wp_register_style(
					'pop-and-convert-admin',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/admin.css',
					array(),
					filemtime( POP_AND_CONVERT_PLUGIN_DIR__ . 'build/admin.css' )
				);

				wp_register_script(
					'pop-and-convert-admin',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/admin.js',
					$admin_js_dependencies,
					$admin_version,
					true
				);

				wp_localize_script( 'pop-and-convert-admin', 'pacpAdminData', [
					'permalink'     => $permalink_structure,
					'adminURL'      => home_url( '/wp-admin' ),
					'apiURL'        => home_url( '/wp-json' ),
					'nonce'         => wp_create_nonce( 'wp_rest' ),
					'pro_activated' => pop_and_convert_pro_is_activated(),
				] );
			}

			$settings_dependencies = POP_AND_CONVERT_PLUGIN_DIR__ . 'build/settings.asset.php';
			if ( file_exists( $settings_dependencies ) ) {
				$settings_asset_file      = require $settings_dependencies;
				$settings_js_dependencies = ( ! empty( $settings_asset_file[ 'dependencies' ] ) ) ? $settings_asset_file[ 'dependencies' ] : [];
				$settings_version         = ( ! empty( $settings_asset_file[ 'version' ] ) ) ? $settings_asset_file[ 'version' ] : POP_AND_CONVERT_VERSION;

				wp_register_script(
					'pop-and-convert-settings',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/settings.js',
					$settings_js_dependencies,
					$settings_version,
					true
				);

				wp_localize_script( 'pop-and-convert-settings', 'pacpAdminData', [
					'permalink'     => $permalink_structure,
					'adminURL'      => home_url( '/wp-admin' ),
					'apiURL'        => home_url( '/wp-json' ),
					'nonce'         => wp_create_nonce( 'wp_rest' ),
					'pro_activated' => pop_and_convert_pro_is_activated(),
					'admin'     => current_user_can( 'administrator' ),
					'user_data' => Pop_And_Convert::get_user_roles(),
				] );
			}

			$components_dependencies = POP_AND_CONVERT_PLUGIN_DIR__ . 'build/options.asset.php';
			if ( file_exists( $components_dependencies ) ) {
				$components_assets          = require $components_dependencies;
				$components_js_dependencies = ( ! empty( $components_assets[ 'dependencies' ] ) ) ? $components_assets[ 'dependencies' ] : [];
				$com_version                = ( ! empty( $components_assets[ 'version' ] ) ) ? $components_assets[ 'version' ] : POP_AND_CONVERT_VERSION;
				wp_enqueue_script(
					'pac-components',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/options.js',
					$components_js_dependencies,
					$com_version,
					true
				);
			}
		}

		//post meta settings
		global $pagenow;

		if ( 'post.php' === $pagenow || 'post-new.php' === $pagenow ) {
			$screen                       = get_current_screen();
			$postMeta_dependencies = POP_AND_CONVERT_PLUGIN_DIR__ . 'build/postMeta.asset.php';
			if ( file_exists( $postMeta_dependencies ) && ( 'post' == $screen->post_type || 'page' == $screen->post_type ) ) {
				$postMeta_asset_file      = require $postMeta_dependencies;
				$postMeta_js_dependencies = ( ! empty( $postMeta_asset_file[ 'dependencies' ] ) ) ? $postMeta_asset_file[ 'dependencies' ] : [];
				$postMeta_version         = ( ! empty( $postMeta_asset_file[ 'version' ] ) ) ? $postMeta_asset_file[ 'version' ] : POP_AND_CONVERT_VERSION;

				wp_enqueue_script(
					'pop-and-convert-postMeta',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/postMeta.js',
					$postMeta_js_dependencies,
					$postMeta_version,
					true
				);

				wp_enqueue_style(
					'pop-and-convert-postMeta',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/postMeta.css',
					array(),
					filemtime( POP_AND_CONVERT_PLUGIN_DIR__ . 'build/postMeta.css' )
				);

				$getLicenseStatus   = get_option( 'pac_pro_license' );
				$checkLicenseStatus = isset( $getLicenseStatus[ 'license_status' ] ) && ! empty( $getLicenseStatus[ 'license_status' ] ) ? $getLicenseStatus[ 'license_status' ] : 'invalid';

				wp_localize_script( 'pop-and-convert-postMeta', 'pacpAdminData', [
					'pro_activated' => pop_and_convert_pro_is_activated(),
					'licenseActive' => $checkLicenseStatus,
				] );
			}

			$components_dependencies = POP_AND_CONVERT_PLUGIN_DIR__ . 'build/options.asset.php';
			if ( file_exists( $components_dependencies ) ) {
				$components_assets          = require $components_dependencies;
				$components_js_dependencies = ( ! empty( $components_assets[ 'dependencies' ] ) ) ? $components_assets[ 'dependencies' ] : [];
				$com_version                = ( ! empty( $components_assets[ 'version' ] ) ) ? $components_assets[ 'version' ] : POP_AND_CONVERT_VERSION;
				wp_enqueue_script(
					'pac-components',
					POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/options.js',
					$components_js_dependencies,
					$com_version,
					true
				);
			}
		}
	}

	/**
	 * Enqueue public scripts.
	 *
	 * @since 1.0.0
	 */
	public function public_scripts() {

		$public_dependencies = POP_AND_CONVERT_PLUGIN_DIR__ . 'build/public.asset.php';
		if ( file_exists( $public_dependencies ) ) {
			$public_asset_file      = require $public_dependencies;
			$public_js_dependencies = ( ! empty( $public_asset_file[ 'dependencies' ] ) ) ? $public_asset_file[ 'dependencies' ] : [];
			$public_version = ( ! empty( $public_asset_file[ 'version' ] ) ) ? $public_asset_file[ 'version' ] : POP_AND_CONVERT_VERSION;

			wp_enqueue_style(
				'pop-and-convert-public',
				POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/public.css',
				array(),
				filemtime( POP_AND_CONVERT_PLUGIN_DIR__ . 'build/public.css' )
			);

			wp_enqueue_script(
				'pop-and-convert-public',
				POP_AND_CONVERT_PLUGIN_DIR__URL . 'build/public.js',
				$public_js_dependencies,
				$public_version,
				true
			);

			$notifications_settings = get_option( 'pop_and_convert_global_settings', array() );

			wp_localize_script( 'pop-and-convert-public', 'pacpPublicData', [
				'apiURL'        => home_url( '/wp-json' ),
				'pacp_settings' => $notifications_settings,
				'nonce'         => wp_create_nonce( 'wp_rest' ),
				'postID'   => get_the_ID(),
				'loggedIn' => (bool) is_user_logged_in(),
			] );
		}

		$notification_css = $this->print_inline_css();
		//Add inline CSS for individual notification attributes
		wp_add_inline_style( 'pop-and-convert-public', $notification_css );

	}

	/**
	 * Returns Style data in a string format to be used inline for individual notifications.
	 *
	 * @return string
	 */
	public function print_inline_css() {

		$defaultSettings = Pop_And_Convert::get_default_global_setting();

		$notificationsSettings = get_option( 'pop_and_convert_global_settings', $defaultSettings );
		$notificationData      = $this->filter_notification_data();  //Returns one notification data at a time.
		$enable_custom_styling = isset( $notificationData[ 'enable_custom_styling' ] ) && $notificationData[ 'enable_custom_styling' ];

		$notificationID  = isset( $notificationData[ 'id' ] ) ? esc_attr( $notificationData[ 'id' ] ) : "";
		$desk_title_size = isset( $notificationData[ 'desk_title_size' ] ) ? esc_html( $notificationData[ 'desk_title_size' ] ) : "";
		$desk_desc_size  = isset( $notificationData[ 'desk_desc_size' ] ) ? esc_html( $notificationData[ 'desk_desc_size' ] ) : "";
		$mob_title_size  = isset( $notificationData[ 'mob_title_size' ] ) ? esc_html( $notificationData[ 'mob_title_size' ] ) : "";
		$mob_desc_size   = isset( $notificationData[ 'mob_desc_size' ] ) ? esc_html( $notificationData[ 'mob_desc_size' ] ) : "";
		$tab_title_size  = isset( $notificationData[ 'tab_title_size' ] ) ? esc_html( $notificationData[ 'tab_title_size' ] ) : "";
		$tab_desc_size   = isset( $notificationData[ 'tab_desc_size' ] ) ? esc_html( $notificationData[ 'tab_desc_size' ] ) : "";
		$btn_bg_color    = isset( $notificationData[ 'btn_bg_color' ] ) ? sanitize_hex_color( $notificationData[ 'btn_bg_color' ] ) : "#253b80";
		$btn_text_color  = isset( $notificationData[ 'btn_text_color' ] ) ? sanitize_hex_color( $notificationData[ 'btn_text_color' ] ) : "#ffffff";
		$btn_border_rad  = isset( $notificationData[ 'btn_border_rad' ] ) ? esc_html( $notificationData[ 'btn_border_rad' ] ) : "";
		$img_border_rad  = isset( $notificationData[ 'img_border_rad' ] ) ? esc_html( $notificationData[ 'img_border_rad' ] ) : "";
		$box_border_rad  = isset( $notificationData[ 'box_border_rad' ] ) ? esc_html( $notificationData[ 'box_border_rad' ] ) : "";
		$img_width       = isset( $notificationData[ 'img_width' ] ) ? esc_html( $notificationData[ 'img_width' ] ) : "";
		$img_height      = isset( $notificationData[ 'img_height' ] ) ? esc_html( $notificationData[ 'img_height' ] ) : "";

		//Set values according to custom styling
		if ( ! $enable_custom_styling ) {
			$desk_title_size = esc_html( $notificationsSettings[ 'desk_title_size' ] );
			$tab_title_size  = esc_html( $notificationsSettings[ 'tab_title_size' ] );
			$mob_title_size  = esc_html( $notificationsSettings[ 'mob_title_size' ] );
			$desk_desc_size  = esc_html( $notificationsSettings[ 'desk_desc_size' ] );
			$tab_desc_size   = esc_html( $notificationsSettings[ 'tab_desc_size' ] );
			$mob_desc_size   = esc_html( $notificationsSettings[ 'mob_desc_size' ] );
			$btn_bg_color    = sanitize_hex_color( $notificationsSettings[ 'btn_bg_color' ] );
			$btn_text_color  = sanitize_hex_color( $notificationsSettings[ 'btn_text_color' ] );
			$btn_border_rad  = esc_html( $notificationsSettings[ 'btn_border_rad' ] );
			$img_border_rad  = esc_html( $notificationsSettings[ 'img_border_rad' ] );
			$box_border_rad  = esc_html( $notificationsSettings[ 'box_border_rad' ] );
			$box_width       = ! empty( $notificationData[ 'box_width' ] ) ? esc_html( $notificationData[ 'box_width' ] ) : "";
			$img_width       = esc_html( $notificationsSettings[ 'img_width' ] );
			$img_height      = esc_html( $notificationsSettings[ 'img_height' ] );
		}

		$inline_css = '
			[data-id="' . $notificationID . '"]{
				--desk-title-fs: ' . $desk_title_size . ';
				--tab-title-fs: ' . $tab_title_size . ';
				--mob-title-fs: ' . $mob_title_size . ';
				--desk-desc-fs: ' . $desk_desc_size . ';
				--tab-desc-fs: ' . $tab_desc_size . ';
				--mob-desc-fs: ' . $mob_desc_size . ';
				--btn-bg-color: ' . $btn_bg_color . ';
				--btn-text-color: ' . $btn_text_color . ';
				--btn-border-rad: ' . $btn_border_rad . ';
				--img-border-rad: ' . $img_border_rad . ';
				--box-border-rad: ' . $box_border_rad . ';
			}
		';

		if ( isset( $box_width ) && ! empty( $box_width ) ) {
			$inline_css .= '[data-id="' . $notificationID . '"]{--box-width: ' . $box_width . ';}';
		}
		if ( isset( $img_width ) && ! empty( $img_width ) ) {
			$inline_css .= '[data-id="' . $notificationID . '"]{--img-width: ' . $img_width . ';}';
		}
		if ( isset( $img_height ) && ! empty( $img_height ) ) {
			$inline_css .= '[data-id="' . $notificationID . '"]{--img-height: ' . $img_height . ';}';
		}

		return $inline_css;
	}

	/**
	 * Return available user roles.
	 *
	 * @return array
	 */
	public static function get_user_roles() {
		$roles_array = [];
		$role_data = \get_editable_roles();

		foreach ( $role_data as $role => $details ) {
			$name                 = translate_user_role( $details[ 'name' ] );
			$roles_array[ $role ] = $name;
		}

		return $roles_array;
	}

	/**
	 * Set default value for global settings
	 *
	 * @return array
	 */
	public static function get_default_global_setting() {
		$defaultSettings = [
			'trigger'            => 'onpageload',
			'delay'              => '30sec',
			'dismiss'            => '1hour',
			'desk_title_size'    => '22px',
			'desk_desc_size'     => '16px',
			'mob_title_size'     => '20px',
			'mob_desc_size'      => '16px',
			'tab_title_size'     => '20px',
			'tab_desc_size'      => '16px',
			'btn_bg_color'       => '#253b80',
			'btn_text_color'     => '#ffffff',
			'btn_border_rad'     => '5px',
			'imageSizeType'  => 'default',
			'img_border_rad'     => '100%',
			'img_width'          => '',
			'img_height'         => '',
			'box_border_rad'     => '5px',
			'desktop_visibility' => true,
			'tablet_visibility'  => true,
			'mobile_visibility'  => true,
			'displayCredits' => false,
			'affiliateLink'  => '',
			'userRoles'      => [ 'Administrator' ],
		];

		return $defaultSettings;
	}

	/**
	 * Display Notification in the frontend
	 *
	 * @since 1.0.0
	 */
	public function notification_on_frontend() {

		$defaultSettings = Pop_And_Convert::get_default_global_setting();

		$notifications         = get_option( 'pop_and_convert_list_array', array() );
		$notificationsSettings = get_option( 'pop_and_convert_global_settings', $defaultSettings );

		$notificationData = $this->filter_notification_data(); //Returns one notification data at a time.

		if ( ! $notifications && empty( $notificationData ) ) {
			return;
		}

		$postMetaData = get_post_meta( get_the_ID(), 'pac_data', true );

		if ( ! is_customize_preview() && ( ! empty( $notificationData ) || ! empty( $postMetaData ) ) ) { ?>
			<div id="pop-and-convert-frontend" style="display:none">
				<?php
				//Fetch data of Notifications created at the dashboard
				$notificationID        = isset( $notificationData[ 'id' ] ) ? esc_attr( $notificationData[ 'id' ] ) : "";
				$notificationType      = isset( $notificationData[ 'type' ] ) ? esc_attr( $notificationData[ 'type' ] ) : "sticky";
				$popupLayout           = isset( $notificationData[ 'popup_layout' ] ) ? esc_attr( $notificationData[ 'popup_layout' ] ) : "popup-layout-1";
				$stickyLayout          = isset( $notificationData[ 'sticky_layout' ] ) ? esc_attr( $notificationData[ 'sticky_layout' ] ) : "sticky-layout-1";
				$leadTitle             = isset( $notificationData[ 'leadTitle' ] ) ? esc_html( $notificationData[ 'leadTitle' ] ) : "";
				$desc                  = isset( $notificationData[ 'description' ] ) ? wp_kses_post( $notificationData[ 'description' ] ) : "";
				$imageData             = isset( $notificationData[ 'image_data' ] ) ? $notificationData[ 'image_data' ] : "";
				$buttonLink            = isset( $notificationData[ 'buttonLink' ] ) ? esc_url( $notificationData[ 'buttonLink' ] ) : "";
				$buttonTitle           = isset( $notificationData[ 'buttonTitle' ] ) ? esc_html( $notificationData[ 'buttonTitle' ] ) : "";
				$buttonNewTab          = isset( $notificationData[ 'newTab' ] ) && $notificationData[ 'newTab' ];
				$buttonrelAttribute    = isset( $notificationData[ 'relAttribute' ] ) ? $notificationData[ 'relAttribute' ] : [];
				$trigger               = isset( $notificationData[ 'trigger' ] ) ? esc_html( $notificationData[ 'trigger' ] ) : "";
				$delay                 = isset( $notificationData[ 'delay' ] ) ? esc_html( $notificationData[ 'delay' ] ) : "0sec";
				$desktop_visibility    = isset( $notificationData[ 'desktop_visibility' ] ) && $notificationData[ 'desktop_visibility' ];
				$mobile_visibility     = isset( $notificationData[ 'mobile_visibility' ] ) && $notificationData[ 'mobile_visibility' ];
				$tablet_visibility     = isset( $notificationData[ 'tablet_visibility' ] ) && $notificationData[ 'tablet_visibility' ];
				$enable_custom_styling = isset( $notificationData[ 'enable_custom_styling' ] ) && $notificationData[ 'enable_custom_styling' ];
				$imageSizeType         = isset( $notificationData[ 'imageSizeType' ] ) ? esc_html( $notificationData[ 'imageSizeType' ] ) : "default";

				if ( ! $enable_custom_styling ) {
					$imageSizeType = esc_html( $notificationsSettings[ 'imageSizeType' ] );
				}

				$displayCredits = isset( $notificationsSettings[ 'displayCredits' ] ) && $notificationsSettings[ 'displayCredits' ];
				$affiliateLink  = isset( $notificationsSettings[ 'affiliateLink' ] ) ? esc_url( $notificationsSettings[ 'affiliateLink' ] ) : "";

				$relToString     = ! empty( $buttonrelAttribute ) ? implode( ' ', $buttonrelAttribute ) : '';
				$target             = $buttonNewTab ? ' target=_blank' : '';
				$rel_safe        = ! empty( $buttonrelAttribute ) ? ' rel="' . esc_attr( $relToString ) . '"' : '';
				$dataD              = $desktop_visibility ? ' data-d=yes' : ' data-d=no';
				$dataT              = $tablet_visibility ? ' data-t=yes' : ' data-t=no';
				$dataM              = $mobile_visibility ? ' data-m=yes' : ' data-m=no';
				$apiLayout          = $notificationType === 'sticky' ? $stickyLayout : $popupLayout;
				$staticLayout       = $notificationType === 'sticky' ? 'sticky-layout-1' : 'popup-layout-1';
				$notificationLayout = pop_and_convert_pro_is_activated() ? $apiLayout : $staticLayout;
				$layoutImageSize = $notificationType === 'popup' && $notificationLayout === 'popup-layout-1' ? 'full' : 'thumbnail';
				$imageSize       = $imageSizeType === 'default' ? $layoutImageSize : 'full';
				$class           = '';
				if ( isset( $imageData[ 0 ][ 'id' ] ) && ! empty( $imageData[ 0 ][ 'id' ] ) ) {
					$class .= 'has-image';
				}
				?>

				<div
					class="pac-notification <?php echo esc_attr( $notificationType ); ?> <?php echo esc_attr( $notificationLayout ); ?>"
					data-id="<?php echo esc_attr( $notificationID ); ?>"
					<?php echo esc_attr( $dataM ); ?>
					<?php echo esc_attr( $dataT ); ?>
					<?php echo esc_attr( $dataD ); ?>
				>
					<?php pop_and_convert_get_layout(
						$notificationType,
						$notificationLayout,
						$class,
						$desc,
						$imageData,
						$imageSize,
						$leadTitle,
						$buttonTitle,
						$buttonLink,
						$target,
						$rel_safe,
						$displayCredits,
						$affiliateLink
					); ?>
				</div>

				<?php
				$encodeTrigger = wp_json_encode( $trigger );
				$endpointURL   = wp_json_encode( home_url( '/wp-json' ) );
				$encodeDelay   = wp_json_encode( $delay );
				$checkID       = 'post-' . get_the_ID() === $notificationID ? wp_json_encode( true ) : wp_json_encode( false );
				$loggedIn      = wp_json_encode( is_user_logged_in() );

				$js_data = [
					'encodeTrigger' => $encodeTrigger,
					'endpointURL'   => $endpointURL,
					'encodeDelay'   => $encodeDelay,
					'checkID'       => $checkID,
					'loggedIn'      => $loggedIn,
				];

				$inline_script = pop_and_convert_print_inline_js( $js_data );
				wp_add_inline_script( 'pop-and-convert-public', $inline_script );
				?>
			</div>
		<?php }
	}

	/**
	 * Filter the Notificaion Table and return one notification based on the conditions applied
	 *
	 * @return array $filteredNotification
	 * @since 1.0.0
	 */
	public function filter_notification_data() {

		$notifications = get_option( 'pop_and_convert_list_array', array() );

		if ( is_front_page() ) {
			$result = array_filter( $notifications, function ( $arr ) {
				return $arr[ 'status' ] === 'active'
					   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Front Page', $arr[ 'locations' ] )
							|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'Front Page', $arr[ 'locations' ] ) );
			} );
		} else if ( is_home() ) {
			$result = array_filter( $notifications, function ( $arr ) {
				return $arr[ 'status' ] === 'active'
					   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Blog Page', $arr[ 'locations' ] )
							|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'Blog Page', $arr[ 'locations' ] ) );
			} );
		} else if ( is_singular() ) {
			if ( is_single() && ! is_singular( array( 'page', 'post' ) ) ) {
				$result = array_filter( $notifications, function ( $arr ) {
					return $arr[ 'status' ] === 'active'
						   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Custom Post Types', $arr[ 'locations' ] )
								|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'Custom Post Types', $arr[ 'locations' ] ) );
				} );
			} else if ( is_single() ) {
				$result = array_filter( $notifications, function ( $arr ) {
					$postID = get_the_ID();

					return $arr[ 'status' ] === 'active'
						   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'All Posts', $arr[ 'locations' ] )
								|| ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && array_filter( $arr[ 'selected_posts' ], function ( $posts ) use ( $postID ) {
									return $posts[ "id" ] == $postID;
								} )
								)
								|| ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && ! empty( $arr[ 'post_page_id' ] ) && array_filter( explode( ",", $arr[ 'post_page_id' ] ), function ( $posts ) use ( $postID ) {
									return $posts == $postID;
								} )
								)
								|| ( $arr[ 'location_visibility' ] == "hideselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && ! empty( $arr[ 'selected_posts' ] ) && array_filter( $arr[ 'selected_posts' ], function ( $posts ) use ( $postID ) {
									return $posts[ "id" ] != $postID;
								} )
								)
								|| ( $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'All Posts', $arr[ 'locations' ] ) )
								|| ( $arr[ 'location_visibility' ] == "hideselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && ! empty( $arr[ 'post_page_id' ] ) && array_filter( explode( ",", $arr[ 'post_page_id' ] ), function ( $posts ) use ( $postID ) {
									return $posts != $postID;
								} )
								)
						   );
				} );
			} else if ( is_page() ) {
				$result = array_filter( $notifications, function ( $arr ) {
					$postID = get_the_ID();

					return $arr[ 'status' ] === 'active'
						   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'All Pages', $arr[ 'locations' ] )
								|| ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && array_filter( $arr[ 'selected_posts' ], function ( $posts ) use ( $postID ) {
									return $posts[ "id" ] == $postID;
								} )
								)
								|| ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && ! empty( $arr[ 'post_page_id' ] ) && array_filter( explode( ",", $arr[ 'post_page_id' ] ), function ( $posts ) use ( $postID ) {
									return $posts == $postID;
								} )
								)
								|| ( $arr[ 'location_visibility' ] == "hideselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && ! empty( $arr[ 'selected_posts' ] ) && array_filter( $arr[ 'selected_posts' ], function ( $posts ) use ( $postID ) {
									return $posts[ "id" ] != $postID;
								} )
								)
								|| ( $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'All Pages', $arr[ 'locations' ] ) )
								|| ( $arr[ 'location_visibility' ] == "hideselected" && in_array( 'Custom Post/Page', $arr[ 'locations' ] )
									 && ! empty( $arr[ 'post_page_id' ] ) && array_filter( explode( ",", $arr[ 'post_page_id' ] ), function ( $posts ) use ( $postID ) {
									return $posts != $postID;
								} )
								)
						   );
				} );
			} else {
				$result = array_filter( $notifications, function ( $arr ) {
					return $arr[ 'status' ] === 'active'
						   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'All posts, pages and custom post types', $arr[ 'locations' ] )
								|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'All posts, pages and custom post types', $arr[ 'locations' ] ) );
				} );
			}
		} else if ( is_archive() ) {
			$result = array_filter( $notifications, function ( $arr ) {
				return $arr[ 'status' ] === 'active'
					   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'All Archive Pages', $arr[ 'locations' ] )
							|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'All Archive Pages', $arr[ 'locations' ] ) );
			} );
		} else if ( is_search() ) {
			$result = array_filter( $notifications, function ( $arr ) {
				return $arr[ 'status' ] === 'active'
					   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( 'Search Page', $arr[ 'locations' ] )
							|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( 'Search Page', $arr[ 'locations' ] ) );
			} );
		} else if ( is_404() ) {
			$result = array_filter( $notifications, function ( $arr ) {
				return $arr[ 'status' ] === 'active'
					   && ( $arr[ 'location_visibility' ] == "showselected" && in_array( '404 Page', $arr[ 'locations' ] )
							|| $arr[ 'location_visibility' ] == "hideselected" && ! in_array( '404 Page', $arr[ 'locations' ] ) );
			} );
		}

		$fallbackResult = array_filter( $notifications, function ( $arr ) {
			return $arr[ 'status' ] === 'active' && $arr[ 'location_visibility' ] == "entire";
		} );

		$newresult         = array_values( $result );
		$newfallbackResult = array_values( $fallbackResult );
		$merge             = array_merge( $newresult, $newfallbackResult );

		if ( is_array( $merge ) && ! empty( $merge ) ) {

			foreach ( $merge as $notifKey => $element ) {

				//Check condition for notifications that are hidden on specific posts/pages and remove them if they are listed in the final array.
				if ( $element[ 'location_visibility' ] === 'hideselected' && in_array( 'Custom Post/Page', $element[ 'locations' ] ) ) {
					$currentPostID = get_the_ID();

					if ( ! empty( $element[ 'selected_posts' ] ) ) {
						foreach ( $element[ 'selected_posts' ] as $key ) {
							if ( $currentPostID === $key[ 'id' ] ) {
								unset( $merge[ $notifKey ] );
							}
						}
					}

					if ( ! empty( $element[ 'post_page_id' ] ) ) {
						$idArray = explode( ",", $element[ 'post_page_id' ] );
						if ( in_array( $currentPostID, $idArray ) ) {
							unset( $merge[ $notifKey ] );
						}
					}
				}

			}

			$filteredNotification = array_reduce( $merge, function ( $a, $b ) {
				if ( isset( $a ) && $a[ 'priority' ] === $b[ 'priority' ] ) {
					return $a ? ( $a[ 'updatedAt' ] > $b[ 'updatedAt' ] ? $a : $b ) : $b;
				} else {
					return $a ? ( $a[ 'priority' ] > $b[ 'priority' ] ? $a : $b ) : $b;
				}
			} );
		} else {
			$filteredNotification = [];
		}

		return apply_filters( 'pac_notification_display', $filteredNotification );
	}
}

new Pop_And_Convert();
