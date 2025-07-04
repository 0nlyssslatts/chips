import { classNames } from "utils/classNames";
import cls from "./ChipsWrapper.module.scss";
import Chips from "components/Chips/Chips";

interface ChipsListProps {
    className?: string;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export const ChipsList = ({ className }: ChipsListProps) => {
    return (
        <div className={classNames(cls.ChipsList, {}, [className])}>
            {arr.map((num) => {
                return (
                    <Chips key={num} label={`Чипс ${num}`} selected={false} onClick={() => {}} />
                );
            })}
        </div>
    );
};
