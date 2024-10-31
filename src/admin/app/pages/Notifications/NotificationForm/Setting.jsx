import { useContext } from 'react';
import { FormContext } from '.';
import { Icon, MultiSelect, Tooltip } from '../../../components';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { getPostsDetails } from '../../../store';
import { __, sprintf } from "@wordpress/i18n";
import DOMPurify from 'dompurify';

let postsList = await getPostsDetails();
const postsData = postsList?.map(({ title, id: _id, type }) => {
    return { id: _id, title: title.rendered, type: type }
})

function Setting() {

    const { state: formData, setState: setFormData } = useContext(FormContext)

    const units = [
        { value: "sec", label: "sec", default: 0 },
        { value: "min", label: "min", default: 0 },
        { value: "hour", label: "hour", default: 0 },
    ]

    const locationOptions = ['Front Page', 'Blog Page', 'All posts, pages and custom post types', 'All Posts', 'All Pages', 'All Archive Pages', 'Custom Post Types', 'Search Page', '404 Page', 'Custom Post/Page'];

    function handleDelayChanges(value) {
        setFormData('delay')(value)
    }

    function handleLocationChange(value) {
        setFormData('locations')(value)
    }

    function handlePostSelectionChange(value) {

        let selectedPostsData = postsData.filter(({ title, type }) => {
            return value.includes(title)
        })
        setFormData('selected_posts')(selectedPostsData)
    }

    const titleAry = formData?.selected_posts !== undefined && formData?.selected_posts?.map(item => item.title)

    // hide location
    const handleLocationHide = (event) => {
        const value = event.target.value;
        setFormData('location_visibility')(value);
    };

    //Trigger Rule
    const handleTriggerRule = (event) => {
        const value = event.target.value;
        setFormData('trigger')(value);
    };

    return (
        <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
            <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Display Rules', 'pop-and-convert')}</h2>
            <div className="device flex gap-9">
                <div className="label">
                    <p className='title'>{__('Device Visibility', 'pop-and-convert')}</p>
                    <Tooltip content={__('Choose the device where you want to display the notification.', 'pop-and-convert')} direction="left">
                        <Icon icon={'help'} />
                    </Tooltip>
                </div>
                <div className="flex-1 flex items-center gap-11">
                    <div className='space-x-2'>
                        <input type="checkbox" id="desktop" name="desktop" onChange={setFormData('desktop_visibility')} checked={formData?.desktop_visibility || false} />
                        <label htmlFor="desktop">{__('Desktop', 'pop-and-convert')}</label>
                    </div>
                    <div className='space-x-2'>
                        <input type="checkbox" id="tablet" name="tablet" onChange={setFormData('tablet_visibility')} checked={formData?.tablet_visibility || false} />
                        <label htmlFor="tablet">{__('Tablet', 'pop-and-convert')}</label>
                    </div>
                    <div className='space-x-2'>
                        <input type="checkbox" id="mobile" name="mobile" onChange={setFormData('mobile_visibility')} checked={formData?.mobile_visibility || false} />
                        <label htmlFor="mobile">{__('Mobile', 'pop-and-convert')}</label>
                    </div>
                </div>
            </div>
            <div className="flex gap-9">
                <div className="label self-start mt-3">
                    <div className="tittle-wrapper flex gap-2 items-center ">
                        <p className='title'>{__('Location', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose the preferred location for your notification.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                </div>
                <div className="dropdown-menu flex-col">
                    <select className='list !w-full' name="location" id="location" onChange={handleLocationHide} value={formData?.location_visibility || ''}>
                        <option value="entire">{__('Entire Website', 'pop-and-convert')}</option>
                        <option value="showselected">{__('Show on Selected', 'pop-and-convert')}</option>
                        <option value="hideselected">{__('Hide on Selected', 'pop-and-convert')}</option>
                    </select>
                    {!formData.location_visibility?.includes('entire') && (
                        <div className="location w-full">
                            <p className="w-1/4 text-sm leading-6 mb-2">{__('Locations', 'pop-and-convert')}</p>
                            <MultiSelect callback={handleLocationChange} options={locationOptions} showSearch={true} optionLocations={formData?.locations || []} />
                        </div>
                    )}

                    {formData.locations?.includes('Custom Post/Page') && !formData.location_visibility?.includes('entire') && (
                        <div className="location w-full">
                            <p className="w-1/4 text-sm leading-6 mb-2">{__('Select Posts or Pages', 'pop-and-convert')}</p>
                            <MultiSelect callback={handlePostSelectionChange} options={postsData} showSearch={true} optionLocations={titleAry || []} isObjectArray={true} />
                            <div className="flex mt-4">
                                <div className="label self-start mt-4">
                                    <p className='text-sm'>{__('Post/Page ID', 'pop-and-convert')}</p>
                                    <Tooltip content={__('You can set the post or page ID', 'pop-and-convert')} direction="left">
                                        <Icon icon={'help'} />
                                    </Tooltip>
                                </div>
                                <div className="unit-control w-full">
                                    <input type="text" className='pac-input' placeholder={__('Example: 1,35,45', 'pop-and-convert')} value={formData?.post_page_id || ''} onChange={setFormData('post_page_id')} />
                                    <span
                                        className="italic text-xs text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(sprintf(
                                                __(
                                                    "Refer to %sthis guide%s on how to find the ID.",
                                                    "pop-and-convert"
                                                ),
                                                '<a href="https://popandconvert.com/docs/how-to-find-page-post-id/" rel="nofollow" class="text-primary-color underline underline-offset-2" target="_blank">',
                                                "</a>"
                                            )),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-9">
                <div className="label self-start mt-3">
                    <p className='title'>{__('Trigger', 'pop-and-convert')}</p>
                    <Tooltip content={__('Choose the trigger to initiate your notification.', 'pop-and-convert')} direction="left">
                        <Icon icon={'help'} />
                    </Tooltip>
                </div>
                <div className="dropdown-menu flex-col">
                    <select className='list !w-full' name="location" id="location" onChange={handleTriggerRule} value={formData?.trigger || ''}>
                        <option value="onpageload">{__('On Page Load', 'pop-and-convert')}</option>
                        <option value={pacpAdminData.pro_activated ? 'onpageexit' : ''} disabled={!pacpAdminData.pro_activated}>{pacpAdminData.pro_activated ? __('On Page Exit Intent', 'pop-and-convert') : __('On Page Exit Intent (Pro Version)', 'pop-and-convert')}</option>
                    </select>
                    {formData.trigger?.includes('onpageload') && (
                        <div className="location w-full">
                            <div className="flex gap-9">
                                <div className="label">
                                    <p className='text-sm'>{__('Notification Delay', 'pop-and-convert')}</p>
                                    <Tooltip content={__('Choose the time after which the notification should appear.', 'pop-and-convert')} direction="left">
                                        <Icon icon={'help'} />
                                    </Tooltip>
                                </div>
                                <div className="unit-control">
                                    <UnitControl onChange={handleDelayChanges} value={formData?.delay || ''} units={units} placeholder={__("Time Delay", 'pop-and-convert')} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-9">
                <div className="label">
                    <p className='title'>{__('Priority', 'pop-and-convert')} </p>
                    <Tooltip content={__('Choose the priority for your notification. The highest priority notification will only appear if multiple notifications are set for the same location.', 'pop-and-convert')} direction="left">
                        <Icon icon={'help'} />
                    </Tooltip>
                </div>
                <div className="unit-control">
                    <input className='!flex-grow-0 !border-border-color !py-2 px-2 text-sm !leading-[1.7em] ' type="number" name="notiDelay" placeholder={__("Value Here", 'pop-and-convert')} value={formData?.priority || ''} onChange={setFormData('priority')} />
                </div>
            </div>
        </div>
    )
}

export default Setting