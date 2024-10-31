import Icon from "../Icon"
export default ({children}) => {
    return (
        <div className="flex flex-col justify-center items-center bg-white m-auto h-screen">
            <div className="max-w-[640px] text-center flex flex-col justify-center items-center">
                <div className="mb-3">
                    <Icon icon="error" />
                </div>
                {children}
            </div>
        </div>
    )
}