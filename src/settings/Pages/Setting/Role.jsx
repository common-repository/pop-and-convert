import { Icon, Tooltip, MultiSelect } from "../../../admin/app/components";
import SaveButton from "./SaveButton";
import { __ } from '@wordpress/i18n';

function Role(props) {
    const { notificationSetting, handleChange, handleSave } = props

    const roleOptions = Object.values(pacpAdminData.user_data)

    function handleRoleChange(value) {
        handleChange('userRoles')(value)
    }
    return (
        <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
            <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Role Capability Settings', 'pop-and-convert')}</h2>
            <div className="device flex gap-9">
                <div className="label">
                    <p className='title'>{__('Manage Notifications', 'pop-and-convert')}</p>
                    <Tooltip content={__('Choose roles of users who can manage notifications.', 'pop-and-convert')} direction="left">
                        <Icon icon={'help'} />
                    </Tooltip>
                </div>
                <div className="flex-1 dropdown-menu">
                    <MultiSelect callback={handleRoleChange} options={roleOptions} showSearch={false} optionLocations={notificationSetting?.userRoles || ['Administrator']} className="!h-auto" />
                </div>
            </div>
            <SaveButton saveAction={handleSave} />
        </div>
    )
}

export default Role