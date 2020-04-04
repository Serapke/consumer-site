import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "Store/index";
import { RouteComponentProps } from "react-router-dom";
import { Workout } from "Store/types";
import { fetchWorkoutRequest, updateTaskRequest } from "Store/active-item/thunks";
import { showModalRequest, hideModalRequest } from "Store/modal/thunks";
import TaskList from "Components/task-list";

interface RouteParams {
  id: string;
}

interface PropsFromState {
  workout: Workout;
  modalResult: number;
}

interface PropsFromDispatch {
  fetchWorkout: typeof fetchWorkoutRequest;
  showModal: typeof showModalRequest;
  hideModal: typeof hideModalRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

const WorkoutPage: React.FunctionComponent<AllProps> = ({
  workout,
  modalResult,
  match,
  fetchWorkout,
  showModal,
  hideModal
}) => {
  React.useEffect(() => {
    fetchWorkout(match.params.id);
  }, [match.params.id]);

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <h2>{workout.title}</h2>
      <TaskList tasks={workout.tasks} modalResult={modalResult} showModal={showModal} hideModal={hideModal} />
    </div>
  );
};

const mapStateToProps = ({ activeItem, modal }: ApplicationState, _props: AllProps) => ({
  workout: activeItem.workout,
  modalResult: modal.result
});

const mapDispatchToProps = {
  fetchWorkout: fetchWorkoutRequest,
  showModal: showModalRequest,
  hideModal: hideModalRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);
