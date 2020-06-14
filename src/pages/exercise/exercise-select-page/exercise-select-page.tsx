import * as React from "react";
import { connect } from "react-redux";
import { StaticContext } from "react-router";
import {
  Input,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  List,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import { fetchBodyPartsRequest, fetchExercisesRequest } from "Store/content/thunks";
import { ApplicationState } from "Store/index";
import { Exercise, BodyPart } from "Store/types";
import ExerciseItem from "Components/exercise";
import { capitalizeWord } from "Utils/text-utils";
import { removeItem } from "Utils/immutable";
import EmptyState from "Components/empty-state";
import { addExercisesToWorkoutRequest } from "Store/form/thunks";

interface LocationState {
  new: boolean;
  from?: Location;
}

interface PropsFromState {
  bodyParts: BodyPart[];
  exercises: Exercise[];
}

interface PropsFromDispatch {
  fetchBodyParts: typeof fetchBodyPartsRequest;
  fetchExercises: typeof fetchExercisesRequest;
  saveWorkoutTasks: typeof addExercisesToWorkoutRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{}, StaticContext, LocationState>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    chips: {
      marginTop: "5px",
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
    list: {
      maxHeight: "350px",
      overflow: "scroll",
    },
    button: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  })
);

const ExerciseSelectPage = ({
  bodyParts,
  exercises,
  location,
  history,
  fetchBodyParts,
  fetchExercises,
  saveWorkoutTasks,
}: OwnProps) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = React.useState<BodyPart[]>([]);
  const classes = useStyles();

  React.useEffect(() => {
    fetchBodyParts();
    fetchExercises();
  }, []);

  const onExerciseClick = (id: string) => {
    if (isSelected(id)) {
      setSelectedItems((prevState) => removeItem(prevState, { index: selectedItems.indexOf(id) }));
    } else {
      setSelectedItems((prevState) => [...prevState, id]);
    }
  };

  const isSelected = (id: string) => {
    return selectedItems.includes(id);
  };

  const onBodyPartClicked = (bodyPart: BodyPart) => () => {
    if (isSelectedBodyPart(bodyPart)) {
      setSelectedBodyParts((prevState) => removeItem(prevState, { index: selectedBodyParts.indexOf(bodyPart) }));
    } else {
      setSelectedBodyParts((prevState) => [...prevState, bodyPart]);
    }
  };

  const isSelectedBodyPart = (bodyPart: BodyPart) => {
    return selectedBodyParts.includes(bodyPart);
  };

  const filteredExercises = exercises.filter((exercise) => {
    const bodyPartFilter = selectedBodyParts.every((bodyPart) => exercise.bodyParts.includes(bodyPart));
    const searchQueryFilter = !searchQuery.length || exercise.title.toLowerCase().startsWith(searchQuery.toLowerCase());
    return bodyPartFilter && searchQueryFilter;
  });

  const onSelect = () => {
    saveWorkoutTasks(selectedItems);
    history.push(location.state.from.pathname, { new: false });
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
        <InputLabel htmlFor="exercise" className={classes.label} color="secondary">
          Search
        </InputLabel>
        <Input
          id="exercise"
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
      <div className={classes.chips}>
        {bodyParts.map((bodyPart) => (
          <Chip
            color={isSelectedBodyPart(bodyPart) ? "secondary" : "default"}
            key={bodyPart}
            size="medium"
            label={capitalizeWord(bodyPart)}
            onClick={onBodyPartClicked(bodyPart)}
            style={{ margin: "3px" }}
            clickable
          />
        ))}
      </div>
      <List className={classes.list}>
        {filteredExercises.length ? (
          filteredExercises.map((exercise, index) => (
            <ExerciseItem
              key={exercise.id + "_" + index}
              exercise={exercise}
              selected={isSelected(exercise.id)}
              onClick={onExerciseClick}
            />
          ))
        ) : (
          <EmptyState primaryText="No exercises matched your search." />
        )}
      </List>
      <Button className={classes.fab} color="secondary" variant="contained" onClick={onSelect}>
        Select
      </Button>
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
  saveWorkoutTasks: addExercisesToWorkoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelectPage);
