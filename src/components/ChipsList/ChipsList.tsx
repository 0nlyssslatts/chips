import { createContext, useContext, useState, useEffect, useRef } from "react";
import { classNames } from "utils/classNames";
import cls from "./ChipsList.module.scss";
import Popup from "components/Popup/Popup";
import { Button } from "components/Button/Button";
import Chips from "components/Chips/Chips";

type ChipsType = {
    id: string;
    label: string;
};

interface ChipListProps {
    chips: ChipsType[];
    chipsWidth?: number;
    popupButtonWidth?: number;
    className?: string;
    children?: React.ReactNode;
}

interface ChipListContextType extends ChipListProps {
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    visibleCount: number;
}

const ChipListContext = createContext<ChipListContextType | undefined>(undefined);
const useChipListContext = (): ChipListContextType => {
    return useContext(ChipListContext);
};

const ChipList = (props: ChipListProps) => {
    const { chips, chipsWidth = 100, popupButtonWidth = 40, className, children } = props;
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateVisibleCount = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const count = Math.floor((containerWidth - popupButtonWidth) / chipsWidth);
        visibleCount !== count && setVisibleCount(count);
    };

    useEffect(() => {
        calculateVisibleCount();

        window.addEventListener("resize", calculateVisibleCount);
        return () => window.removeEventListener("resize", calculateVisibleCount);
    }, [chips]);

    const contextValue: ChipListContextType = {
        chips,
        selectedId,
        setSelectedId,
        visibleCount,
        chipsWidth,
        popupButtonWidth,
    };

    return (
        <ChipListContext.Provider value={contextValue}>
            <div ref={containerRef} className={classNames(cls.ChipsList, {}, [className])}>
                {children}
            </div>
        </ChipListContext.Provider>
    );
};

const VisibleChips = () => {
    const { chips, selectedId, setSelectedId, visibleCount, chipsWidth } = useChipListContext();
    const visibleChips = chips.slice(0, visibleCount);

    return (
        <>
            {visibleChips.map((chip) => (
                <Chips
                    key={chip.id}
                    label={chip.label}
                    selected={selectedId === chip.id}
                    onClick={() => setSelectedId(chip.id)}
                    width={chipsWidth}
                />
            ))}
        </>
    );
};

const HiddenChipsPopup = () => {
    const { chips, selectedId, setSelectedId, visibleCount, popupButtonWidth } =
        useChipListContext();
    const hiddenChips = chips.slice(visibleCount);

    if (hiddenChips.length === 0) return null;

    return (
        <Popup
            trigger={
                <Button className={cls.popupButton} style={{ width: `${popupButtonWidth}px` }}>
                    ...
                </Button>
            }
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
    );
};

ChipList.VisibleChips = VisibleChips;
ChipList.HiddenChipsPopup = HiddenChipsPopup;

export { ChipList };
