import { classNames } from "utils/classNames";
import cls from "./Chips.module.scss";

interface ChipsProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    className?: string;
}

const Chips = (props: ChipsProps) => {
    const { label, selected, onClick, className } = props;
    return (
        <div
            className={classNames(cls.Chip, { [cls.selected]: selected }, [className])}
            onClick={onClick}
        >
            {label}
        </div>
    );
};

export default Chips;
