import { __ } from '@wordpress/i18n';
import { Icon } from '..';

export default function ConfirmDialog({ callback, close, notification }) {

    function handleClick() {
        notification ? callback(notification) : callback()
    }
    return (
        <>
            <div className="flex justify-center items-center flex-col p-8">
                <Icon icon="error" />
                <h2 className="text-2xl font-semibold mt-5">{__('Delete this file', 'pop-and-convert')}</h2>
                <p className="text-center mt-2 text-sm">{__('Are you sure you want to delete this file? This action cannot be undone.', 'pop-and-convert')}</p>
                <div className="flex gap-4 mt-6">
                    <button className="py-[15px] px-[30px] border border-[#748494] rounded-lg text-[#748494] text-base font-semibold transition-colors hover:bg-[#748494] hover:text-white" onClick={() => close()}>{__('No, Cancel', 'pop-and-convert')}</button>
                    <button className="py-[15px] px-[30px] border border-[#D92D20] rounded-lg text-[#D92D20] text-base font-semibold transition-colors hover:bg-[#D92D20] hover:text-white" onClick={() => handleClick()}>{__('Yes, Delete', 'pop-and-convert')}</button>
                </div>
            </div>
        </>
    );
}