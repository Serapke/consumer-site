import * as React from "react";
import { Chip, Typography, ExpansionPanelDetails, withStyles, IconButton } from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Task } from "Store/types";
import * as Styles from "./task-item.scss";
import CircleItem from "Components/circle-item";
import AddIcon from "@material-ui/icons/Add";
import { Draggable } from "react-beautiful-dnd";
import { capitalizeWord } from "../../utils/text-utils";
import { Delete } from "@material-ui/icons";

interface OwnProps {
  index: number;
  task: Task;
  expanded: boolean;
  onChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  onSetClick: (index: number) => void;
  onAddSetClick: () => void;
  onDelete: (index: number) => void;
}

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    flexDirection: "column",
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const TaskItem: React.FC<OwnProps> = ({ index, task, expanded, onChange, onSetClick, onAddSetClick, onDelete }) => {
  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(index);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <ExpansionPanel
          expanded={expanded}
          onChange={onChange}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ExpansionPanelSummary>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Typography component="div">{task.exercise.title}</Typography>
                <div className={Styles.chipContainer}>
                  {task.exercise.bodyParts.map((bodyPart) => (
                    <Chip key={bodyPart} size="small" label={capitalizeWord(bodyPart)} />
                  ))}
                </div>
              </div>
              <div>
                <IconButton aria-label="delete" onClick={onDeleteClick}>
                  <Delete />
                </IconButton>
              </div>
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
