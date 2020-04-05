import * as React from "react";
import { Task } from "Store/types";
import TaskItem from "Components/task-item";
import { ModalType } from "Components/modal/modal";
import { showModalRequest } from "Store/modal/thunks";
import { ActionType } from "Store/modal/types";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { reorder } from "Store/helper";
import { updateTasksRequest } from "Store/active-item/thunks";

interface OwnProps {
  tasks: Task[];
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
}

interface ActiveSet {
  action: "add" | "update" | "delete";
  index: number;
  value: number;
}

interface ActiveTask {
  id: number;
  set?: ActiveSet;
}

const TaskList = ({ tasks, showModal, updateTasks }: OwnProps) => {
  const [activeTask, setActiveTask] = React.useState<ActiveTask>({ id: null });

  const onTaskClick = (taskID: number) => (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setActiveTask(isExpanded ? { id: taskID } : { id: null });
  };

  const onSetClick = (index: number) => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        title: "Change repetitions",
        task: tasks.find(t => t.id === activeTask.id),
        action: ActionType.UPDATE,
        index
      }
    });
  };

  const onAddSetClick = () => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        title: "Add new set",
        task: tasks.find(t => t.id === activeTask.id),
        action: ActionType.ADD
      }
    });
    setActiveTask(prevState => ({ id: prevState.id }));
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
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <TaskItem
                  index={index}
                  task={task}
                  key={task.id}
                  expanded={activeTask.id === task.id}
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
