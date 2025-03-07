export default ({className, href, children}) => {
    return  (
        <a href={href} className={`${className}`}>
            {children}
        </a>
    )
}