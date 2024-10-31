import { useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "../../lib/utils";

export default function Modal({ open, onClose, type, children, className, ...props }) {
    const modalRef = useRef(null);

    // classes to be applied to the dialog element
    const dialogClasses = useMemo(() => {
        return (
            `bg-white rounded-md shadow-md ${open ? 'animate-[show_250ms_cubic-bezier(0.4,0,0.2,1)_forwards]' : 'animate-[hide_250ms_cubic-bezier(0.4,0,0.2,1)_forwards]'}`
        )
    }, [open])

    // Eventlistener: trigger onclose when cancel detected
    const onCancel = useCallback(
        (e) => {
            e.preventDefault();
            onClose();
        },
        [onClose]
    );

    // close dialog on outside click
    if(type === 'dialog') closeOnOutside(modalRef)
    function closeOnOutside(ref) {
        useEffect(() => {
            function handleOutsideClick(e) {
                if(ref.current && !ref.current.contains(e.target) && e.target !== ref.current.parentNode.firstChild){
                    onClose()
                }
            }

            document.addEventListener('mousedown', handleOutsideClick)
            return () => {
                document.removeEventListener('mousedown', handleOutsideClick)
            }
            
        }, [modalRef])
    }

    // Eventlistener: trigger onclose when click outside
    const onClick = useCallback(
        ({ target }) => {
            const { current: el } = modalRef;
            if (target === el) onClose();
        },
        [onClose]
    );

    // Eventlistener: trigger close click on anim end
    const onAnimEnd = useCallback(() => {
        const { current: el } = modalRef;
        if (!open) el.close();
    }, [open]);

    // when open changes run open/close command
    useEffect(() => {
        const { current: el } = modalRef;
        if (open) {
            type === 'dialog' ? el.show() : type === 'modal' ? el.showModal() : null;
        }
    }, [open]);

    return (
        <dialog
            ref={modalRef}
            className={cn(dialogClasses, className)}
            onClose={onClose}
            onCancel={onCancel}
            onClick={onClick}
            onAnimationEnd={onAnimEnd}
        >
            {children}
        </dialog>
    );
}
