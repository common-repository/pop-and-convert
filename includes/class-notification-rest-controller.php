<?php
/**
 * REST API: Notification_Rest_Controller class
 *
 * @package Pop_And_Convert
 * @subpackage REST_API
 * @since 1.0.0
 */

namespace Pop_And_Convert;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Server;

class Notification_Rest_Controller extends WP_REST_Controller{
    /**
     * Initialize hooks and option name
     */
    public function __construct(){
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes(){

        $namespace = 'pop-and-convert/v1';
        $endpoint  = '/notifications/';
        $editPath  = '(?P<id>[a-z0-9]+)';
        $settings  = '/notifications-settings/';
        $stats     = '/notifications-stats/';

        register_rest_route($namespace, $endpoint, array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_notifications'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
                'schema'                => [ $this, 'get_item_schema' ],
            ),
            array(
                'methods'               => WP_REST_Server::CREATABLE,
                'callback'              => array($this, 'update_notifications'),
                'permission_callback'   => array($this, 'notification_nonce_check'),
                'args'                  => array(),
            ),
            array(
                'methods'               => WP_REST_Server::DELETABLE,
                'callback'              => array($this, 'delete_bulk_notifications'),
                'permission_callback'   => array($this, 'notification_nonce_check'),
                'args'                  => array(),
            ),
			'schema'      => array( $this, 'get_item_schema' )
        ));

