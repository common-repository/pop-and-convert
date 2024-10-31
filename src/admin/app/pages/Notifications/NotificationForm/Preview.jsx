import { useContext, useState } from 'react';
import { FormContext } from '.';
import { Icon } from '../../../components';
import { __ } from "@wordpress/i18n";

function Preview() {
    const { state: formData, setState: setFormData } = useContext(FormContext)

    const DOMPurify = require('dompurify')(window);

    let btnStyle = {
        backgroundColor: formData?.btn_bg_color || "#253b80",
        color: formData?.btn_text_color || "#ffffff",
        borderRadius: formData?.border_radius || "4px",
        borderColor: formData?.btn_bg_color || "#253b80",
    }

    let titleFont = {
        fontSize: formData?.desk_title_size || '16px'
    }

    let descFont = {
        fontSize: formData?.desk_desc_size || '16px'
    }


    let formDataType = formData?.type || 'sticky'
    let formStickyLayout = formData?.sticky_layout || 'sticky-layout-1'
    let formPopupLayout = formData?.popup_layout || 'popup-layout-1'

    // hide preview

    const [previewClose, setPreviewClose] = useState(false);
    const handleClose = () => {
        setPreviewClose(!previewClose)
    }

    return (
        <div className={`preview ${formDataType} ${formDataType === 'sticky' ? formStickyLayout : formDataType === 'popup' ? formPopupLayout : ''}`}>
            <div className="preview-wrapper">
                <div className="content-wrapper">
                    <div onClick={handleClose} className='preview-close' >
                        <Icon icon={"cross"} />
                    </div>
                    <div className="content">
                        <div className="image-wrapper">
                            {formData?.image_data[0].url !== "" ? <img className='preview-image' src={formData?.image_data[0].url} alt={__("preview", 'pop-and-convert')} /> : ''}
                        </div>
                        <div className="text-wrapper">
                            <div className={`text max-h-[250px]`}>
                                <h2 className="title font-bold mb-4" style={titleFont}>
                                    {formData?.leadTitle || __('Title', 'pop-and-convert')}
                                </h2>
                                <div className="description max-h-24 overflow-y-auto" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData?.description || __("description", 'pop-and-convert')) }} style={descFont} />
                            </div>
                            <div className="preview-button" >
                                <a className='btn-preview whitespace-nowrap' style={btnStyle} target="_blank" href={formData?.btn_link || '#'} onClick={e => e.preventDefault()} >{formData?.buttonTitle || __('Button', 'pop-and-convert')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview