import React, { useState, useEffect, useRef } from 'react';
import { ColorPicker } from '@wordpress/components';

export default ({color:_color, callback, defaultColor}) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    function handleColorChange(value) {
        callback(value)
    }

    const handleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    return (
        <div className="colorpicker-wrapper" ref={colorPickerRef}>
            <button type='button' className="colorpicker" onClick={handleColorPicker}>
                <span style={{ backgroundColor: _color || defaultColor }}></span>
            </button>
            {showColorPicker && (
                <ColorPicker
                    color={_color || defaultColor}
                    onChange={(value) => handleColorChange(value)}
                    enableAlpha
                    defaultValue="#000"
                />
            )}
        </div>
    );
};
