import { __ } from '@wordpress/i18n';
import axios from 'axios';
import { Suspense, lazy, useState } from 'react';
import { toast } from 'sonner';
import { Icon, Loading } from "../../../admin/app/components";
import lazyRetry from '../../../admin/app/lib/lazyRetry';
import { getNotificationsSettings } from '../../helper';
import License from './License';
const Design = lazy(() => lazyRetry(() => import("./Design")));
const General = lazy(() => lazyRetry(() => import("./General")));
const Role = lazy(() => lazyRetry(() => import("./Role")));

const tabs = [
    { label: __('General', 'pop-and-convert'), content: General, icon: <Icon icon="setting" /> },
    { label: __( 'Customization', 'pop-and-convert' ), content: Design, icon: <Icon icon="puzzel" /> }
]

pacpAdminData.admin && tabs.push({ label: __( 'Role Management', 'pop-and-convert' ), content: Role, icon: <Icon icon="management" /> })
pacpAdminData.pro_activated && tabs.push({ label: __( 'License Activation', 'pop-and-convert' ), content: License, icon: <Icon icon="key" /> })

const defaultData = {
    trigger: 'onpageload',
    delay: '30sec',
    dismiss: '1hour',
    desk_title_size: '22px',
    desk_desc_size: '16px',
    mob_title_size: '20px',
    mob_desc_size: '16px',
    tab_title_size: '20px',
    tab_desc_size: '16px',
    btn_bg_color: '#253b80',
    btn_text_color: '#ffffff',
    btn_border_rad: '5px',
    img_border_rad: '100%',
    imageSizeType : 'default',
    affiliateLink: '',
    img_width: '',
    img_height: '',
    box_border_rad: '5px',
    desktop_visibility: true,
    tablet_visibility: true,
    mobile_visibility: true,
    displayCredits: false,
    userRoles: ['Administrator']
}

const retrieveData = await getNotificationsSettings();
const data = retrieveData.length === 0 ? defaultData : retrieveData;

export default function Settings() {
    const [activeTab, setActiveTab] = useState(0)
    const GeneralTab = tabs[activeTab].content

    const [globalSettings, setGlobalSettings] = useState(data)

    function handleTabClick(index) {
        setActiveTab(index)
    }

    const handleGlobalSettings = (key) => (event) => {

        if (typeof event === "object" && !Array.isArray(event)) {
            const { value, type, checked } = event.target
            setGlobalSettings({
                ...globalSettings,
                [key]: type === "checkbox" ? checked : value
            })
        } else if (typeof event === "string" || Number.isInteger(event) || Array.isArray(event)) {
            setGlobalSettings({
                ...globalSettings,
                [key]: event
            })
        }
    }

    const handleUpdate = async(DATA) => {
        const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-settings/`

        try {
            const res = axios.post(url, DATA, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-NONCE': pacpAdminData.nonce
                }
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    const handleUpdateMessage = () => {
        toast.promise(
            handleUpdate(globalSettings),
            {
                loading: __('Saving global settings', 'pop-and-convert'),
                success: __('Global settings saved successfully.', 'pop-and-convert'),
                error: __('Failed to save gloabl settings', 'pop-and-convert')
            }
        )
    }

    return (
        <div className="container pb-6 pl-7 pr-6 2xl:pl-0 2xl:pr-0">
            <h2 className='mt-6 font-bold text-2xl'>Settings</h2>
            <div className="flex gap-6 mt-6 flex-col lg:flex-row">
                <aside className="bg-white box-shadow rounded py-6 lg:w-1/4">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:sticky lg:top-12">
                        {tabs.map(({ label, icon }, index) => {
                            return <button onClick={() => handleTabClick(index)} className={`text-base py-2 px-4 text-left inline-flex items-center gap-3 hover:text-primary-color ${activeTab === index && 'border-l-4 border-primary-color text-primary-color font-semibold'}`} key={index} type="button">
                                {icon}
                                {label}
                            </button>
                        }
                        )}
                    </nav>
                </aside>
                <div className="flex-1">
                    <Suspense fallback={<Loading />}>
                        <GeneralTab notificationSetting={globalSettings} handleChange={handleGlobalSettings} handleSave={handleUpdateMessage} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}