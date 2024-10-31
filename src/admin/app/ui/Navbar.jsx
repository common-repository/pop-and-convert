import { __ } from "@wordpress/i18n";
import { Link as RouterLink } from 'react-router-dom';
import { Icon, Tooltip } from '../components';
import logo from './../assets/logo.svg';


const navLinks = [
    { url: 'https://popandconvert.com', icon: 'globe', tooltip: __('Visit Website', 'pop-and-convert') },
    { url: 'https://popandconvert.com/support/', icon: 'headphone', tooltip: __('Contact Support', 'pop-and-convert') },
    { url: 'https://popandconvert.com/docs/', icon: 'note', tooltip: __('Documentation', 'pop-and-convert') },
]

const Navbar = ({pointer}) => {

    return <nav className="py-6 shadow-md bg-white">
        <div className="container flex justify-between items-center pl-7 pr-6 2xl:pl-0 2xl:pr-0">
            <RouterLink to="/" className={`${pointer === 'none' ? 'pointer-events-none' : ''}`}>
                <img src={logo} />
            </RouterLink>
            <ul className='flex gap-3 items-center '>
                {
                    navLinks.map(({ url, icon, tooltip }, index) => (
                        <li
                            key={index}
                            className=''>
                            <Tooltip content={tooltip} direction="center">
                                <a href={url} className='p-3 border border-primary-accent inline-block rounded-full duration-200 hover:bg-primary-accent hover:text-primary-color hover:border-primary-color' target="_blank">
                                    <Icon icon={icon} key={index} />
                                </a>
                            </Tooltip>
                        </li>
                    )
                    )
                }
            </ul>
        </div>
    </nav>
}

export default Navbar;
