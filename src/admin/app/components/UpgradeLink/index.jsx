import { cn } from "../../lib/utils";
import { __ } from "@wordpress/i18n";
import { Icon } from '..';

export default ({ imageSrc, className, link, message }) => {
    return (
        <div className={cn(`flex items-end p-4 justify-center relative w-full min-h-[292px] after:absolute after:w-full after:h-full after:bg-white after:opacity-80 after:top-0 after:z-[1]`, className)}>
            <img src={imageSrc} alt="" className="absolute left-0 top-0 block max-w-full w-full h-full" />
            <div className="z-[2] p-4 relative mx-auto flex space-x-4 rounded bg-[#fff5eb] box-shadow text-center items-center border border-[#E3B98E]">
                <Icon icon="warning" />
                <p className="text-base">{message}</p>
                <a className="text-sm font-semibold whitespace-nowrap text-primary-color inline-flex items-center gap-2 hover:text-primary-color group transition ease-in duration-200 underline-offset-2 hover:underline" href={link} target="_blank">{__('Upgrade Now', 'pop-and-convert')}
                    <Icon icon="arrow" />
                </a>
            </div>
        </div>
    )
}