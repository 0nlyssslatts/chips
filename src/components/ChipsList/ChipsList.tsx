import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import Chips from "components/Chips/Chips";
import { classNames } from "utils/classNames";
import cls from "./ChipsList.module.scss";
import Popup from "components/Popup/Popup";
import { Button } from "components/Button/Button";

interface ChipListProps {
    chips: { id: string; label: string }[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    chipsWidth?: number;
    className?: string;
}

const ChipList = (props: ChipListProps) => {
    const { chips, selectedId, onSelect, chipsWidth = 100, className } = props;
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
            if (totalWidth + chipsWidth <= containerWidth - ellipsisWidth) {
                totalWidth += chipsWidth;
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
                    width={chipsWidth}
                />
            ))}
            <Popup
                trigger={<Button className={cls.popupButton}>...</Button>}
                onClose={() => setIsPopupOpen(false)}
            >
                {hiddenChips.map((chip) => (
                    <Chips
                        key={chip.id}
                        label={chip.label}
                        selected={selectedId === chip.id}
                        onClick={() => onSelect(chip.id)}
                    />
                ))}
            </Popup>
        </div>
    );
};

export default ChipList;
