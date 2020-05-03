import * as React from "react";
import { connect } from "react-redux";
import { StaticContext } from "react-router";
import { showModalRequest } from "Store/modal/thunks";
import { TextField, makeStyles, createStyles, Theme, Button, InputAdornment, Grid, Snackbar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import TaskList from "Components/task-list";
import { ApplicationState } from "Store/index";
import { createWorkout } from "Services/workout";
import { WorkoutFormState, WorkoutForm } from "Store/form/types";
import { updateWorkoutFormRequest, updateTasksRequest, clearWorkoutFormRequest } from "Store/form/thunks";
import { formToWorkout } from "Store/form/utils";
import { Alert } from "@material-ui/lab";

interface LocationState {
  new: boolean;
}

interface PropsFromState {
  form: WorkoutForm;
}

interface PropsFromDispatch {
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
  updateForm: typeof updateWorkoutFormRequest;
  clearForm: typeof clearWorkoutFormRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{}, StaticContext, LocationState>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: `calc(100vh - ${theme.spacing(14)}px  - ${theme.mixins.toolbar.minHeight}px - 56px)`,
    },
    grid: {
      height: "100%",
    },
    tasks: {
      minHeight: `calc(100% - 48px - 48px - 51px)`,
      overflow: "scroll",
      width: "100%",
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
    label: {
      margin: theme.spacing(1),
    },
  })
);

const validate = (form: WorkoutForm) => {
  if (!form.tasks.value.length) {
    return false;
  }
  return true;
};

const WorkoutCreatePage = ({ form, location, history, showModal, updateTasks, updateForm, clearForm }: OwnProps) => {
  const classes = useStyles();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (location.state && location.state.new) {
      clearForm();
    }
  }, []);

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.id as keyof WorkoutForm;
    const state = { value: event.target.value, error: "" };
    updateForm({ name, state });
  };

  const handleSubmit = () => {
    event.preventDefault();
    if (!validate(form)) {
      setError("Come on! Add at least one exercise...");
      return;
    }
    const workout = formToWorkout(form);
    createWorkout(workout).then((res) => {
      if (res.errors) {
        Object.keys(res.errors).forEach((name) => {
          const _name = name as keyof WorkoutForm;
          updateForm({ name: _name, state: { value: form[_name].value, error: res.errors[name] } });
        });
      } else {
        clearForm();
        history.push("/favorites");
      }
    });
  };

  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          color="secondary"
          value={form.title.value}
          error={!!form.title.error}
          helperText={form.title.error}
          onChange={onTextFieldChange}
          fullWidth
          required
        />
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
        <div className={classes.tasks}>
          <TaskList tasks={form.tasks.value} showModal={showModal} updateTasks={updateTasks} />
        </div>
        <TextField
          id="restPeriodInSeconds"
          name="restPeriodInSeconds"
          label="Rest between sets"
          color="secondary"
          type="number"
          value={form.restPeriodInSeconds.value}
          error={!!form.restPeriodInSeconds.error}
          helperText={form.restPeriodInSeconds.error}
          InputProps={{ endAdornment: <InputAdornment position="end">Sec</InputAdornment> }}
          onChange={onTextFieldChange}
          fullWidth
          required
        />
        <Button className={classes.cta} color="secondary" variant="contained" type="submit">
          Create
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
});

const mapDispatchToProps = {
  showModal: showModalRequest,
  updateTasks: updateTasksRequest,
  updateForm: updateWorkoutFormRequest,
  clearForm: clearWorkoutFormRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCreatePage);
