import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Link, Prompt } from "react-router-dom";
import { Add } from "@material-ui/icons";
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";

import { ApplicationState } from "Store/index";
import { showModalRequest } from "Store/modal/thunks";
import TaskList from "Components/task-list";
import { ModalType } from "Components/modal/modal";
import {
  updateTasksRequest,
  updateWorkoutFormRequest,
  fetchWorkoutRequest,
  clearWorkoutFormRequest,
} from "Store/form/thunks";
import { WorkoutForm } from "Store/form/types";
import { formToWorkout } from "Store/form/utils";
import { updateWorkout } from "Services/workout";

interface RouteParams {
  id: string;
}

interface PropsFromState {
  form: WorkoutForm;
  id: number;
}

interface PropsFromDispatch {
  fetchWorkout: typeof fetchWorkoutRequest;
  updateTasks: typeof updateTasksRequest;
  showModal: typeof showModalRequest;
  updateForm: typeof updateWorkoutFormRequest;
  clearForm: typeof clearWorkoutFormRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: `calc(100vh - ${theme.spacing(14)}px  - ${theme.mixins.toolbar.minHeight}px)`,
    },
    title: {
      marginBottom: "10px",
    },
    grid: {
      height: "100%",
    },
    button: {
      margin: theme.spacing(2, 0),
      width: "100%",
    },
    cta: {
      position: "absolute",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
    },
  })
);

const WorkoutEditPage: React.FunctionComponent<AllProps> = ({
  id,
  form,
  location,
  history,
  match,
  fetchWorkout,
  showModal,
  updateTasks,
  updateForm,
  clearForm,
}) => {
  const classes = useStyles();
  React.useEffect(() => {
    console.log(id, parseInt(match.params.id));
    if (id !== parseInt(match.params.id)) {
      fetchWorkout(match.params.id);
    }
  }, [match.params.id]);

  if (form && form.tasks) {
    console.log(form);
  }

  if (!form) return <div>Loading...</div>;

  const onTitleClick = () => {
    showModal({ type: ModalType.WorkoutTitleEditingDialog });
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.id as keyof WorkoutForm;
    const state = { value: event.target.value, error: "" };
    updateForm({ name, state });
  };

  const onSaveClick = () => {
    const workout = formToWorkout(form, id);
    updateWorkout(workout).then((res) => {
      if (res.errors) {
        console.log(res.errors);
      } else {
        clearForm();
        history.push("/favorites");
      }
    });
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" onClick={onTitleClick}>
        {form.title.value}
      </Typography>
      <Button
        className={classes.button}
        size="large"
        color="secondary"
        variant="contained"
        component={Link}
        to={{ pathname: "/exercise/select", state: { from: location } }}
      >
        <Add fontSize="large" />
      </Button>
      <Grid className={classes.grid} direction="column" justify="space-between" container>
        <TaskList tasks={form.tasks.value} showModal={showModal} updateTasks={updateTasks} />
        <TextField
          id="restPeriodInSeconds"
          name="restPeriodInSeconds"
          label="Rest between sets"
          color="secondary"
          type="number"
          value={form.restPeriodInSeconds.value}
          InputProps={{ endAdornment: <InputAdornment position="end">Sec</InputAdornment> }}
          onChange={onTextFieldChange}
          fullWidth
        />
      </Grid>
      <Button className={classes.cta} color="secondary" variant="contained" onClick={onSaveClick}>
        Save
      </Button>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {
  fetchWorkout: fetchWorkoutRequest,
  updateTasks: updateTasksRequest,
  showModal: showModalRequest,
  updateForm: updateWorkoutFormRequest,
  clearForm: clearWorkoutFormRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutEditPage);
