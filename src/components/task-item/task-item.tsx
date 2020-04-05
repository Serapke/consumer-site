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
import { Draggable } from "react-beautiful-dnd";

interface OwnProps {
  index: number;
  task: Task;
  expanded: boolean;
  onChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  onSetClick: (index: number) => void;
  onAddSetClick: () => void;
}

const capitalizeWord = (word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase();

const useSummaryStyles = makeStyles({
  content: {
    flexDirection: "column"
  }
});

const TaskItem: React.FC<OwnProps> = ({ index, task, expanded, onChange, onSetClick, onAddSetClick }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {provided => (
        <ExpansionPanel
          expanded={expanded}
          onChange={onChange}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                <CircleItem key={index} style="primary" onClick={() => onSetClick(index)}>
                  {set}x
                </CircleItem>
              ))}
              <CircleItem style="secondary" onClick={onAddSetClick}>
                <AddIcon />
              </CircleItem>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </Draggable>
  );
};

export default TaskItem;