        register_rest_route($namespace, $endpoint . $editPath, array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_individual_notification'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
            ),
            array(
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => array($this, 'update_individual_notification'),
                'permission_callback'   => array($this, 'notification_nonce_check'),
                'args'                  => array(),
            ),
            array(
                'methods'               => WP_REST_Server::DELETABLE,
                'callback'              => array($this, 'delete_notifications'),
                'permission_callback'   => array($this, 'notification_nonce_check'),
                'args'                  => array(),
            ),
			'schema'      => array( $this, 'get_item_schema' )
        ));

        register_rest_route($namespace, $settings, array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_notifications_settings'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
            ),
            array(
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => array($this, 'update_notifications_settings'),
                'permission_callback'   => array($this, 'notification_nonce_check'),
                'args'                  => array(),
            ),
			'schema'      => array( $this, 'get_item_schema' )
        ));
        register_rest_route($namespace, $stats, array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_notifications_stats'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
            ),
            array(
                'methods'               => WP_REST_Server::CREATABLE,
                'callback'              => array($this, 'update_notifications_stats'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
            ),
			'schema'      => array( $this, 'get_item_schema' )
        ));
        register_rest_route($namespace, $stats . $editPath, array(
            array(
                'methods'               => WP_REST_Server::READABLE,
                'callback'              => array($this, 'get_individual_notifications_stats'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
            ),
            array(
                'methods'               => WP_REST_Server::EDITABLE,
                'callback'              => array($this, 'update_individual_notifications_stats'),
                'permission_callback'   => array($this, 'notification_permissions_check'),
                'args'                  => array(),
            ),
			'schema'      => array( $this, 'get_item_schema' )
        ));
    }

    /**
     * Retrieves the group schema, conforming to JSON Schema.
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'notifications',
            'type'       => 'object',
            'properties' => [
                'id' => [
                    'description' => __( 'ID of the Notification', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'title' => [
                    'description' => __( 'Notification main title', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'leadTitle' => [
                    'description' => __( 'Notification title to be displayed', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'description' => [
                    'description' => __( 'Notification description', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'type' => [
                    'description' => __( 'Notification type', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'status' => [
                    'description' => __( 'Notification status', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'sticky_layout' => [
                    'description' => __( 'Notification sticky layout', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'popup_layout' => [
                    'description' => __( 'Notification pop up layout', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'buttonTitle' => [
                    'description' => __( 'Notification button label', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'buttonLink' => [
                    'description' => __( 'Notification button link', 'pop-and-convert' ),
                    'type'        => 'string',
                    'format'      => 'uri',
                    'context'     => [ 'view', 'edit' ],
                ],
                'newTab' => [
                    'description' => __( 'Notification button label', 'pop-and-convert' ),
                    'type'        => 'boolean',
                    'context'     => [ 'view', 'edit' ],
                ],
                'relAttribute' => [
                    'description' => __( 'Notification button label rel attributes', 'pop-and-convert' ),
                    'type'        => 'array',
                    'context'     => [ 'view', 'edit' ],
                ],
                'trigger' => [
                    'description' => __( 'Notification trigger behavior', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'delay' => [
                    'description' => __( 'Notification delay time', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'dismiss' => [
                    'description' => __( 'Notification dismiss time', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'desktop_visibility' => [
                    'description' => __( 'Notification desktop visibility', 'pop-and-convert' ),
                    'type'        => 'boolean',
                    'context'     => [ 'view', 'edit' ],
                ],
                'mobile_visibility' => [
                    'description' => __( 'Notification mobile visibility', 'pop-and-convert' ),
                    'type'        => 'boolean',
                    'context'     => [ 'view', 'edit' ],
                ],
                'tablet_visibility' => [
                    'description' => __( 'Notification tablet visibility', 'pop-and-convert' ),
                    'type'        => 'boolean',
                    'context'     => [ 'view', 'edit' ],
                ],
                'location_visibility' => [
                    'description' => __( 'Notification location visibility', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'locations' => [
                    'description' => __( 'Locations where Notification is to be displayed', 'pop-and-convert' ),
                    'type'        => 'array',
                    'context'     => [ 'view', 'edit' ],
                ],
                'selected_posts' => [
                    'description' => __( 'Posts or Pages where Notification is to be displayed', 'pop-and-convert' ),
                    'type'        => 'array',
                    'context'     => [ 'view', 'edit' ],
                ],
                'post_page_id' => [
                    'description' => __( 'Notification posts/pages ID', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'image_data' => [
                    'description' => __( 'Notification Image', 'pop-and-convert' ),
                    'type'        => 'array',
                    'context'     => [ 'view', 'edit' ],
                ],
                'views' => [
                    'description' => __( 'Views of the Notification', 'pop-and-convert' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'clicks' => [
                    'description' => __( 'Number of times the Notification button is clicked', 'pop-and-convert' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'priority' => [
                    'description' => __( 'Priority of the Notification', 'pop-and-convert' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'enable_custom_styling' => [
                    'description' => __( 'Notification custom styling option', 'pop-and-convert' ),
                    'type'        => 'boolean',
                    'context'     => [ 'view', 'edit' ],
                ],
                'desk_title_size' => [
                    'description' => __( 'Notification desktop title font size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'desk_desc_size' => [
                    'description' => __( 'Notification desktop description font size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'mob_title_size' => [
                    'description' => __( 'Notification mobile title font size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'mob_desc_size' => [
                    'description' => __( 'Notification mobile desc font size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'tab_title_size' => [
                    'titleription' => __( 'Notification tablet desc font size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'tab_desc_size' => [
                    'description' => __( 'Notification tablet description font size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'btn_bg_color' => [
                    'description' => __( 'Notification button background color', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'btn_text_color' => [
                    'description' => __( 'Notification button text color', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'btn_border_rad' => [
                    'description' => __( 'Notification button border radius', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'img_border_rad' => [
                    'description' => __( 'Notification image border radius', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'box_border_rad' => [
                    'description' => __( 'Notification box border radius for pop up layout', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'imageSizeType' => [
                    'description' => __( 'Notification Image Size', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'img_width' => [
                    'description' => __( 'Notification image width', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'img_height' => [
                    'description' => __( 'Notification image height', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'box_width' => [
                    'description' => __( 'Notification box container width', 'pop-and-convert' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                ],
                'displayCredits' => [
                    'description' => __( 'Whether to display Notification affiliation link', 'pop-and-convert' ),
                    'type'        => 'boolean',
                    'context'     => [ 'view', 'edit' ],
                ],
                'affiliateLink' => [
                    'description' => __( 'Notification affiliation link', 'pop-and-convert' ),
                    'type'        => 'string',
                    'format'      => 'uri',
                    'context'     => [ 'view', 'edit' ],
                ],
                'createdAt' => [
                    'description' => __( 'Created at time', 'pop-and-convert' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'updatedAt' => [
                    'description' => __( 'Updated at time', 'pop-and-convert' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'userRoles' => [
                    'description' => __( 'Capability of user who can create, edit and delete notifications.', 'pop-and-convert' ),
                    'type'        => 'array',
                    'context'     => [ 'view', 'edit' ],
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }

    /**
     * Get All Notifications
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_notifications($request) {
    
        if( get_option('pop_and_convert_list_array') === false ){
            $notificationArray = [];
        } else {
            $notificationArray = get_option('pop_and_convert_list_array');
        }    
        $response  = rest_ensure_response( $notificationArray );

        return $response;
    }

    /**
     * Get individual notification which matches the ID on $request
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_individual_notification($request){

        $id = $request['id'];
        $notificationArray = get_option('pop_and_convert_list_array');

        $data = array_filter($notificationArray, function($arr) use ($id){
            return $arr['id'] == $id;
        });
        $getObjData = array_values($data);
        $response  = rest_ensure_response($getObjData[0] );

        return $response;
    }

    /**
     * Update the entire notifications object
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_notifications($req){

        if( get_option('pop_and_convert_list_array') === false ){
            add_option('pop_and_convert_list_array', array());
        }

		$schema = $this->get_item_schema();

        if ( ! empty( $schema['properties']['id'] ) && isset( $req['id'] ) ) {
            $newID = sanitize_text_field( $req['id'] );
		}

        if ( ! empty( $schema['properties']['title'] ) && isset( $req['title'] ) ) {
            $title = sanitize_text_field( $req['title'] );
		}

        if ( ! empty( $schema['properties']['type'] ) && isset( $req['type'] ) ) {
            $type = sanitize_text_field( $req['type'] );
		}

        if ( ! empty( $schema['properties']['leadTitle'] ) && isset( $req['leadTitle'] ) ) {
            $leadTitle = sanitize_text_field( $req['leadTitle'] );
		}

        if ( ! empty( $schema['properties']['status'] ) && isset( $req['status'] ) ) {
            $status = sanitize_text_field( $req['status'] );
		}

        if ( ! empty( $schema['properties']['sticky_layout'] ) && isset( $req['sticky_layout'] ) ) {
            $sticky_layout = sanitize_text_field( $req['sticky_layout'] );
		}

        if ( ! empty( $schema['properties']['popup_layout'] ) && isset( $req['popup_layout'] ) ) {
            $popup_layout = sanitize_text_field( $req['popup_layout'] );
		}

        if ( ! empty( $schema['properties']['description'] ) && isset( $req['description'] ) ) {
            $description = wp_kses_post( $req['description'] );
		}

        if ( ! empty( $schema['properties']['createdAt'] ) && isset( $req['createdAt'] ) ) {
            $createdAt = absint( $req['createdAt'] );
		}

        if ( ! empty( $schema['properties']['updatedAt'] ) && isset( $req['updatedAt'] ) ) {
            $updatedAt = absint( $req['updatedAt'] );
		}

        if ( ! empty( $schema['properties']['image_data'] ) && isset( $req['image_data'] ) ) {
            $image_data = $this->wporg_recursive_sanitize_text_field( $req['image_data'] );
		}

        if ( ! empty( $schema['properties']['location_visibility'] ) && isset( $req['location_visibility'] ) ) {
            $location_visibility = sanitize_text_field( $req['location_visibility'] );
		}

        if ( ! empty( $schema['properties']['locations'] ) && isset( $req['locations'] ) ) {
            $locations = $this->wporg_recursive_sanitize_text_field( $req['locations'] );
		}

        if ( ! empty( $schema['properties']['selected_posts'] ) && isset( $req['selected_posts'] ) ) {
            $selected_posts =  $req['selected_posts'];
		}

        if ( ! empty( $schema['properties']['post_page_id'] ) && isset( $req['post_page_id'] ) ) {
            $post_page_id   = sanitize_text_field( $req['post_page_id'] );
        }

        if ( ! empty( $schema['properties']['buttonLink'] ) && isset( $req['buttonLink'] ) ) {
            $buttonLink = esc_url_raw( $req['buttonLink'] );
		}

        if ( ! empty( $schema['properties']['buttonTitle'] ) && isset( $req['buttonTitle'] ) ) {
            $buttonTitle = sanitize_text_field( $req['buttonTitle'] );
		}

        if ( ! empty( $schema['properties']['newTab'] ) && isset( $req['newTab'] ) ) {
            $newTab  = $this->sanitize_checkbox($req['newTab']);
		}
        
        if ( ! empty( $schema['properties']['relAttribute'] ) && isset( $req['relAttribute'] ) ) {
            $relAttribute = $this->wporg_recursive_sanitize_text_field( $req['relAttribute'] );
        }

        if ( ! empty( $schema['properties']['trigger'] ) && isset( $req['trigger'] ) ) {
            $trigger = sanitize_text_field( $req['trigger'] );
        }

        if ( ! empty( $schema['properties']['delay'] ) && isset( $req['delay'] ) ) {
            $delay   = sanitize_text_field( $req['delay'] );
        }

        if ( ! empty( $schema['properties']['desktop_visibility'] ) && isset( $req['desktop_visibility'] ) ) {
            $desktop_visibility = $this->sanitize_checkbox( $req['desktop_visibility'] );
        }

        if ( ! empty( $schema['properties']['mobile_visibility'] ) && isset( $req['mobile_visibility'] ) ) {
            $mobile_visibility  = $this->sanitize_checkbox($req['mobile_visibility'] );
        }

        if ( ! empty( $schema['properties']['tablet_visibility'] ) && isset( $req['tablet_visibility'] ) ) {
            $tablet_visibility  = $this->sanitize_checkbox($req['tablet_visibility'] );
        }

        if ( ! empty( $schema['properties']['priority'] ) && isset( $req['priority'] ) ) {
            $priority = absint( $req['priority'] );
        }

        if ( ! empty( $schema['properties']['enable_custom_styling'] ) && isset( $req['enable_custom_styling'] ) ) {
            $enable_custom_styling = $this->sanitize_checkbox( $req['enable_custom_styling'] );
        }

        if ( ! empty( $schema['properties']['desk_title_size'] ) && isset( $req['desk_title_size'] ) ) {
            $desk_title_size = sanitize_text_field( $req['desk_title_size'] );
        }

        if ( ! empty( $schema['properties']['desk_desc_size'] ) && isset( $req['desk_desc_size'] ) ) {
            $desk_desc_size = sanitize_text_field( $req['desk_desc_size'] );
        }

        if ( ! empty( $schema['properties']['mob_title_size'] ) && isset( $req['mob_title_size'] ) ) {
            $mob_title_size = sanitize_text_field( $req['mob_title_size'] );
        }

        if ( ! empty( $schema['properties']['mob_desc_size'] ) && isset( $req['mob_desc_size'] ) ) {
            $mob_desc_size = sanitize_text_field( $req['mob_desc_size'] );
        }

        if ( ! empty( $schema['properties']['tab_title_size'] ) && isset( $req['tab_title_size'] ) ) {
            $tab_title_size = sanitize_text_field( $req['tab_title_size'] );
        }

        if ( ! empty( $schema['properties']['tab_desc_size'] ) && isset( $req['tab_desc_size'] ) ) {
            $tab_desc_size = sanitize_text_field( $req['tab_desc_size'] );
        }

        if ( ! empty( $schema['properties']['btn_bg_color'] ) && isset( $req['btn_bg_color'] ) ) {
            $btn_bg_color = $this->color_sanitization_callback( $req['btn_bg_color'] );
        }

        if ( ! empty( $schema['properties']['btn_text_color'] ) && isset( $req['btn_text_color'] ) ) {
            $btn_text_color = $this->color_sanitization_callback( $req['btn_text_color'] );
        }

        if ( ! empty( $schema['properties']['btn_border_rad'] ) && isset( $req['btn_border_rad'] ) ) {
            $btn_border_rad = sanitize_text_field( $req['btn_border_rad'] );
        }

        if ( ! empty( $schema['properties']['img_border_rad'] ) && isset( $req['img_border_rad'] ) ) {
            $img_border_rad = sanitize_text_field( $req['img_border_rad'] );
        }

        if ( ! empty( $schema['properties']['box_border_rad'] ) && isset( $req['box_border_rad'] ) ) {
            $box_border_rad = sanitize_text_field( $req['box_border_rad'] );
        }

        if ( ! empty( $schema['properties']['imageSizeType'] ) && isset( $req['imageSizeType'] ) ) {
            $imageSizeType = sanitize_text_field( $req['imageSizeType'] );
        }

        if ( ! empty( $schema['properties']['img_width'] ) && isset( $req['img_width'] ) ) {
            $img_width = sanitize_text_field( $req['img_width'] );
        }

        if ( ! empty( $schema['properties']['img_height'] ) && isset( $req['img_height'] ) ) {
            $img_height = sanitize_text_field( $req['img_height'] );
        }

        if ( ! empty( $schema['properties']['box_width'] ) && isset( $req['box_width'] ) ) {
            $box_width = sanitize_text_field( $req['box_width'] );
        }

        $newObject = [
            'id'                    => $newID,
            'title'                 => $title,
            'type'                  => $type,
            'sticky_layout'         => $sticky_layout,
            'popup_layout'          => $popup_layout,
            'leadTitle'             => $leadTitle,
            'description'           => $description,
            'image_data'            => $image_data,
            'status'                => $status,
            'buttonLink'            => $buttonLink,
            'buttonTitle'           => $buttonTitle,
            'newTab'                => $newTab,
            'relAttribute'          => $relAttribute,
            'trigger'               => $trigger,
            'delay'                 => $delay,
            'desktop_visibility'    => $desktop_visibility,
            'mobile_visibility'     => $mobile_visibility,
            'tablet_visibility'     => $tablet_visibility,
            'priority'              => $priority,
            'createdAt'             => $createdAt,
            'updatedAt'             => $updatedAt,
            'location_visibility'   => $location_visibility,
            'locations'             => $locations,
            'selected_posts'        => $selected_posts,
            'post_page_id'          => $post_page_id,
            'enable_custom_styling' => $enable_custom_styling,
            'desk_title_size'       => $desk_title_size,
            'desk_desc_size'        => $desk_desc_size,
            'mob_title_size'        => $mob_title_size,
            'mob_desc_size'         => $mob_desc_size,
            'tab_title_size'        => $tab_title_size,
            'tab_desc_size'         => $tab_desc_size,
            'btn_bg_color'          => $btn_bg_color,
            'btn_text_color'        => $btn_text_color,
            'btn_border_rad'        => $btn_border_rad,
            'img_border_rad'        => $img_border_rad,
            'imageSizeType'         => $imageSizeType,
            'img_width'             => $img_width,
            'img_height'            => $img_height,
            'box_border_rad'        => $box_border_rad,
            'box_width'             => $box_width
        ];

        $existingData = get_option('pop_and_convert_list_array');
        $existingData[] = $newObject;

        update_option('pop_and_convert_list_array', $existingData);

        return rest_ensure_response(  $existingData );
    }

    /**
     * Update individual notification that matches ID on $req without altering remaining data
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_individual_notification($req){
        $id = $req['id'];
        $notificationArray = get_option('pop_and_convert_list_array');

        $existingData = array_filter($notificationArray, function($arr) use ($id){
            return $arr['id'] != $id;
        });

        $getModifiedData = array_values($existingData);

        $schema = $this->get_item_schema();

        if ( ! empty( $schema['properties']['title'] ) && isset( $req['title'] ) ) {
            $title = sanitize_text_field( $req['title'] );
		}

        if ( ! empty( $schema['properties']['type'] ) && isset( $req['type'] ) ) {
            $type = sanitize_text_field( $req['type'] );
		}

        if ( ! empty( $schema['properties']['leadTitle'] ) && isset( $req['leadTitle'] ) ) {
            $leadTitle = sanitize_text_field( $req['leadTitle'] );
		}

        if ( ! empty( $schema['properties']['status'] ) && isset( $req['status'] ) ) {
            $status = sanitize_text_field( $req['status'] );
		}

        if ( ! empty( $schema['properties']['sticky_layout'] ) && isset( $req['sticky_layout'] ) ) {
            $sticky_layout = sanitize_text_field( $req['sticky_layout'] );
		}

        if ( ! empty( $schema['properties']['popup_layout'] ) && isset( $req['popup_layout'] ) ) {
            $popup_layout = sanitize_text_field( $req['popup_layout'] );
		}

        if ( ! empty( $schema['properties']['description'] ) && isset( $req['description'] ) ) {
            $description = wp_kses_post( $req['description'] );
		}

        if ( ! empty( $schema['properties']['createdAt'] ) && isset( $req['createdAt'] ) ) {
            $createdAt = absint( $req['createdAt'] );
		}

        if ( ! empty( $schema['properties']['updatedAt'] ) && isset( $req['updatedAt'] ) ) {
            $updatedAt = absint( $req['updatedAt'] );
		}

        if ( ! empty( $schema['properties']['image_data'] ) && isset( $req['image_data'] ) ) {
            $image_data = $this->wporg_recursive_sanitize_text_field( $req['image_data'] );
		}

        if ( ! empty( $schema['properties']['location_visibility'] ) && isset( $req['location_visibility'] ) ) {
            $location_visibility = sanitize_text_field( $req['location_visibility'] );
		}

        if ( ! empty( $schema['properties']['locations'] ) && isset( $req['locations'] ) ) {
            $locations = $this->wporg_recursive_sanitize_text_field( $req['locations'] );
		}

        if ( ! empty( $schema['properties']['selected_posts'] ) && isset( $req['selected_posts'] ) ) {
            $selected_posts =  $req['selected_posts'];
		}

        if ( ! empty( $schema['properties']['post_page_id'] ) && isset( $req['post_page_id'] ) ) {
            $post_page_id   = sanitize_text_field( $req['post_page_id'] );
        }

        if ( ! empty( $schema['properties']['buttonLink'] ) && isset( $req['buttonLink'] ) ) {
            $buttonLink = esc_url_raw( $req['buttonLink'] );
		}

        if ( ! empty( $schema['properties']['buttonTitle'] ) && isset( $req['buttonTitle'] ) ) {
            $buttonTitle = sanitize_text_field( $req['buttonTitle'] );
		}

        if ( ! empty( $schema['properties']['newTab'] ) && isset( $req['newTab'] ) ) {
            $newTab  = $this->sanitize_checkbox($req['newTab']);
		}
        
        if ( ! empty( $schema['properties']['relAttribute'] ) && isset( $req['relAttribute'] ) ) {
            $relAttribute = $this->wporg_recursive_sanitize_text_field( $req['relAttribute'] );
        }

        if ( ! empty( $schema['properties']['trigger'] ) && isset( $req['trigger'] ) ) {
            $trigger = sanitize_text_field( $req['trigger'] );
        }

        if ( ! empty( $schema['properties']['delay'] ) && isset( $req['delay'] ) ) {
            $delay   = sanitize_text_field( $req['delay'] );
        }

        if ( ! empty( $schema['properties']['desktop_visibility'] ) && isset( $req['desktop_visibility'] ) ) {
            $desktop_visibility = $this->sanitize_checkbox( $req['desktop_visibility'] );
        }

        if ( ! empty( $schema['properties']['mobile_visibility'] ) && isset( $req['mobile_visibility'] ) ) {
            $mobile_visibility  = $this->sanitize_checkbox($req['mobile_visibility'] );
        }

        if ( ! empty( $schema['properties']['tablet_visibility'] ) && isset( $req['tablet_visibility'] ) ) {
            $tablet_visibility  = $this->sanitize_checkbox($req['tablet_visibility'] );
        }

        if ( ! empty( $schema['properties']['priority'] ) && isset( $req['priority'] ) ) {
            $priority = absint( $req['priority'] );
        }

        if ( ! empty( $schema['properties']['enable_custom_styling'] ) && isset( $req['enable_custom_styling'] ) ) {
            $enable_custom_styling = $this->sanitize_checkbox( $req['enable_custom_styling'] );
        }

        if ( ! empty( $schema['properties']['desk_title_size'] ) && isset( $req['desk_title_size'] ) ) {
            $desk_title_size = sanitize_text_field( $req['desk_title_size'] );
        }

        if ( ! empty( $schema['properties']['desk_desc_size'] ) && isset( $req['desk_desc_size'] ) ) {
            $desk_desc_size = sanitize_text_field( $req['desk_desc_size'] );
        }

        if ( ! empty( $schema['properties']['mob_title_size'] ) && isset( $req['mob_title_size'] ) ) {
            $mob_title_size = sanitize_text_field( $req['mob_title_size'] );
        }

        if ( ! empty( $schema['properties']['mob_desc_size'] ) && isset( $req['mob_desc_size'] ) ) {
            $mob_desc_size = sanitize_text_field( $req['mob_desc_size'] );
        }

        if ( ! empty( $schema['properties']['tab_title_size'] ) && isset( $req['tab_title_size'] ) ) {
            $tab_title_size = sanitize_text_field( $req['tab_title_size'] );
        }

        if ( ! empty( $schema['properties']['tab_desc_size'] ) && isset( $req['tab_desc_size'] ) ) {
            $tab_desc_size = sanitize_text_field( $req['tab_desc_size'] );
        }

        if ( ! empty( $schema['properties']['btn_bg_color'] ) && isset( $req['btn_bg_color'] ) ) {
            $btn_bg_color = $this->color_sanitization_callback( $req['btn_bg_color'] );
        }

        if ( ! empty( $schema['properties']['btn_text_color'] ) && isset( $req['btn_text_color'] ) ) {
            $btn_text_color = $this->color_sanitization_callback( $req['btn_text_color'] );
        }

        if ( ! empty( $schema['properties']['btn_border_rad'] ) && isset( $req['btn_border_rad'] ) ) {
            $btn_border_rad = sanitize_text_field( $req['btn_border_rad'] );
        }

        if ( ! empty( $schema['properties']['img_border_rad'] ) && isset( $req['img_border_rad'] ) ) {
            $img_border_rad = sanitize_text_field( $req['img_border_rad'] );
        }

        if ( ! empty( $schema['properties']['box_border_rad'] ) && isset( $req['box_border_rad'] ) ) {
            $box_border_rad = sanitize_text_field( $req['box_border_rad'] );
        }

        if ( ! empty( $schema['properties']['imageSizeType'] ) && isset( $req['imageSizeType'] ) ) {
            $imageSizeType = sanitize_text_field( $req['imageSizeType'] );
        }

        if ( ! empty( $schema['properties']['img_width'] ) && isset( $req['img_width'] ) ) {
            $img_width = sanitize_text_field( $req['img_width'] );
        }

        if ( ! empty( $schema['properties']['img_height'] ) && isset( $req['img_height'] ) ) {
            $img_height = sanitize_text_field( $req['img_height'] );
        }

        if ( ! empty( $schema['properties']['box_width'] ) && isset( $req['box_width'] ) ) {
            $box_width = sanitize_text_field( $req['box_width'] );
        }

        $newObject = [
            'id'                    => $id,
            'title'                 => $title,
            'type'                  => $type,
            'sticky_layout'         => $sticky_layout,
            'popup_layout'          => $popup_layout,
            'leadTitle'             => $leadTitle,
            'description'           => $description,
            'image_data'            => $image_data,
            'status'                => $status,
            'buttonLink'            => $buttonLink,
            'buttonTitle'           => $buttonTitle,
            'newTab'                => $newTab,
            'relAttribute'          => $relAttribute,
            'trigger'               => $trigger,
            'delay'                 => $delay,
            'desktop_visibility'    => $desktop_visibility,
            'mobile_visibility'     => $mobile_visibility,
            'tablet_visibility'     => $tablet_visibility,
            'priority'              => $priority,
            'createdAt'             => $createdAt,
            'updatedAt'             => $updatedAt,
            'location_visibility'   => $location_visibility,
            'locations'             => $locations,
            'selected_posts'        => $selected_posts,
            'post_page_id'          => $post_page_id,
            'enable_custom_styling' => $enable_custom_styling,
            'desk_title_size'       => $desk_title_size,
            'desk_desc_size'        => $desk_desc_size,
            'mob_title_size'        => $mob_title_size,
            'mob_desc_size'         => $mob_desc_size,
            'tab_title_size'        => $tab_title_size,
            'tab_desc_size'         => $tab_desc_size,
            'btn_bg_color'          => $btn_bg_color,
            'btn_text_color'        => $btn_text_color,
            'btn_border_rad'        => $btn_border_rad,
            'img_border_rad'        => $img_border_rad,
            'imageSizeType'         => $imageSizeType,
            'img_width'             => $img_width,
            'img_height'            => $img_height,
            'box_border_rad'        => $box_border_rad,
            'box_width'             => $box_width,
        ];

        $getModifiedData[] = $newObject;

        update_option('pop_and_convert_list_array', $getModifiedData);

        return rest_ensure_response($getModifiedData);
    }

    /**
     * Delete notifications
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_notifications($req){
        $id = $req['id'];
        $notificationArray = get_option('pop_and_convert_list_array');
        $notificationStatsArray = get_option('pop_and_convert_notification_stats');

        //Update Notification List Array
        $existingData = array_filter($notificationArray, function($arr) use ($id){
            return $arr['id'] != $id;
        });

        $getModifiedData = array_values($existingData);

        update_option('pop_and_convert_list_array', $getModifiedData);

        //Update Notification Stats Array
        $existingStatsData = array_filter($notificationStatsArray, function($arr) use ($id){
            return $arr['id'] != $id;
        });

        $getModifiedStats = array_values($existingStatsData);

        update_option('pop_and_convert_notification_stats', $getModifiedStats);

        return rest_ensure_response( $getModifiedData );
    }

    /**
     * Delete multiple notifications
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_bulk_notifications($req){
        
        $notificationArray      = get_option('pop_and_convert_list_array');
        $notificationStatsArray = get_option('pop_and_convert_notification_stats');

        //Update Notification List Array
        $existingData = array_filter($notificationArray, function($arr) use($req){
            return !in_array($arr['id'], $req['ids']);
        });

        $getModifiedData = array_values($existingData);

        update_option('pop_and_convert_list_array', $getModifiedData);

        //Update Notification Stats Array
        $existingStatsData = array_filter($notificationStatsArray, function($arr) use($req){
            return !in_array($arr['id'], $req['ids']);
        });

        $getModifiedStats = array_values($existingStatsData);

        update_option('pop_and_convert_notification_stats', $getModifiedStats);

        return rest_ensure_response($getModifiedData);
    }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function notification_nonce_check(){
        /**
		 * Verify if the current user has publish_posts capability.
		 * This capability is required to access the dashboard screen.
		 */

        if ( ! function_exists( 'get_editable_roles' ) ) {
            require_once ABSPATH . 'wp-admin/includes/user.php';
        }

        $roles = \pop_and_convert_get_saved_roles();

        foreach($roles as $role ){
            if ( current_user_can($role) ) {
                return true;
            }
        }

        return new WP_Error( 'rest_notification_cannot_edit', __( 'Sorry, you are not allowed to manage Notifications.', 'pop-and-convert' ), array( 'status' => rest_authorization_required_code() ) );

    }

    /**
     * Check if a given request has access to read the data
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function notification_permissions_check(){
        return true;
    }

    /**
     * Check if the incoming variable is boolean and sanitize the value
     *
     * @param boolean $checked
     * @return void
     */
    public function sanitize_checkbox( $checked ){
        // Boolean check.
        return ( ( isset( $checked ) && true == $checked ) ? true : false );
    }

    /***
     * To ensure arrays are properly sanitized to WordPress Codex standards,
     * they encourage usage of sanitize_text_field(). That only works with a single
     * variable (string). This function allows for a full blown array to get sanitized
     * properly, while sanitizing each individual value in a key -> value pair.
     *
     * Note: Modified the original function to account for array with objects
     * 
     * Source: https://wordpress.stackexchange.com/questions/24736/wordpress-sanitize-array
     * Author: Broshi, answered Feb 5 '17 at 9:14
     */
    public function wporg_recursive_sanitize_text_field( $array ) {
        if( empty($array)) return array();
        foreach ( $array as $key => &$value ) {
            if ( is_array( $value ) ) {
                $value = $this->wporg_recursive_sanitize_text_field( $value );
            } elseif ( is_object( $value ) ) {
                // If the value is an object, loop through its properties and sanitize them
                foreach ( $value as $prop => &$val ) {
                    if ( gettype($val) === 'integer' ){
                        $val = absint( $val );
                    } elseif( gettype($val) === 'string') {
                        $val = sanitize_text_field( $val );
                    } elseif(gettype($val) === 'boolean'){
                        $val = $this->sanitize_checkbox( $val );
                    }
                }
            } else {
                $value = sanitize_text_field( $value );
            }
        }
        return $array;
    }

    /**
     * Sanitize color - works for hex, rgb, rgba, hsl, & hsla values
     *
     * @param string $value
     * @return string
     */
    public function color_sanitization_callback( $value ) {
        // This pattern will check and match 3/6/8-character hex, rgb, rgba, hsl, & hsla colors.
        $pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|\#[\da-f]{8}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
        \preg_match( $pattern, $value, $matches );
        // Return the 1st match found.
        if ( isset( $matches[0] ) ) {
            if ( is_string( $matches[0] ) ) {
                return $matches[0];
            }
            if ( is_array( $matches[0] ) && isset( $matches[0][0] ) ) {
                return $matches[0][0];
            }
        }
        // If no match was found, return an empty string.
        return '';
    }

    /**
     * Get Default Notifications Settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_notifications_settings($request) {
    
        if( get_option('pop_and_convert_global_settings') === false ){
            $notificationSettings = [];
        } else {
            $notificationSettings = get_option('pop_and_convert_global_settings');
        }    
        $response  = rest_ensure_response( $notificationSettings );

        return $response;
    }

    /**
     * Update Global Notification Settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_notifications_settings($request) {

        $schema = $this->get_item_schema();

        if ( ! empty( $schema['properties']['trigger'] ) && isset( $request['trigger'] ) ) {
            $trigger = sanitize_text_field( $request['trigger'] );
        }

        if ( ! empty( $schema['properties']['delay'] ) && isset( $request['delay'] ) ) {
            $delay   = sanitize_text_field( $request['delay'] );
        }

        if ( ! empty( $schema['properties']['dismiss'] ) && isset( $request['dismiss'] ) ) {
            $dismiss   = sanitize_text_field( $request['dismiss'] );
        }

        if ( ! empty( $schema['properties']['desk_title_size'] ) && isset( $request['desk_title_size'] ) ) {
            $desk_title_size = sanitize_text_field( $request['desk_title_size'] );
        }

        if ( ! empty( $schema['properties']['desk_desc_size'] ) && isset( $request['desk_desc_size'] ) ) {
            $desk_desc_size = sanitize_text_field( $request['desk_desc_size'] );
        }

        if ( ! empty( $schema['properties']['mob_title_size'] ) && isset( $request['mob_title_size'] ) ) {
            $mob_title_size = sanitize_text_field( $request['mob_title_size'] );
        }

        if ( ! empty( $schema['properties']['mob_desc_size'] ) && isset( $request['mob_desc_size'] ) ) {
            $mob_desc_size = sanitize_text_field( $request['mob_desc_size'] );
        }

        if ( ! empty( $schema['properties']['tab_title_size'] ) && isset( $request['tab_title_size'] ) ) {
            $tab_title_size = sanitize_text_field( $request['tab_title_size'] );
        }

        if ( ! empty( $schema['properties']['tab_desc_size'] ) && isset( $request['tab_desc_size'] ) ) {
            $tab_desc_size = sanitize_text_field( $request['tab_desc_size'] );
        }

        if ( ! empty( $schema['properties']['btn_bg_color'] ) && isset( $request['btn_bg_color'] ) ) {
            $btn_bg_color = $this->color_sanitization_callback( $request['btn_bg_color'] );
        }

        if ( ! empty( $schema['properties']['btn_text_color'] ) && isset( $request['btn_text_color'] ) ) {
            $btn_text_color = $this->color_sanitization_callback( $request['btn_text_color'] );
        }

        if ( ! empty( $schema['properties']['btn_border_rad'] ) && isset( $request['btn_border_rad'] ) ) {
            $btn_border_rad = sanitize_text_field( $request['btn_border_rad'] );
        }

        if ( ! empty( $schema['properties']['img_border_rad'] ) && isset( $request['img_border_rad'] ) ) {
            $img_border_rad = sanitize_text_field( $request['img_border_rad'] );
        }

        if ( ! empty( $schema['properties']['box_border_rad'] ) && isset( $request['box_border_rad'] ) ) {
            $box_border_rad = sanitize_text_field( $request['box_border_rad'] );
        }

        if ( ! empty( $schema['properties']['imageSizeType'] ) && isset( $request['imageSizeType'] ) ) {
            $imageSizeType = sanitize_text_field( $request['imageSizeType'] );
        }

        if ( ! empty( $schema['properties']['img_width'] ) && isset( $request['img_width'] ) ) {
            $img_width = sanitize_text_field( $request['img_width'] );
        }

        if ( ! empty( $schema['properties']['img_height'] ) && isset( $request['img_height'] ) ) {
            $img_height = sanitize_text_field( $request['img_height'] );
        }

        if ( ! empty( $schema['properties']['desktop_visibility'] ) && isset( $request['desktop_visibility'] ) ) {
            $desktop_visibility = $this->sanitize_checkbox( $request['desktop_visibility'] );
        }

        if ( ! empty( $schema['properties']['mobile_visibility'] ) && isset( $request['mobile_visibility'] ) ) {
            $mobile_visibility  = $this->sanitize_checkbox($request['mobile_visibility'] );
        }

        if ( ! empty( $schema['properties']['tablet_visibility'] ) && isset( $request['tablet_visibility'] ) ) {
            $tablet_visibility  = $this->sanitize_checkbox($request['tablet_visibility'] );
        }

        if ( ! empty( $schema['properties']['displayCredits'] ) && isset( $request['displayCredits'] ) ) {
            $displayCredits  = $this->sanitize_checkbox($request['displayCredits'] );
        }

        if ( ! empty( $schema['properties']['affiliateLink'] ) && isset( $request['affiliateLink'] ) ) {
            $affiliateLink = esc_url_raw( $request['affiliateLink'] );
		}

        if ( ! empty( $schema['properties']['userRoles'] ) && isset( $request['userRoles'] ) ) {
            $userRoles = $this->wporg_recursive_sanitize_text_field( $request['userRoles'] );
            if (!in_array('Administrator', $userRoles)) {
                array_push($userRoles, 'Administrator'); //make sure Administrator role is in the array in all instances.
            }
        }

        $newObject = [
            'delay'              => $delay,
            'dismiss'            => $dismiss,
            'trigger'            => $trigger,
            'desk_title_size'    => $desk_title_size,
            'desk_desc_size'     => $desk_desc_size,
            'mob_title_size'     => $mob_title_size,
            'mob_desc_size'      => $mob_desc_size,
            'tab_title_size'     => $tab_title_size,
            'tab_desc_size'      => $tab_desc_size,
            'btn_bg_color'       => $btn_bg_color,
            'btn_text_color'     => $btn_text_color,
            'btn_border_rad'     => $btn_border_rad,
            'img_border_rad'     => $img_border_rad,
            'imageSizeType'      => $imageSizeType,
            'img_width'          => $img_width,
            'img_height'         => $img_height,
            'box_border_rad'     => $box_border_rad,
            'desktop_visibility' => $desktop_visibility,
            'mobile_visibility'  => $mobile_visibility,
            'tablet_visibility'  => $tablet_visibility,
            'displayCredits'     => $displayCredits,
            'affiliateLink'      => $affiliateLink,
            'userRoles'          => $userRoles,
        ];

        update_option('pop_and_convert_global_settings', $newObject);

        return rest_ensure_response( $newObject );
    }

    /**
     * Get Notifications Stats
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_notifications_stats($request) {

        if( get_option('pop_and_convert_notification_stats') === false ){
            $notificationStats = [];
        } else {
            $notificationStats = get_option('pop_and_convert_notification_stats');
        }    
        $response  = rest_ensure_response( $notificationStats );

        return $response;
    }

    /**
     * Get Individual Notifications Stats
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_individual_notifications_stats($request) {

        $id = $request['id'];
        $notificationStatsArray = get_option('pop_and_convert_notification_stats');

        $data = array_filter($notificationStatsArray, function($arr) use ($id){
            return $arr['id'] == $id;
        });
        $getObjData = array_values($data);
        $response  = rest_ensure_response($getObjData[0] );

        return $response;
    }

        /**
     * Update the entire notifications object stats
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_notifications_stats($req){

        if( get_option('pop_and_convert_notification_stats') === false ){
            add_option('pop_and_convert_notification_stats', array());
        }

		$schema = $this->get_item_schema();

        if ( ! empty( $schema['properties']['id'] ) && isset( $req['id'] ) ) {
            $newID = sanitize_text_field( $req['id'] );
		}

        if ( ! empty( $schema['properties']['views'] ) && isset( $req['views'] ) ) {
            $views = absint( $req['views'] );
		}

        if ( ! empty( $schema['properties']['clicks'] ) && isset( $req['clicks'] ) ) {
            $clicks = absint( $req['clicks'] );
		}

        $newObject = [
            'id'                    => $newID,
            'views'                 => $views,
            'clicks'                => $clicks
        ];

        $existingData = get_option('pop_and_convert_notification_stats');
        $existingData[] = $newObject;

        update_option('pop_and_convert_notification_stats', $existingData);

        return rest_ensure_response(  $existingData );
    }

    /**
     * Update Individual Notifications Stats
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_individual_notifications_stats($request) {
        
        $id = $request['id'];

        $notificationArray = get_option('pop_and_convert_notification_stats');

        if( is_array($notificationArray )){
            $existingData = array_filter($notificationArray, function($arr) use ($id){
                return $arr['id'] != $id;
            });

            $getModifiedStats = array_values($existingData);

            $schema = $this->get_item_schema();

            if ( ! empty( $schema['properties']['views'] ) && isset( $request['views'] ) ) {
                $views = absint( $request['views'] );
            }

            if ( ! empty( $schema['properties']['clicks'] ) && isset( $request['clicks'] ) ) {
                $clicks = absint( $request['clicks'] );
            }

            $newObject = [
                'id'                    => $id,
                'views'                 => $views,
                'clicks'                => $clicks,
            ];

            $getModifiedStats[] = $newObject;

            update_option('pop_and_convert_notification_stats', $getModifiedStats);
        } else {
            update_option('pop_and_convert_notification_stats', []);
        }

        return rest_ensure_response( $getModifiedStats );
    }
}

new Notification_Rest_Controller();