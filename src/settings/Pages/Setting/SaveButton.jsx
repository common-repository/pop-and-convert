import { __ } from "@wordpress/i18n";

export default function SaveButton({ saveAction }) {
    return <div className="border-t border-border-color pt-5">
        <a href="#" onClick={saveAction} className='btn-primary'>{__('Save Changes', 'pop-and-convert')}</a>
    </div>
}