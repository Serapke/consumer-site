import * as React from "react";

import * as Styles from "./circle-item.scss";

type Style = "primary" | "secondary";

interface Props {
  onClick?: () => void;
  style: Style;
  children: React.ReactNode;
}

const CircleItem = ({ onClick, style, children }: Props) => {
  return (
    <div className={`${Styles.container} ${Styles[style]}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default CircleItem;
