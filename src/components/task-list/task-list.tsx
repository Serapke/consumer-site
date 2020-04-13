import * as React from "react";
import { Task } from "Store/types";
import TaskItem from "Components/task-item";
import { ModalType } from "Components/modal/modal";
import { showModalRequest } from "Store/modal/thunks";
import { ActionType } from "Store/modal/types";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { reorder } from "Utils/immutable";
import { updateTasksRequest } from "Store/active-item/thunks";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

interface OwnProps {
  tasks: Task[];
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emptyList: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      color: "#909090",
    },
  })
);

const EmptyList = () => {
  const classes = useStyles();
  return (
    <div className={classes.emptyList}>
      <div>No exercises yet.</div>
      <div>Press + to add it</div>
    </div>
  );
};

const TaskList = ({ tasks, showModal, updateTasks }: OwnProps) => {
  const [activeTask, setActiveTask] = React.useState<number | false>(false);

  if (!tasks || !tasks.length) {
    return <EmptyList />;
  }

  const onTaskClick = (taskID: number) => (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setActiveTask(isExpanded ? taskID : false);
  };

  const onSetClick = (index: number) => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        task: tasks.find((t) => t.id === activeTask),
        action: ActionType.UPDATE,
        index,
      },
    });
  };

  const onAddSetClick = () => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        task: tasks.find((t) => t.id === activeTask),
        action: ActionType.ADD,
      },
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const reorderedTasks = reorder(tasks, source.index, destination.index);
    updateTasks(reorderedTasks);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <TaskItem
                  index={index}
                  task={task}
                  key={task.id}
                  expanded={activeTask === task.id}
                  onChange={onTaskClick(task.id)}
                  onSetClick={onSetClick}
                  onAddSetClick={onAddSetClick}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
