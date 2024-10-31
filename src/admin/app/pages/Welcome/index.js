import Introduction from './Introduction'
import InfoCard from './InfoCard'
import { Icon } from '../../components'
import { __ } from "@wordpress/i18n";


const Link = ({ className, href, children }) => {
    return <a href={href} className={`text-sm font-semibold text-primary-color inline-flex items-center transition-[gap] gap-2 ease-in duration-200 hover:gap-4 hover:text-primary-color ${className}`}>{children}</a>
}
const informations = [
    {
        title: __('Documentation', 'pop-and-convert'),
        content: __('Whether you\'re just starting out or looking to explore advanced features, our guides provide step-by-step instructions to ensure you make the most of our plugin.', 'pop-and-convert'),
        link: <Link href="https://popandconvert.com/docs/" >{__('Explore Documentation', 'pop-and-convert')} <Icon icon="arrow"/></Link>
    },
    {
        title: __('Support', 'pop-and-convert'),
        content: __('Reach out to our dedicated support team for guidance, solutions, and prompt assistance with any issues or queries related to the plugin.', 'pop-and-convert'),
        link: <Link href="https://popandconvert.com/support/">{__('Contact Support Team', 'pop-and-convert')}<Icon icon="arrow" /></Link>
    },
    {
        title: __('Video Tutorial', 'pop-and-convert'),
        content: __('Explore our video tutorials for step-by-step guidance on the plugin, covering basics to advanced features for optimal user experience.', 'pop-and-convert'),
        link: <Link href="#">{__('Coming Soon', 'pop-and-convert')}<Icon icon="arrow" /></Link>
    }
]

const Welcome = () => {

    return (
        <div className="container pl-7 pr-6 2xl:pl-0 2xl:pr-0">
            <div className="py-8 gap-8 flex flex-col">
                <Introduction />
                <div className='flex gap-10'>
                    {
                        informations.map(({ title, content, link }, index) => {
                            return <InfoCard key={index} title={title}>
                                <p className='text-sm leading-6' >{content}</p>
                                {link || null}
                            </InfoCard>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Welcome
