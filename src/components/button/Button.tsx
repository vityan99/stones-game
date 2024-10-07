import style from "./button.module.css";
import { FC } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

type ButtonType = {
  title: string;
  use: string;
  arrow?: string;
  size: string;
  clickHandler?: () => void;
  disabled?: boolean;
};

const Button: FC<ButtonType> = ({ title, use, arrow, size, clickHandler, disabled }): React.ReactNode => {
  const sizeModificator = size && size !== "small" ? style[`btn--${size}`] : "";

  return (
    <button
      className={`${style.btn} ${use ? style[`btn--${use}`] : ""}
        ${sizeModificator}`}
      onClick={clickHandler}
      disabled={disabled}
    >
      {arrow && arrow === "left" && <BiArrowToLeft />}
      {title}

      {arrow && arrow !== "left" && <BiArrowToRight />}
    </button>
  );
};

export default Button;
