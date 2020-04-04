import * as React from "react";
import * as Styles from "../slider-item.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Workout } from "Store/types";

type OwnProps = RouteComponentProps & {
  item: Workout;
};

const WorkoutSliderItem: React.FC<OwnProps> = ({ item, history }) => {
  const handleOnClick = () => {
    history.push(`/workout/${item.id}`);
  };
  return (
    <div className={Styles.container} onClick={handleOnClick}>
      {item.title}
    </div>
  );
};

export default withRouter(WorkoutSliderItem);
