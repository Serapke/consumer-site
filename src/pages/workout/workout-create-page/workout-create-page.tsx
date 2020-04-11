import * as React from "react";
import { connect } from "react-redux";
import { showModalRequest } from "Store/modal/thunks";
import { TextField, Fab, makeStyles, createStyles, Theme, Button, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TaskList from "Components/task-list";

interface PropsFromDispatch {
  showModal: typeof showModalRequest;
}

type OwnProps = PropsFromDispatch;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
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

const WorkoutCreatePage = ({ showModal }: OwnProps) => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <TextField id="standard-basic" label="Title" fullWidth color="secondary" />
      </div>
      <Button
        className={classes.button}
        size="large"
        color="secondary"
        variant="contained"
        component={Link}
        to="/exercise/select"
      >
        <Add fontSize="large" />
      </Button>
      <TaskList tasks={[]} showModal={showModal} updateTasks={null} />
      <Fab className={classes.fab} color="secondary" variant="extended">
        Save
      </Fab>
    </div>
  );
};

const mapDispatchToProps = {
  showModal: showModalRequest,
};

export default connect(null, mapDispatchToProps)(WorkoutCreatePage);
