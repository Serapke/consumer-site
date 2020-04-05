import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "Store/index";
import { RouteComponentProps } from "react-router-dom";
import { Workout } from "Store/types";
import { fetchWorkoutRequest, updateTasksRequest } from "Store/active-item/thunks";
import { showModalRequest } from "Store/modal/thunks";
import TaskList from "Components/task-list";
import Button from "Components/button";

import * as Styles from "./workout-page.scss";

interface RouteParams {
  id: string;
}

interface PropsFromState {
  workout: Workout;
}

interface PropsFromDispatch {
  fetchWorkout: typeof fetchWorkoutRequest;
  updateTasks: typeof updateTasksRequest;
  showModal: typeof showModalRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

const WorkoutPage: React.FunctionComponent<AllProps> = ({ workout, match, fetchWorkout, showModal, updateTasks }) => {
  React.useEffect(() => {
    fetchWorkout(match.params.id);
  }, [match.params.id]);

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <h2 className={Styles.title}>{workout.title}</h2>
      <div className={Styles.addTaskButton}>
        <Button type="button" style="secondary">
          + Add
        </Button>
      </div>
      <TaskList tasks={workout.tasks} showModal={showModal} updateTasks={updateTasks} />
    </div>
  );
};

const mapStateToProps = ({ activeItem }: ApplicationState, _props: AllProps) => ({
  workout: activeItem.workout
});

const mapDispatchToProps = {
  fetchWorkout: fetchWorkoutRequest,
  updateTasks: updateTasksRequest,
  showModal: showModalRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);
