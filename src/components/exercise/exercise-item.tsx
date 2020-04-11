import * as React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Check, Add } from "@material-ui/icons";
import { Exercise } from "Store/types";

import * as Styles from "./exercise-item.scss";
import { capitalizeWord } from "../../utils/text-utils";

interface OwnProps {
  exercise: Exercise;
  onClick: () => void;
}

const ExerciseItem = ({ exercise, onClick }: OwnProps) => {
  return (
    <ListItem button onClick={onClick}>
      <div className={Styles.container}>
        <div>
          <ListItemText primary={exercise.title} />
          {exercise.bodyParts.map((bodyPart) => (
            <span key={bodyPart} className={Styles.tags}>
              {capitalizeWord(bodyPart)}
            </span>
          ))}
        </div>
        <div className={Styles.statusIcon}>
          {exercise.id % 2 == 0 ? <Check color="secondary" /> : <Add color="secondary" />}
        </div>
      </div>
    </ListItem>
  );
};

export default ExerciseItem;
