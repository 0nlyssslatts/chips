import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import Chips from "components/Chips/Chips";
import { classNames } from "utils/classNames";
import cls from "./ChipsList.module.scss";

interface ChipListProps {
    chips: { id: string; label: string }[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    className?: string;
    popupClassName?: string;
    gridColumns?: number;
}

const ChipList = (props: ChipListProps) => {
    const { chips, selectedId, onSelect, className, popupClassName, gridColumns = 3 } = props;
    const [visibleCount, setVisibleCount] = useState(chips.length);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const ellipsisRef = useRef<HTMLDivElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(ellipsisRef.current, popperElement, {
        placement: "bottom-start",
    });

    const calculateVisibleCount = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        let totalWidth = 0;
        let count = 0;
        const ellipsisWidth = 32;

        chips.forEach((chip) => {
            const chipWidth = 200;
            if (totalWidth + chipWidth <= containerWidth - ellipsisWidth) {
                totalWidth += chipWidth;
                count++;
            }
        });

        setVisibleCount(count < chips.length ? count : chips.length);
    };

    useEffect(() => {
        calculateVisibleCount();
        window.addEventListener("resize", calculateVisibleCount);
        return () => window.removeEventListener("resize", calculateVisibleCount);
    }, [chips]);

    const visibleChips = chips.slice(0, visibleCount);
    const hiddenChips = chips.slice(visibleCount);

    return (
        <div ref={containerRef} className={classNames(cls.ChipsList, {}, [className])}>
            {visibleChips.map((chip) => (
                <Chips
                    key={chip.id}
                    label={chip.label}
                    selected={selectedId === chip.id}
                    onClick={() => onSelect(chip.id)}
                    width={200}
                />
            ))}
            {hiddenChips.length > 0 && (
                <div
                    ref={ellipsisRef}
                    className={cls.ellipsis}
                    onClick={() => setIsPopupOpen(true)}
                >
                    ...
                </div>
            )}
            {isPopupOpen && (
                <div
                    ref={setPopperElement}
                    className={classNames(cls.popup, {}, [popupClassName])}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div
                        className={cls.grid}
                        style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
                    >
                        {hiddenChips.map((chip) => (
                            <Chips
                                key={chip.id}
                                label={chip.label}
                                selected={selectedId === chip.id}
                                onClick={() => {
                                    onSelect(chip.id);
                                    setIsPopupOpen(false);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChipList;
