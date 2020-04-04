import * as React from "react";
import {
  Chip,
  ExpansionPanel,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles
} from "@material-ui/core";
import { Task } from "Store/types";
import * as Styles from "./task-item.scss";
import CircleItem from "Components/circle-item";
import AddIcon from "@material-ui/icons/Add";

interface OwnProps {
  task: Task;
  expanded: boolean;
  onChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  onSetClick: (setValue: number, index: number) => void;
  onAddSetClick: () => void;
}

const capitalizeWord = (word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase();

const useSummaryStyles = makeStyles({
  content: {
    flexDirection: "column"
  }
});

const TaskItem: React.FC<OwnProps> = ({ task, expanded, onChange, onSetClick, onAddSetClick }) => {
  return (
    <ExpansionPanel expanded={expanded} onChange={onChange}>
      <ExpansionPanelSummary classes={useSummaryStyles()}>
        <Typography component="div">{task.exercise.title}</Typography>
        <div className={Styles.chipContainer}>
          {task.exercise.bodyParts.map(bodyPart => (
            <Chip key={bodyPart} size="small" label={capitalizeWord(bodyPart)} />
          ))}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={Styles.setContainer}>
          {task.sets.map((set, index) => (
            <CircleItem key={index} style="primary" onClick={() => onSetClick(set, index)}>
              {set}x
            </CircleItem>
          ))}
          <CircleItem style="secondary" onClick={onAddSetClick}>
            <AddIcon />
          </CircleItem>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default TaskItem;
