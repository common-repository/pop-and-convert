import { Link } from "react-router-dom"
import { __ } from "@wordpress/i18n";
import banner from './../../assets/banner.png';

export default () => {
    return (
        <div className="flex p-14 rounded box-shadow gap-16 bg-white flex-col lg:flex-row">
            <div className="flex flex-col flex-1 gap-8 items-start justify-center">
                <h3 className="font-semibold text-2xl">{__('Welcome to Pop and Convert', 'pop-and-convert')}</h3>
                <p className="text-base font-normal">{__("The Pop and Convert plugin is designed to enhance website engagement by offering customizable notifications. It allows users to craft dynamic alerts, tailor designs to their brand, set post/page-specific notifications, and utilize advanced display conditions.", 'pop-and-convert')}</p>
                <div className="flex gap-4">
                    <Link className="btn-primary" to="/notifications/create">{__('Create New Notification', 'pop-and-convert')}</Link>
                    <Link className="btn-secondary" to="/notifications">{__('Show All', 'pop-and-convert')}</Link>
                </div>
            </div>
            <div className="rounded flex-1 ">
                <img src={banner} alt="" className="mt-0 mr-0 mb-0 ml-auto" />
            </div>
        </div>
    )
}
