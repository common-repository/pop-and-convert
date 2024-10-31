import { __ } from "@wordpress/i18n";
import { UpgradeLink } from "../app/components";
import { applyFilters } from '@wordpress/hooks'
import postMeta from '../../admin/app/assets/postMeta.png'
function MainInner({ setSettingPopup }) {
    return (
        <>
            {
                (!pacpAdminData.pro_activated || (pacpAdminData.pro_activated && pacpAdminData.licenseActive !== 'valid')) && (
                    <UpgradeLink
                        imageSrc={postMeta}
                        link="https://popandconvert.com"
                        className="min-h-[572px]"
                        message={__("Upgrade to premium with active license to access all the features.", "pop-and-convert")}
                    />
                )
            }
            {pacpAdminData.licenseActive === 'valid' && applyFilters('pac_postmeta_notification_data', setSettingPopup, null)}
        </>
    )
}

export default MainInner