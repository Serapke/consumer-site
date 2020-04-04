import * as React from "react";
import { Task } from "Store/types";
import TaskItem from "Components/task-item";
import { ModalType } from "Components/modal/modal";
import { showModalRequest, hideModalRequest } from "Store/modal/thunks";

interface OwnProps {
  tasks: Task[];
  modalResult: number;
  showModal: typeof showModalRequest;
  hideModal: typeof hideModalRequest;
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

const TaskList = ({ tasks, modalResult, showModal, hideModal }: OwnProps) => {
  const [activeTask, setActiveTask] = React.useState<ActiveTask>({ id: null });

  const onTaskClick = (taskID: number) => (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setActiveTask(isExpanded ? { id: taskID } : { id: null });
  };

  const onSetClick = (value: number, index: number) => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        title: "Change set repetitions",
        task: tasks.find(t => t.id === activeTask.id),
        action: "update",
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
        action: "add"
      }
    });
    setActiveTask(prevState => ({ id: prevState.id }));
  };

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          task={task}
          key={task.id}
          expanded={activeTask.id === task.id}
          onChange={onTaskClick(task.id)}
          onSetClick={onSetClick}
          onAddSetClick={onAddSetClick}
        />
      ))}
    </div>
  );
};

export default TaskList;
