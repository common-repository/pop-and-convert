import { useState } from 'react'
import { cn } from '../../lib/utils'

export default ({ className, ...props }) => {
    let timeout;
    const [active, setActive] = useState(false)

    let tooltip = 'absolute rounded left-[-25%] py-2 px-3 bg-font-color text-xs text-center z-50 shadow-sm top-[120%] w-max';
    let tooltipBefore = "content-[''] before:absolute before:h-0 before:w-0 before:pointer-events-none before:ml-[calc(6px*-1)] before:border-[6px] before:border-transparent before:bottom-full before:border-b-font-color";

    function showTip() {
        timeout = setTimeout(() => {
            setActive(true)
        }, props.delay || 300)
    }

    function hideTip() {
        clearInterval(timeout)
        timeout = setTimeout(() => {
            setActive(false)
        }, props.delay || 0)
    }

    return (
        <div
            className='relative inline-flex'
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {props.children}
            {active && (
                <div className={cn(`tooltip ${tooltip} ${tooltipBefore} ${props.direction}`, className)} >
                    <p className='text-white max-w-[220px] text-xs'>{props.content}</p>
                    {props.link && <a href={props.link} className='text-white underline hover:text-white mt-1 underline-offset-4 hover:underline-offset-6'>{props.linkText}</a>}
                </div>
            )}
        </div>
    )
}