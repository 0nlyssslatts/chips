import { classNames } from "utils/classNames";
import cls from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const Button = (props: ButtonProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <button className={classNames(cls.Button, {}, [className])} {...otherProps}>
            {children}
        </button>
    );
};
