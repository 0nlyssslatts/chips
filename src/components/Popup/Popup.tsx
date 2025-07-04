import { useState, useRef, ReactNode } from "react";
import PopperJS from "@popperjs/core";
import { usePopper } from "react-popper";
import { classNames } from "utils/classNames";
import cls from "./Popup.module.scss";

interface PopupProps {
    gridColumns?: number;
    className?: string;
    children?: ReactNode;
    trigger: ReactNode;
    onClose?: () => void;
    placement?: PopperJS.Placement;
}

const Popup = (props: PopupProps) => {
    const { gridColumns = 2, className, trigger, children, placement = "bottom", onClose } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const referenceElement = useRef<HTMLDivElement>(null);
    const { styles, attributes } = usePopper(referenceElement.current, popperElement, {
        placement,
    });

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClosePopup = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <>
            <div ref={referenceElement} onClick={handleToggle}>
                {trigger}
            </div>
            {isOpen && (
                <div
                    ref={setPopperElement}
                    className={classNames(cls.Popup, {}, [className])}
                    onClick={handleClosePopup}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div
                        className={cls.grid}
                        style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
                    >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
