import { classNames } from "utils/classNames";
import cls from "./Chips.module.scss";

interface ChipsProps {
    label: string;
    className?: string;
}

export const Chips = ({ label, className }: ChipsProps) => {
    return <div className={classNames(cls.Chips, {}, [className])}>{label}</div>;
};
