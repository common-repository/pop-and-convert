import { cn } from "../../lib/utils";

export default ({className, ...props}) => {
    return (
        <div 
            className={cn("animate-pulse rounded-md bg-gray-300", className)}
            {...props}
        ></div>
    )
}