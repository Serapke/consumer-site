import * as React from "react";

import * as Styles from "./button.scss";

type ButtonStyle = "primary" | "secondary";
type ButtonType = "button" | "submit" | "reset";

interface Props {
  onClick?: () => void;
  type: ButtonType;
  style: ButtonStyle;
  children: React.ReactNode;
}

const Button = ({ type, style, onClick, children }: Props) => {
  return (
    <button
      type={type}
      className={`${Styles.button} ${Styles[style]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
