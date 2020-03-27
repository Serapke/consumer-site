import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as H from "history";

import * as Styles from "./link-button.scss";

type ButtonStyle = "primary" | "secondary";

type Props = RouteComponentProps & {
  history: H.History;
  link: string;
  style: ButtonStyle;
  children: React.ReactNode;
};

const LinkButton = ({ history, link, style, children }: Props) => {
  const handleOnClick = () => {
    history.push(link);
  };

  return (
    <button
      type="submit"
      onClick={handleOnClick}
      className={`${Styles.button} ${Styles[style]}`}
    >
      {children}
    </button>
  );
};

export default withRouter(LinkButton);
