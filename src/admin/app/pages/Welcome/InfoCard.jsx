export default ({ title, children }) => {
    return <div className="flex p-8 gap-2 flex-col box-shadow bg-white">
        <h4 className="text-lg font-semibold">{title}</h4>
        {children}
    </div>
}
