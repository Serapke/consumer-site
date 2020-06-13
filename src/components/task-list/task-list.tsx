import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Task } from "Store/types";
import TaskItem from "Components/task-item";
import { ModalType } from "Components/modal/modal";
import { showModalRequest } from "Store/modal/thunks";
import { ActionType } from "Store/modal/types";
import { reorder, removeItem } from "Utils/immutable";
import EmptyState from "Components/empty-state";
import { updateTasksRequest } from "Store/form/thunks";

interface OwnProps {
  tasks: Task[];
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
}

const TaskList = ({ tasks, showModal, updateTasks }: OwnProps) => {
  const [activeTask, setActiveTask] = React.useState<number | false>(false);

  if (!tasks || !tasks.length) {
    return (
      <div>
        <EmptyState primaryText="No exercises yet." secondaryText="Press + to add it" />
      </div>
    );
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

  const onDelete = (index: number) => {
    const updatedTasks = removeItem(tasks, { index });
    updateTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskItem
                index={index}
                task={task}
                key={task.id + "_" + index}
                expanded={activeTask === task.id}
                onChange={onTaskClick(task.id)}
                onSetClick={onSetClick}
                onAddSetClick={onAddSetClick}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
