import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '..';
import { __ } from '@wordpress/i18n';
import {cn} from '../../lib/utils'

export default ({ callback, optionLocations, options, showSearch, isObjectArray, className }) => {
    const [selectedOptions, setSelectedOptions] = useState(optionLocations);
    const [showOptions, setShowOptions] = useState(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    const [searchOptions, setSearchOptions] = useState('');
    const selectRef = useRef(null);

    // isObjectArray is true for array of objects such as post and pages data
    if (isObjectArray) options = options.map((a) => {
        return (
            a.title.concat(" ", a.type)
        )
    }).flat()

    useEffect(() => {
        callback(selectedOptions);
    }, [selectedOptions]);

    const toggleOptions = () => {
        if (!isDeleteClicked) {
            setShowOptions((prevShowOptions) => !prevShowOptions);
        }
        setIsDeleteClicked(false);
    };

    const handleOptionClick = (option) => {
        if (isObjectArray) option = option.slice(0, -5)
        setSelectedOptions((prevSelected) =>
            prevSelected.includes(option) ? prevSelected.filter((item) => item !== option) : [...prevSelected, option]
        );
    };

    const handleDeleteClick = (event, option) => {
        event.stopPropagation();
        setIsDeleteClicked(true);
        setSelectedOptions((prevSelected) => prevSelected.filter((item) => item !== option));
    };

    const isSelected = (option) => selectedOptions.includes(isObjectArray ? option.slice(0, -5) : option);

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const availableOptions = options.filter((option) => !isSelected(option));

    // Serach 
    const filteredOptions = availableOptions.filter((option) =>
        option.toLowerCase().includes(searchOptions.toLowerCase())
    );

    return (
        <div className="select-wrapper" ref={selectRef}>
            <div onClick={toggleOptions} className="box">
                {selectedOptions.length > 0 ? (
                    selectedOptions.map((option) => (
                        <div key={option} className="selected-option">
                            {option}
                            <button className="delete-button" type='button' onClick={(e) => handleDeleteClick(e, option)}>
                                <Icon icon="close" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Select options</p>
                )}
            </div>
            {showOptions && (
                <div className={cn(`options-container`, className)}>
                    {
                        showSearch &&
                        <input
                            type="text"
                            placeholder={__('Search', 'pop-and-convert')}
                            value={searchOptions}
                            onChange={(e) => setSearchOptions(e.target.value)}
                            className="search-input w-full !border-border-color"
                        />
                    }
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="option hover:bg-primary-accent-2 duration-300"
                        >
                            {isObjectArray ?
                                <div className='flex justify-between'>
                                    <span className='inline-block truncate max-w-md'>{option.slice(0, -5)}</span>
                                    <span className={`text-xs rounded-3xl px-2 py-1 text-heading-color capitalize ${option.slice(-4) === 'post' ? 'bg-[#ebe0ff]' : 'bg-[#b7f4ff]'}`}>
                                        {option.slice(-4)}
                                    </span>
                                </div>
                                : option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
