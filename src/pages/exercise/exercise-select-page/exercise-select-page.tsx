import * as React from "react";
import { connect } from "react-redux";
import {
  Fab,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  List,
  Button,
} from "@material-ui/core";
import { Clear, Add } from "@material-ui/icons";
import { RouteComponentProps, Link } from "react-router-dom";
import { fetchBodyPartsRequest, fetchExercisesRequest } from "Store/content/thunks";
import { ApplicationState } from "Store/index";
import { Exercise } from "Store/types";
import ExerciseItem from "Components/exercise";

import * as Styles from "./exercise-select-page.scss";
import { capitalizeWord } from "../../../utils/text-utils";

interface RouteParams {
  id: string;
}

interface PropsFromState {
  bodyParts: string[];
  exercises: Exercise[];
}

interface PropsFromDispatch {
  fetchBodyParts: typeof fetchBodyPartsRequest;
  fetchExercises: typeof fetchExercisesRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      width: "200px",
    },
    label: {
      margin: theme.spacing(1),
    },
    button: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  })
);

const ExerciseSelectPage = ({ bodyParts, exercises, match, fetchBodyParts, fetchExercises }: OwnProps) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const classes = useStyles();

  React.useEffect(() => {
    fetchBodyParts();
    fetchExercises();
  }, [match.params.id]);

  const onChipClicked = () => {
    console.log("on chip clikc");
  };

  const onChipDelete = () => {
    console.log("on chip delete");
  };

  return (
    <div>
      <div className={classes.header}>
        <h2>Exercises</h2>
        <Button color="secondary" component={Link} to="/exercise/create">
          + NEW EXERCISE
        </Button>
      </div>
      <FormControl fullWidth>
        <InputLabel htmlFor="search" className={classes.label} color="secondary">
          Search
        </InputLabel>
        <Input
          id="search"
          value={searchQuery}
          color="secondary"
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <IconButton onClick={() => setSearchQuery("")}>
              <Clear style={{ color: "black" }} />
            </IconButton>
          }
        />
      </FormControl>
      <div className={Styles.chipContainer}>
        {bodyParts.map((bodyPart) => (
          <Chip
            color="secondary"
            key={bodyPart}
            size="medium"
            label={capitalizeWord(bodyPart)}
            clickable
            onClick={onChipClicked}
            onDelete={onChipDelete}
            style={{ margin: "3px" }}
          />
        ))}
      </div>
      <div>
        <List>
          {exercises.map((exercise, index) => (
            <ExerciseItem key={exercise.id + "_" + index} exercise={exercise} onClick={() => console.log("click")} />
          ))}
        </List>
      </div>
      <Fab className={classes.fab} color="secondary" variant="extended">
        Continue
      </Fab>
    </div>
  );
};

const mapStateToProps = ({ content }: ApplicationState) => ({
  bodyParts: content.bodyParts,
  exercises: content.exercises,
});

const mapDispatchToProps = {
  fetchBodyParts: fetchBodyPartsRequest,
  fetchExercises: fetchExercisesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelectPage);
