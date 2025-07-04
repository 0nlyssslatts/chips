import { classNames } from "utils/classNames";
import cls from "./Chips.module.scss";

interface ChipsProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    className?: string;
    width?: number;
}

const Chips = (props: ChipsProps) => {
    const { label, selected, onClick, className, width = 100 } = props;
    const style = { width: `${width}px` };
    return (
        <div
            className={classNames(cls.Chip, { [cls.selected]: selected }, [className])}
            onClick={onClick}
            style={style}
            title={label}
        >
            {label}
        </div>
    );
};

export default Chips;
