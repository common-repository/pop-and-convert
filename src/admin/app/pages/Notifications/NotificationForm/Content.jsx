import { applyFilters } from '@wordpress/hooks';
import { __ } from "@wordpress/i18n";
import { useContext, useRef, useState } from 'react';
import layouts from '../../../assets/layouts.png';
import { Icon, MediaUploader, MultiSelect, RichText, SegmentedControl, Toggle, Tooltip, UpgradeLink } from '../../../components';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for styling

import { FormContext } from '.';


export default function Content({ notification }) {
    const { state: formData, setState: setFormData } = useContext(FormContext)

    let formDataType = formData?.type || 'sticky'
    let formStickyLayout = formData?.sticky_layout || 'sticky-layout-1'
    let formPopupLayout = formData?.popup_layout || 'popup-layout-1'
    let imageUrl = formData?.image_data || ''

    const [layoutOption, setLayoutOption] = useState(formDataType)

    const [newTabToggle, setNewTabToggle] = useState(formData?.newTab || false)

    const handleImageSelect = (url, id) => {
        setFormData('image_data')([{ url: url, id: id }])
    }

    const handleImageRemove = () => {
        setFormData('image_data')([{ url: "", id: "" }])
    }

    function handleTypeChange(e) {
        setLayoutOption(e.target.value)
        setFormData('type')(e)
    }

    function handleStickyChange(e) {
        setFormData('sticky_layout')(e)
    }

    function handlePopupChange(e) {
        setFormData('popup_layout')(e)
    }

    const layoutSegments = [
        {
            label: __('Sticky', 'pop-and-convert'),
            value: 'sticky',
            ref: useRef(),
        },
        {
            label: __('Overlay', 'pop-and-convert'),
            value: 'popup',
            ref: useRef(),
        }
    ]

    const stickyLayouts = [
        {
            label: __('Sticky layout 1', 'pop-and-convert'),
            value: 'sticky-layout-1',
            icon: 'stickyLayout1'
        },
        {
            label: __('Sticky layout 2', 'pop-and-convert'),
            value: 'sticky-layout-2',
            icon: 'stickyLayout2'
        }
    ]

    const popupLayouts = [
        {
            label: __('Overlay layout 1', 'pop-and-convert'),
            value: 'popup-layout-1',
            icon: 'popupLayout1'

        },
        {
            label: __('Overlay layout 2', 'pop-and-convert'),
            value: 'popup-layout-2',
            icon: 'popupLayout2'

        },
        {
            label: __('Overlay layout 3', 'pop-and-convert'),
            value: 'popup-layout-3',
            icon: 'popupLayout3'
        }
    ]

    const relOptions = ['nofollow', 'noopener', 'noreferrer', 'sponsored']

    function handleRelChange(value) {
        setFormData('relAttribute')(value)
    }

    return (
        <>
            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow mb-6">
                <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Content Settings', 'pop-and-convert')}</h2>
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Type', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose the desired type of notification.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1">
                        <SegmentedControl
                            name="type"
                            callback={handleTypeChange}
                            defaultIndex={layoutSegments.findIndex(segment => segment.value === formDataType)}
                            controlRef={useRef()}
                            segments={layoutSegments}
                        />
                    </div>
                </div>
                {pacpAdminData.pro_activated ?
                    <div className="flex gap-9 mb-8">
                        <div className="label">
                            <p className='title'>{__('Layout', 'pop-and-convert')}</p>
                            <Tooltip content={__('Choose the preferred layout for your notification.', 'pop-and-convert')} direction="left">
                                <Icon icon={'help'} />
                            </Tooltip>
                        </div>
                        <div className="flex-1">
                            {
                                applyFilters('pacp_layout', stickyLayouts, formStickyLayout, handleStickyChange, popupLayouts, formPopupLayout, layoutOption, handlePopupChange, null)
                            }
                        </div>
                    </div>
                    :
                    <UpgradeLink
                        imageSrc={layouts}
                        link="https://www.popandconvert.com/"
                        className="min-h-[116px]"
                        message={__('Upgrade to premium to access all the features', 'pop-and-convert')}
                    />
                }
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Title', 'pop-and-convert')}</p>
                        <Tooltip content={__('Add the title for your notification.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1">
                        <input type="text" className='pac-input' placeholder={__('Title Here', 'pop-and-convert')} required value={formData?.leadTitle || ''} onChange={setFormData('leadTitle')} />
                    </div>
                </div>
                <div className="flex gap-9">
                    <div className="label self-start mt-3">
                        <p className='title'>{__('Description', 'pop-and-convert')}</p>
                        <Tooltip content={__('Add the description for your notification.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1 richtext">
                        <RichText callback={(value) => setFormData('description')(value)} value={formData?.description || ''} />
                    </div>
                </div>
                <div className="flex gap-9">
                    <div className="label self-start mt-3">
                        <p className='title'>{__('Image', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose the suitable image for your notification.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1 flex gap-4">
                        <MediaUploader callback={handleImageSelect} className="flex-1">
                            <div className="rounded cursor-pointer px-6 py-4 border border-border-color text-center">
                                <div className="rounded-full border border-border-color bg-primary-accent-2 p-[10px] mx-auto inline-block mb-3">
                                    <Icon icon="upload" />
                                </div>
                                <p className='text-sm mb-1'>
                                    <span className=' font-semibold text-primary-color'>{__('Click to upload', 'pop-and-convert')}</span>
                                </p>
                                <p className='text-sm'>{__('PNG, JPG, WEBP or GIF', 'pop-and-convert')}</p>
                            </div>
                        </MediaUploader>
                        {formData?.image_data[0].url !== "" &&
                            <div className='w-1/4 relative'>
                                <img src={imageUrl[0].url} alt={__('Selected Image', 'pop-and-convert')} className='rounded w-full h-full object-cover max-h-[137px]' />
                                <button
                                    type='button'
                                    className='bg-white absolute top-2/4 left-2/4 transition-colors -translate-x-2/4 -translate-y-2/4 w-8 h-8 rounded-full flex items-center justify-center text-base-200 hover:bg-red-400'
                                    onClick={handleImageRemove}
                                >
                                    <Icon icon="trash-can" />
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="p-5 rounded gap-5 flex flex-col bg-white box-shadow">
                <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Button Settings', 'pop-and-convert')}</h2>
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Label', 'pop-and-convert')}</p>
                        <Tooltip content={__('Add the label for your notification button.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1">
                        <input type="text" className='pac-input' name="buttonTitle" value={formData?.buttonTitle || ''} onChange={setFormData('buttonTitle')} />
                    </div>
                </div>
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Link', 'pop-and-convert')}</p>
                        <Tooltip content={__('Add the link for your notification button.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1 flex items-center">
                        <input type="text" className='pac-input' name="buttonLink" placeholder={__('https://example.com', 'pop-and-convert')} value={formData?.buttonLink || ''} onChange={setFormData('buttonLink')} />
                    </div>
                </div>
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('rel attribute', 'pop-and-convert')}</p>
                        <Tooltip content={__('Add the rel attribute for the link of your button.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1 rel">
                        <MultiSelect callback={handleRelChange} options={relOptions} showSearch={false} optionLocations={formData?.relAttribute || []} />
                    </div>
                </div>
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Open in new tab', 'pop-and-convert')}</p>
                        <Tooltip content={__('Enable this to open the click in a new browser window.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1">
                        <Toggle
                            type="checkbox"
                            checked={formData?.newTab || newTabToggle}
                            value={formData?.newTab || ''}
                            onChange={(e) => {
                                setNewTabToggle(!newTabToggle)
                                setFormData('newTab')(e)
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
