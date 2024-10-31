import { useState } from 'react';

export default ({ label, ...props}) => {

    return (
        <label className='relative inline-block w-[36px] h-[20px]'>
            <input {...props} className={`opacity-0 w-0 h-0`}/>
            <span className={`absolute cursor-pointer inset-0 transition-all rounded-[12px] before:absolute before:h-[16px] before:w-[16px] before:left-[3px] before:shadow-[0px_4px_12px_0px_rgba(29,13,13,0.04)] before:bottom-[50%] before:translate-y-2/4 before:bg-white before:rounded-[50%] before:transition-all ${props.checked ? 'bg-primary-color' : 'bg-border-color'} ${props.checked && 'before:translate-x-[15px]'}`}></span>
            {label && <span>{label}</span>}
        </label>

    )
}
