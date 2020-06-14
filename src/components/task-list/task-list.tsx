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
  editable?: boolean;
  showModal?: typeof showModalRequest;
  updateTasks?: typeof updateTasksRequest;
}

const TaskList = ({ tasks, editable, showModal, updateTasks }: OwnProps) => {
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

  const onSetClick = (taskIndex: number, setIndex: number) => {
    if (!editable) return;
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        task: tasks[taskIndex],
        action: ActionType.UPDATE,
        index: setIndex,
      },
    });
  };

  const onAddSetClick = (index: number) => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        task: tasks[index],
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

  const onDeleteClick = (index: number) => {
    const updatedTasks = removeItem(tasks, { index });
    updateTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" isDropDisabled={!editable}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskItem
                index={index}
                task={task}
                key={task.id + "_" + index}
                expanded={activeTask === task.id}
                editable={editable}
                onChange={onTaskClick(task.id)}
                onSetClick={onSetClick}
                onAddSetClick={onAddSetClick}
                onDeleteClick={onDeleteClick}
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
