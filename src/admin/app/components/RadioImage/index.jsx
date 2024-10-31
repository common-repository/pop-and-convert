import { useRef, useState, useEffect } from 'react';
import Icon from '../Icon';

export default ({ name, radioImages, callback, defaultIndex = 0, controlRef }) => {
    const componentReady = useRef();
    useEffect(() => {
        componentReady.current = true;
    }, []);

    const onInputChange = (e) => {
        callback(e)
    }

    return (
        <div className="radio-image-container" ref={controlRef}>
            <div className={`radio-image-controls ${componentReady.current ? 'ready' : 'idle'}`}>
                {radioImages.map((item, i) => (
                    <div
                        key={item.value}
                        className={`radio-image ${i === defaultIndex ? 'active' : 'inactive'}`}
                        ref={item.ref}
                    >
                        <input
                            type="radio"
                            value={item.value}
                            id={item.label}
                            name={name}
                            onChange={(e) => onInputChange(e)}
                            checked={i === defaultIndex}
                        />
                        <label htmlFor={item.label}>
                            <Icon icon={item.icon}/>
                            <span className='radio-label'>{item.label}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}