import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { ApplicationState } from "Store/index";
import { getWorkout } from "Services/workout";
import { Workout } from "Store/types";
import { Typography, Button, Box } from "@material-ui/core";

interface RouteParams {
  id: string;
}

type AllProps = RouteComponentProps<RouteParams>;

const WorkoutPage: React.FunctionComponent<AllProps> = ({ match }) => {
  const [workout, updateWorkout] = React.useState<Workout>();

  React.useEffect(() => {
    getWorkout(match.params.id).then((workout) => updateWorkout(workout));
  }, []);

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{workout.title}</Typography>
        <Box>
          <Button color="secondary" component={Link} to={`/workout/${match.params.id}/edit`}>
            EDIT WORKOUT
          </Button>
        </Box>
      </Box>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);
