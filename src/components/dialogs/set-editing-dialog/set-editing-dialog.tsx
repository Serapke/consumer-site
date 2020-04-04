import * as React from "react";
import { connect } from "react-redux";
import { ModalComponent, AllSetEditingDialogProps } from "Components/modal/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { updateTaskRequest } from "Store/active-item/thunks";
import { updateObjectInArray, removeItem } from "Store/helper";

const SetEditingDialog: ModalComponent = ({
  hide,
  title,
  task,
  index,
  action,
  updateTask
}: AllSetEditingDialogProps) => {
  const [repetitions, setRepetitions] = React.useState<number>();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetitions(parseInt(e.target.value));
  };

  const handleConfirm = () => {
    if (action === "update") {
      updateTask({
        ...task,
        sets: updateObjectInArray(task.sets, { index, item: repetitions })
      });
    } else if (action === "add") {
      updateTask({
        ...task,
        sets: [...task.sets, repetitions]
      });
    }
    hide();
  };

  const handleDelete = () => {
    updateTask({
      ...task,
      sets: removeItem(task.sets, { index })
    });
    hide();
  };

  return (
    <Dialog open={true}>
      <DialogTitle>
        {title}
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Repetitions"
          type="number"
          defaultValue={task.sets[index]}
          onChange={onValueChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={hide} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  updateTask: updateTaskRequest
};

export default connect(null, mapDispatchToProps)(SetEditingDialog);
