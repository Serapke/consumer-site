import * as React from "react";
import { connect } from "react-redux";
import { showModalRequest } from "Store/modal/thunks";
import { TextField, makeStyles, createStyles, Theme, Button, InputAdornment, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import TaskList from "Components/task-list";
import { ApplicationState } from "Store/index";
import { Workout } from "Store/types";
import { saveWorkoutProgressRequest, updateTasksRequest } from "Store/active-item/thunks";
import { createWorkout } from "Services/workout";

interface PropsFromState {
  workout: Workout;
}

interface PropsFromDispatch {
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
  saveWorkoutProgress: typeof saveWorkoutProgressRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch & RouteComponentProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: `calc(100vh - ${theme.spacing(14)}px  - ${theme.mixins.toolbar.minHeight}px)`,
    },
    grid: {
      height: "100%",
    },
    button: {
      margin: theme.spacing(2, 0),
      width: "100%",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
    },
    label: {
      margin: theme.spacing(1),
    },
  })
);

interface FieldState {
  value: any;
  errorMessage: string;
}

interface WorkoutState {
  title: FieldState;
  restPeriodInSeconds: FieldState;
  tasks: FieldState;
}

const emptyState: WorkoutState = {
  title: { value: "", errorMessage: null },
  restPeriodInSeconds: { value: "", errorMessage: null },
  tasks: { value: [], errorMessage: null },
};

const stateFromWorkout = (workout: Workout): WorkoutState => {
  const state =
    workout && !workout.id
      ? {
          title: { value: workout.title, errorMessage: null },
          restPeriodInSeconds: { value: workout.restPeriodInSeconds, errorMessage: null },
          tasks: { value: workout.tasks, errorMessage: null },
        }
      : emptyState;
  return state;
};

const stateToWorkout = (state: WorkoutState): Workout => ({
  id: null,
  title: state.title.value,
  restPeriodInSeconds: state.restPeriodInSeconds.value,
  tasks: state.tasks.value,
});

const removeTaskIDs = ({ id, title, restPeriodInSeconds, tasks }: Workout): Workout => ({
  id,
  title,
  restPeriodInSeconds,
  tasks: tasks.map((task) => ({ ...task, id: null })),
});

const WorkoutCreatePage = ({ workout, history, showModal, updateTasks, saveWorkoutProgress }: OwnProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState<WorkoutState>(stateFromWorkout(workout));

  React.useEffect(() => setState(stateFromWorkout(workout)), [workout]);

  const changeStateField = (field: keyof WorkoutState, value: { value?: any; errorMessage: string }) => {
    setState((prevState) => ({ ...prevState, [field]: { ...prevState[field], ...value } }));
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeStateField(event.target.id as keyof WorkoutState, {
      value: event.target.value,
      errorMessage: "",
    });
  };

  const onAddClick = () => {
    saveWorkoutProgress(stateToWorkout(state));
  };

  const onSaveClick = () => {
    const workout = stateToWorkout(state);
    createWorkout(removeTaskIDs(workout)).then((res) => {
      if (res.errors) {
        console.log(res.errors);
      } else {
        history.goBack();
      }
    });
  };

  return (
    <div className={classes.container}>
      <TextField
        id="title"
        name="title"
        label="Title"
        color="secondary"
        value={state.title.value}
        onChange={onTextFieldChange}
        fullWidth
      />
      <Button
        className={classes.button}
        size="large"
        color="secondary"
        variant="contained"
        component={Link}
        to="/exercise/select"
        onClick={onAddClick}
      >
        <Add fontSize="large" />
      </Button>
      <Grid className={classes.grid} direction="column" justify="space-between" container>
        <TaskList tasks={state.tasks.value} showModal={showModal} updateTasks={updateTasks} />
        <TextField
          id="restPeriodInSeconds"
          name="restPeriodInSeconds"
          label="Rest between sets"
          color="secondary"
          type="number"
          value={state.restPeriodInSeconds.value}
          InputProps={{ endAdornment: <InputAdornment position="end">Sec</InputAdornment> }}
          onChange={onTextFieldChange}
          fullWidth
        />
      </Grid>
      <Button className={classes.fab} color="secondary" variant="contained" onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
};

const mapStateToProps = ({ activeItem }: ApplicationState) => ({
  workout: activeItem.workout,
});

const mapDispatchToProps = {
  showModal: showModalRequest,
  updateTasks: updateTasksRequest,
  saveWorkoutProgress: saveWorkoutProgressRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCreatePage);
