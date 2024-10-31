import { useRef, useState, useEffect } from 'react'

export default({ name, segments, callback, defaultIndex = 0, controlRef }) => {

    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const componentReady = useRef();

    // Determine when the component is "ready"
    useEffect(() => {
        componentReady.current = true;
    }, []);

    useEffect(() => {
        const activeSegmentRef = segments[activeIndex].ref;
        const { offsetWidth, offsetLeft } = activeSegmentRef.current;
        const { style } = controlRef.current;

        style.setProperty("--highlight-width", `${offsetWidth}px`);
        style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
    }, [activeIndex, callback, controlRef, segments]);

    function onInputChange(value, index, e) {
        setActiveIndex(index);
        callback(e);
    }
    return (
        <div className="controls-container" ref={controlRef}>
            <div className={`controls ${componentReady.current ? "ready" : "idle"}`}>
                {segments.map((item, i) => (
                    <div
                        key={item.value}
                        className={`segment ${i === activeIndex ? 'active' : 'inactive'}`}
                        ref={item.ref}
                    >
                        <input
                            type="radio"
                            value={item.value}
                            id={item.label}
                            name={name}
                            onChange={(e) => onInputChange(item.value, i, e)}
                            checked={i === activeIndex}
                        />
                        <label htmlFor={item.label}>
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
