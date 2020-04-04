import * as React from "react";
import * as Styles from "../slider-item.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Routine } from "Store/types";

type OwnProps = RouteComponentProps & {
  item: Routine;
};

const RoutineSliderItem: React.FC<OwnProps> = ({ item }) => {
  return (
    <div className={Styles.container}>
      <div>{item.title}</div>
    </div>
  );
};

export default withRouter(RoutineSliderItem);
