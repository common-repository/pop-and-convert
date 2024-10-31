import { useState } from 'react';
import { Dialog, Icon, Tooltip } from '..';

export default ({name, devices, callback, defaultIndex = 0,}) => {

    const [responsiveScreen, setResponsiveScreen] = useState('desktop')

    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    const onInputChange = (value, index, e) => {
        setActiveIndex(index);
        setResponsiveScreen(value)
        callback(e)
    }

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='relative'>
            <button type='button' className='flex items-center gap-2 justify-between border border-border-color rounded-sm p-1.5 w-[45px]' onClick={() => setIsOpen(true)}>
                    <Icon icon={responsiveScreen} />
                    <Icon icon="chevronDown" />
            </button>
            <Dialog onClose={() => setIsOpen(false)} open={isOpen} type="dialog" className='absolute m-0 z-10 max-w-[45px] p-0 w-full'>
            <div className="flex flex-col justify-center items-center py-2 gap-2">
                {devices.map((item, i) => (
                        <div
                            key={item.value}
                            className='relative'
                        >
                            <input
                                type="radio"
                                value={item.value}
                                id={item.label}
                                onChange={(e) => onInputChange(item.icon, i, e)}
                                checked={i === activeIndex}
                                name={name}
                                className='!hidden'
                
                            />
                            <label htmlFor={item.label}>
                            <Tooltip content={item.icon} direction="left">
                                <Icon icon={item.icon}/>
                            </Tooltip>
                            </label>
                        </div>
                    ))}
            </div>
            </Dialog>
        </div>
    )
}

