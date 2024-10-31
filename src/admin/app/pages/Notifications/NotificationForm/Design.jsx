import { useState, useContext, useRef } from "react"
import { FormContext } from "."
import { Toggle, Color, Tooltip, Icon, ResponsiveControl, SegmentedControl } from "../../../components"
import { __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { __ } from "@wordpress/i18n";

function Design() {
    const { state: formData, setState: setFormData } = useContext(FormContext)

    const [isChecked, setIsChecked] = useState(formData?.enable_custom_styling || false)

    const [resTitle, setResTitle] = useState('desktop')

    const [resDesc, setResDesc] = useState('desktop')

    const imageSizeControlRef = useRef();

    let imageSizeType = formData?.imageSizeType || 'default'

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

    function handleImageSize(e) {
        setFormData('imageSizeType')(e)
    }

    function handleTitleChange(e) {
        setResTitle(e.target.value)
    }
    function handleDescChange(e) {
        setResDesc(e.target.value)
    }

    return (
        <>
            <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow mb-6">
                <div className="flex gap-9">
                    <div className="label">
                        <p className='title'>{__('Enable Custom Styling', 'pop-and-convert')}</p>
                        <Tooltip content={__('Enable this option to override the Global customization settings.', 'pop-and-convert')} direction="left">
                            <Icon icon={'help'} />
                        </Tooltip>
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-9">
                            <Toggle
                                type="checkbox"
                                checked={formData?.enable_custom_styling || isChecked}
                                value={formData?.enable_custom_styling || ''}
                                onChange={(e) => {
                                    setIsChecked(!isChecked)
                                    setFormData('enable_custom_styling')(e)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                isChecked &&
                <div className="space-y-6">
                    <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                        <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Container Style', 'pop-and-convert')}</h2>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Container Width', 'pop-and-convert')}</p>
                                <Tooltip content={__('Set the width for your notification. Leave it unset to inherit the default width.', 'pop-and-convert')} direction="left">
                                    <Icon icon={'help'} />
                                </Tooltip>
                            </div>
                            <div className="unit-control">
                                <UnitControl onChange={(value) => setFormData('box_width')(value)} value={formData?.box_width || ''} units={units} placeholder={__("Container width", 'pop-and-convert')} />
                            </div>
                        </div>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Box Border Radius', 'pop-and-convert')}</p>
                                <Tooltip content={__('Set the border radius for your notification.', 'pop-and-convert')} direction="left">
                                    <Icon icon={'help'} />
                                </Tooltip>
                            </div>
                            <div className="unit-control">
                                <UnitControl onChange={(value) => setFormData('box_border_rad')(value)} value={formData?.box_border_rad || ''} units={units} placeholder={__('Border size', 'pop-and-convert')} />
                            </div>
                        </div>
                    </div>

                    <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                        <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Content Style', 'pop-and-convert')}</h2>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Title Font Size', 'pop-and-convert')} </p>
                                <ResponsiveControl
                                    devices={title_devices}
                                    name='res_title'
                                    callback={handleTitleChange}
                                />
                            </div>
                            <div className="unit-control">
                                {

                                    resTitle === 'desktop'
                                        ? <UnitControl onChange={(value) => setFormData('desk_title_size')(value)} value={formData?.desk_title_size || ''} units={units} placeholder={__("Desktop Font size", 'pop-and-convert')} />
                                        : resTitle === 'tablet'
                                            ? <UnitControl onChange={(value) => setFormData('tab_title_size')(value)} value={formData?.tab_title_size || ''} units={units} placeholder={__("Tablet Font size", 'pop-and-convert')} />
                                            : resTitle === 'mobile'
                                                ? <UnitControl onChange={(value) => setFormData('mob_title_size')(value)} value={formData?.mob_title_size || ''} units={units} placeholder={__("Mobile Font size", 'pop-and-convert')} />
                                                : null
                                }
                            </div>
                        </div>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Description Font Size', 'pop-and-convert')}</p>
                                <ResponsiveControl
                                    devices={desc_devices}
                                    name='res_desc'
                                    callback={handleDescChange}
                                />
                            </div>

                            <div className="unit-control">
                                {
                                    resDesc === 'desktop'
                                        ? <UnitControl onChange={(value) => setFormData('desk_desc_size')(value)} value={formData?.desk_desc_size || ''} units={units} placeholder={__("Desktop Font size", 'pop-and-convert')} />
                                        : resDesc === 'tablet'
                                            ? <UnitControl onChange={(value) => setFormData('tab_desc_size')(value)} value={formData?.tab_desc_size || ''} units={units} placeholder={__("Tablet Font size", 'pop-and-convert')} />
                                            : resDesc === 'mobile'
                                                ? <UnitControl onChange={(value) => setFormData('mob_desc_size')(value)} value={formData?.mob_desc_size || ''} units={units} placeholder={__("Mobile Font size", 'pop-and-convert')} />
                                                : null

                                }
                            </div>
                        </div>
                    </div>
                    <div className="p-5 rounded gap-8 flex flex-col bg-white box-shadow">
                        <h2 className="pb-2 border-b border-border-color font-semibold text-lg">{__('Button Style', 'pop-and-convert')}</h2>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__("Button Background Color", 'pop-and-convert')}</p>
                            </div>
                            <div className="flex-1 flex items-center gap-3">
                                <div className="flex-1 flex items-center gap-3">
                                    <Color defaultColor='#253b80' color={formData?.btn_bg_color} callback={(value) => setFormData('btn_bg_color')(value)} />
                                </div>
                            </div>
                        </div>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Button Text Color', 'pop-and-convert')} </p>
                            </div>
                            <div className="flex-1 flex items-center gap-3">
                                <div className="flex-1 flex items-center gap-3">
                                    <Color defaultColor='#ffffff' color={formData?.btn_text_color} callback={(value) => setFormData('btn_text_color')(value)} />
                                </div>
                            </div>
                        </div>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Button Border Radius', 'pop-and-convert')}</p>
                            </div>
                            <div className="unit-control">
                                <UnitControl onChange={(value) => setFormData('btn_border_rad')(value)} value={formData?.btn_border_rad || ''} units={units} placeholder={__('Border size', 'pop-and-convert')} />
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
                                    name="imageSize"
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
                                <Tooltip content={__('Set the border radius for your notification image. It works for only certain layouts.', 'pop-and-convert')} direction="left">
                                    <Icon icon={'help'} />
                                </Tooltip>
                            </div>
                            <div className="unit-control">
                                <UnitControl onChange={(value) => setFormData('img_border_rad')(value)} value={formData?.img_border_rad || ''} units={units} placeholder={__('Border size', 'pop-and-convert')} />
                            </div>
                        </div>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Image Width', 'pop-and-convert')}</p>
                                <Tooltip content={__('Override the default image width.', 'pop-and-convert')} direction="left">
                                    <Icon icon={'help'} />
                                </Tooltip>
                            </div>
                            <div className="unit-control">
                                <UnitControl onChange={(value) => setFormData('img_width')(value)} value={formData?.img_width || ''} units={units} placeholder={__('Width', 'pop-and-convert')} />
                            </div>
                        </div>
                        <div className="device flex gap-9">
                            <div className="label">
                                <p className='title'>{__('Image Height', 'pop-and-convert')}</p>
                                <Tooltip content={__('Override the default image height.', 'pop-and-convert')} direction="left">
                                    <Icon icon={'help'} />
                                </Tooltip>
                            </div>
                            <div className="unit-control">
                                <UnitControl onChange={(value) => setFormData('img_height')(value)} value={formData?.img_height || ''} units={units} placeholder={__('Height', 'pop-and-convert')} />
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Design