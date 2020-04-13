import * as React from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Check, Add, Folder } from "@material-ui/icons";
import { Exercise } from "Store/types";
import { capitalizeWord } from "../../utils/text-utils";
import squatIcon from "../../images/squat.png";

interface OwnProps {
  exercise: Exercise;
  selected: boolean;
  onClick: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    black: {
      color: "black",
      backgroundColor: theme.palette.secondary.main,
    },
    listItemText: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    tag: {
      fontSize: "12px",
      margin: theme.spacing(0.25, 0.5),
    },
    statusIcon: {
      display: "flex",
      background: "#e5e5e5",
      borderRadius: "50%",
      padding: "7px",
    },
    selected: {
      background: "black",
    },
  })
);

const ExerciseItem = ({ exercise, selected, onClick }: OwnProps) => {
  const classes = useStyles();
  return (
    <ListItem button onClick={() => onClick(exercise.id)}>
      <ListItemAvatar>
        <Avatar className={classes.black}>
          <img src={squatIcon} />
        </Avatar>
      </ListItemAvatar>
      <div className={classes.listItemText}>
        <ListItemText primary={exercise.title} />
        {exercise.bodyParts.map((bodyPart) => (
          <span key={bodyPart} className={classes.tag}>
            {capitalizeWord(bodyPart)}
          </span>
        ))}
      </div>
      <span className={`${classes.statusIcon} ${selected ? classes.selected : ""}`}>
        {selected ? <Check color="secondary" /> : <Add color="secondary" />}
      </span>
    </ListItem>
  );
};

export default ExerciseItem;
