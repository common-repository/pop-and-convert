export default ({ className, ...pros }) => {
    const loading_before = 'before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-primary-color before:opacity-10';
    const loading_after = 'after:h-full after:w-full after:rounded after:-translate-x-[95%] after:bg-primary-color after:animate-wobble'
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-[45dvb] w-full bg-white">
            <div className={`flex items-center justify-center overflow-hidden relative rounded h-2 w-56 ${loading_before} ${loading_after}`}>
            </div>
        </div>
    )
}