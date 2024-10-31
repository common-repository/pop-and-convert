import { Icon, Tooltip, Toggle, UpgradeLink } from "../../../admin/app/components";
import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { applyFilters } from '@wordpress/hooks';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from "react"
import SaveButton from "./SaveButton";
import post_page_setting from '../../../admin/app/assets/general-post-page-settings.png'
import DOMPurify from "dompurify";

function General(props) {
    const { notificationSetting, handleChange, handleSave } = props
    const [displayCredits, setdisplayCredits] = useState(notificationSetting?.displayCredits || false)

    const units = [
        { value: "sec", label: "sec", default: 0 },
        { value: "min", label: "min", default: 0 },
        { value: "hour", label: "hour", default: 0 },
    ]

    function handleDelayChanges(value) {
        handleChange('delay')(value)
    }

    function handleDismissChanges(value) {
        handleChange('dismiss')(value)
    }

    //Trigger Rule
    const handleTriggerRule = (event) => {
        const value = event.target.value;
        handleChange('trigger')(value);
    }

    return (
        <div className="space-y-6">
            {
                pacpAdminData.pro_activated ?
                    <>
                        {
                            applyFilters('post_page_general_settings', units, notificationSetting, handleDelayChanges, handleTriggerRule, handleChange,  null)
                        }
                    </>
                    :
                    <div className="rounded bg-white box-shadow">
                        <UpgradeLink
                            imageSrc={post_page_setting}
                            link="https://www.popandconvert.com/"
                            className="min-h-[216px]"
                            message={__('Upgrade to premium to access all the features', 'pop-and-convert')}
                        />
                    </div>
            }
            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                <div className="location w-full">
                    <div className="flex gap-9">
                        <div className="label">
                            <p className='title'>{__('Dismiss Duration', 'pop-and-convert')}</p>
                            <Tooltip content={__('Set the time for disabling the notification from being displayed after it is dismissed.', 'pop-and-convert')} direction="left">
                                <Icon icon={'help'} />
                            </Tooltip>
                        </div>
                        <div className="unit-control">
                            <UnitControl onChange={handleDismissChanges} value={notificationSetting?.dismiss || ''} units={units} placeholder={__("Time Delay", 'pop-and-convert')} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-9">
                    <div className="label self-start">
                        <p className='title'>{__('Display Credits', 'pop-and-convert')}</p>
                        <Tooltip content={__('You can display the credit by adding your affiliate link.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex space-x-3">
                            <Toggle
                                type="checkbox"
                                checked={notificationSetting?.displayCredits || displayCredits}
                                value={notificationSetting?.displayCredits || false }
                                onChange={(e) => {
                                    setdisplayCredits(!displayCredits)
                                    handleChange('displayCredits')(e)
                                }}
                            />
                        </div>
                        <input type="text" className='pac-input' name="affiliateLink" placeholder={__('https://popandconvert.com', 'pop-and-convert')} value={notificationSetting?.affiliateLink || ''} onChange={handleChange('affiliateLink')} />
                        <p
                            className="pac-link"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(sprintf(
                                    __(
                                        "Sign up for %sour affiliate program%s to add your link to the credit.",
                                        "pop-and-convert"
                                    ),
                                    '<a href="https://popandconvert.com/affiliate-program/" class="text-primary-color underline underline-offset-2" rel="nofollow" target="_blank">',
                                    "</a>"
                                )),
                            }}
                        />
                    </div>
                </div>
                <SaveButton saveAction={handleSave} />
            </div>
        </div>

    )
}

export default General