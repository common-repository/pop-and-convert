import { useState, useRef } from "react"
import { Color, Tooltip, Icon, ResponsiveControl, SegmentedControl } from "../../../admin/app/components";
import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import SaveButton from "./SaveButton";
import { __ } from "@wordpress/i18n";

function Design(props) {
    const { notificationSetting, handleChange, handleSave } = props

    const [resTitle, setResTitle] = useState('desktop')

    const [resDesc, setResDesc] = useState('desktop')

    const imageSizeControlRef = useRef();


    const units = [
        { value: 'px', label: 'px', default: 0 },
        { value: '%', label: '%', default: 0 },
        { value: 'em', label: 'em', default: 0 },
    ];

    const title_devices = [
        {
            name: 'title_desktop',
            value: 'desktop',
            label: 'title_desktop',
            icon: 'desktop',
        },
        {
            name: 'title_tablet',
            value: 'tablet',
            label: 'title_tablet',
            icon: 'tablet',
        },
        {
            name: 'title_mobile',
            value: 'mobile',
            label: 'title_mobile',
            icon: 'mobile',
        }
    ]
    const desc_devices = [
        {
            name: 'desc_desktop',
            value: 'desktop',
            label: 'desc_desktop',
            icon: 'desktop',
        },
        {
            name: 'desc_tablet',
            value: 'tablet',
            label: 'desc_tablet',
            icon: 'tablet',
        },
        {
            name: 'desc_mobile',
            value: 'mobile',
            label: 'desc_mobile',
            icon: 'mobile',
        }
    ]

    let imageSizeType = notificationSetting?.imageSizeType || 'default'

    const imageSize = [
        {
            label: __('Default', 'pop-and-convert'),
            value: 'default',
            ref: useRef(),
        },
        {
            label: __('Full', 'pop-and-convert'),
            value: 'full',
            ref: useRef(),
        }
    ]

    function handleImageSize(e) {
        handleChange('imageSizeType')(e)
    }

    function handleTitleChange(e) {
        setResTitle(e.target.value)
    }
    function handleDescChange(e) {
        setResDesc(e.target.value)
    }

    return (
        <div className="space-y-6">
            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Container Style', 'pop-and-convert')}</h2>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Box Border Radius', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose Border Radius Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="unit-control">
                        <UnitControl onChange={(value) => handleChange('box_border_rad')(value)} value={notificationSetting?.box_border_rad || ''} units={units} placeholder={__("Border size", 'pop-and-convert')} />
                    </div>
                </div>
            </div>

            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Content Style', 'pop-and-convert')}</h2>

                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Title Font Size', 'pop-and-convert')}</p>
                        <Tooltip content={__('Enter Title Font Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                        <ResponsiveControl
                            devices={title_devices}
                            name='res_title'
                            callback={handleTitleChange}
                        />
                    </div>
                    <div className="unit-control">
                        {

                            resTitle === 'desktop'
                                ? <UnitControl onChange={(value) => handleChange('desk_title_size')(value)} value={notificationSetting?.desk_title_size || ''} units={units} placeholder={__("Desktop Font size", 'pop-and-convert')} />
                                : resTitle === 'tablet'
                                    ? <UnitControl onChange={(value) => handleChange('tab_title_size')(value)} value={notificationSetting?.tab_title_size || ''} units={units} placeholder={__("Tablet Font size", 'pop-and-convert')} />
                                    : resTitle === 'mobile'
                                        ? <UnitControl onChange={(value) => handleChange('mob_title_size')(value)} value={notificationSetting?.mob_title_size || ''} units={units} placeholder={__("Mobile Font size", 'pop-and-convert')} />
                                        : null
                        }
                    </div>
                </div>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Description Font Size', 'pop-and-convert')} </p>
                        <Tooltip content={__('Enter Description Font Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                        <ResponsiveControl
                            devices={desc_devices}
                            name='res_desc'
                            callback={handleDescChange}
                        />
                    </div>

                    <div className="unit-control">
                        {
                            resDesc === 'desktop'
                                ? <UnitControl onChange={(value) => handleChange('desk_desc_size')(value)} value={notificationSetting?.desk_desc_size || ''} units={units} placeholder={__("Desktop Font size", 'pop-and-convert')} />
                                : resDesc === 'tablet'
                                    ? <UnitControl onChange={(value) => handleChange('tab_desc_size')(value)} value={notificationSetting?.tab_desc_size || ''} units={units} placeholder={__("Tablet Font size", 'pop-and-convert')} />
                                    : resDesc === 'mobile'
                                        ? <UnitControl onChange={(value) => handleChange('mob_desc_size')(value)} value={notificationSetting?.mob_desc_size || ''} units={units} placeholder={__("Mobile Font size", 'pop-and-convert')} />
                                        : null

                        }
                    </div>
                </div>
            </div>
            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Button Style', 'pop-and-convert')}</h2>

                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Button Background Color', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose Button Background Color', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>

                    </div>

                    <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 flex items-center gap-3">
                            <Color defaultColor='#253b80' color={notificationSetting?.btn_bg_color} callback={(value) => handleChange('btn_bg_color')(value)} />
                        </div>
                    </div>
                </div>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Button Text Color', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose Button Text Color', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 flex items-center gap-3">
                            <Color defaultColor='#ffffff' color={notificationSetting?.btn_text_color} callback={(value) => handleChange('btn_text_color')(value)} />
                        </div>
                    </div>
                </div>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Button Border Radius', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose Border Radius Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="unit-control">
                        <UnitControl onChange={(value) => handleChange('btn_border_rad')(value)} value={notificationSetting?.btn_border_rad || ''} units={units} placeholder={__("Border size", 'pop-and-convert')} />
                    </div>
                </div>
            </div>
            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Image Style', 'pop-and-convert')}</h2>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Image Size', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose the size of the image.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="unit-control">
                        <SegmentedControl
                            name="type"
                            callback={handleImageSize}
                            defaultIndex={imageSize.findIndex(size => size.value === imageSizeType)}
                            controlRef={imageSizeControlRef}
                            segments={imageSize}
                        />
                    </div>
                </div>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Image Border Radius', 'pop-and-convert')}</p>
                        <Tooltip content={__('Choose Border Radius Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="unit-control">
                        <UnitControl onChange={(value) => handleChange('img_border_rad')(value)} value={notificationSetting?.img_border_rad || ''} units={units} placeholder={__("Border size", 'pop-and-convert')} />
                    </div>
                </div>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Image Width', 'pop-and-convert')}</p>
                        <Tooltip content={__('Input Image Width and Height Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="unit-control">
                        <UnitControl onChange={(value) => handleChange('img_width')(value)} value={notificationSetting?.img_width || ''} units={units} placeholder={__('Width', 'pop-and-convert')} />
                    </div>
                </div>
                <div className="device flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Image Height', 'pop-and-convert')}</p>
                        <Tooltip content={__('Input Image Width and Height Size', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="unit-control">
                        <UnitControl onChange={(value) => handleChange('img_height')(value)} value={notificationSetting?.img_height || ''} units={units} placeholder={__('Height', 'pop-and-convert')} />
                    </div>
                </div>

                <SaveButton saveAction={handleSave} />
            </div>
        </div>
    )
}

export default Design