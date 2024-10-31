import { redirect } from "react-router-dom";
import NotificationForm from "./NotificationForm";

export const action = (queryClient) => async ({ request, params }) => {
    queryClient.invalidateQueries({ queryKey: ['notifications', 'all'] })
    return redirect(`/notifications/`)
}

export default function CreateNotification() {

    const data = {
        title: '',
        status: 'inactive',
        type: 'sticky',
        buttonLink: '',
        buttonTitle: '',
        newTab: false,
        relAttribute: [],
        leadTitle: '',
        type: 'sticky',
        sticky_layout: 'sticky-layout-1',
        popup_layout: 'popup-layout-1',
        image_data: [{url: '', id: ''}],
        description: '',
        delay: '30sec',
        desktop_visibility: true,
        mobile_visibility: true,
        tablet_visibility: true,
        priority: 10,
        createdAt : null,
        updatedAt : null,
        location_visibility : 'entire',
        locations : [],
        enable_custom_styling : true,
        desk_title_size : '22px',
        desk_desc_size : '16px',
        mob_title_size : '20px',
        mob_desc_size : '16px',
        tab_title_size : '20px',
        tab_desc_size : '16px',
        btn_bg_color: '#253b80',
        btn_text_color: '#ffffff',
        btn_border_rad : '5px',
        img_border_rad : '100%',
        img_width : '',
        img_height : '',
        imageSizeType: 'default',
        box_border_rad : '5px',
        box_width : '',
        trigger: 'onpageload',
        selected_posts : [],
        post_page_id: ''
    }

    return <NotificationForm notification={data} />;
}
