import * as React from "react";
import { connect } from "react-redux";
import { CommonDialogActions } from "Components/modal/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { updateTaskRequest } from "Store/active-item/thunks";
import { updateObjectInArray, removeItem } from "Utils/immutable";
import { ActionType, SetEditingDialogProps } from "Store/modal/types";

import * as Styles from "./set-editing-dialog.scss";

type OwnProps = CommonDialogActions &
  SetEditingDialogProps & {
    updateTask: typeof updateTaskRequest;
  };

const SetEditingDialog = ({ hide, task, index, action, updateTask }: OwnProps) => {
  const [repetitions, setRepetitions] = React.useState<number>();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetitions(parseInt(e.target.value));
  };

  const handleConfirm = () => {
    if (action === ActionType.UPDATE) {
      updateTask({
        ...task,
        sets: updateObjectInArray(task.sets, { index, item: repetitions }),
      });
    } else if (action === ActionType.ADD) {
      updateTask({
        ...task,
        sets: [...task.sets, repetitions],
      });
    }
    hide();
  };

  const handleDelete = () => {
    updateTask({
      ...task,
      sets: removeItem(task.sets, { index }),
    });
    hide();
  };

  const showDeleteButton = action === ActionType.UPDATE;

  const getTitle = () => (action === ActionType.UPDATE ? "Change repetitions" : "Add new set");

  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle disableTypography className={Styles.title}>
        <h2>{getTitle()}</h2>
        {showDeleteButton && (
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        )}
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
  updateTask: updateTaskRequest,
};

export default connect(null, mapDispatchToProps)(SetEditingDialog);
