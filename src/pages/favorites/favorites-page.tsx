import RoutineSlider from "Components/slider";
import { ItemType } from "Components/slider/slider-section";
import * as React from "react";
import { connect } from "react-redux";
import { fetchRoutinesRequest, fetchWorkoutsRequest } from "Store/content/thunks";
import { ApplicationState } from "Store/index";
import { Routine, Workout } from "Store/types";

interface PropsFromState {
  routines: Routine[];
  workouts: Workout[];
}

interface PropsFromDispatch {
  fetchRoutines: typeof fetchRoutinesRequest;
  fetchWorkouts: typeof fetchWorkoutsRequest;
}

interface OwnProps {}

type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

const FavoritesPage: React.FunctionComponent<AllProps> = (props) => {
  React.useEffect(() => {
    props.fetchRoutines();
    props.fetchWorkouts();
  }, []);
  return (
    <div>
      <RoutineSlider
        title="Plans"
        addHref="/plan/create"
        addTitle="+ NEW PLAN"
        items={props.routines}
        type={ItemType.ROUTINE}
      />
      <RoutineSlider
        title="Workouts"
        addHref="/workout/create"
        addTitle="+ NEW WORKOUT"
        items={props.workouts}
        type={ItemType.WORKOUT}
      />
    </div>
  );
};

const mapStateToProps = ({ content }: ApplicationState) => ({
  routines: content.routines,
  workouts: content.workouts,
});

const mapDispatchToProps = {
  fetchRoutines: fetchRoutinesRequest,
  fetchWorkouts: fetchWorkoutsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
