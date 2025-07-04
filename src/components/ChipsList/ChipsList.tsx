import { useState, useEffect, useRef } from "react";
import Chips from "components/Chips/Chips";
import { classNames } from "utils/classNames";
import cls from "./ChipsList.module.scss";
import Popup from "components/Popup/Popup";
import { Button } from "components/Button/Button";

export type ChipsType = {
    id: string;
    label: string;
};

interface ChipListProps {
    chips: ChipsType[];
    chipsWidth?: number;
    className?: string;
}

const ChipList = (props: ChipListProps) => {
    const { chips, chipsWidth = 100, className } = props;
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(chips.length);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateVisibleCount = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const ellipsisWidth = 32;
        const count = (containerWidth - ellipsisWidth) / chipsWidth;

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
                    onClick={() => setSelectedId(chip.id)}
                    width={chipsWidth}
                />
            ))}
            {hiddenChips.length > 0 && (
                <Popup
                    trigger={<Button className={cls.popupButton}>...</Button>}
                    placement="bottom-start"
                >
                    {hiddenChips.map((chip) => (
                        <Chips
                            key={chip.id}
                            label={chip.label}
                            selected={selectedId === chip.id}
                            onClick={() => setSelectedId(chip.id)}
                        />
                    ))}
                </Popup>
            )}
        </div>
    );
};

export default ChipList;
