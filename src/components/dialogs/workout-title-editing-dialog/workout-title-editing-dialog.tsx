import * as React from "react";
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import { CommonDialogActions } from "Components/modal/types";
import { updateWorkoutRequest } from "Store/active-item/thunks";
import { WorkoutTitleEditingDialogProps } from "Store/modal/types";

type OwnProps = CommonDialogActions &
  WorkoutTitleEditingDialogProps & {
    updateWorkout: typeof updateWorkoutRequest;
  };

const SetEditingDialog = ({ workout, hide, updateWorkout }: OwnProps) => {
  const [workoutTitle, setWorkoutTitle] = React.useState<string>();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutTitle(e.target.value);
  };

  const handleConfirm = () => {
    updateWorkout({ ...workout, title: workoutTitle });
    hide();
  };

  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle>Edit workout title</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Title" defaultValue={workout.title} onChange={onValueChange} />
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
  updateWorkout: updateWorkoutRequest
};

export default connect(null, mapDispatchToProps)(SetEditingDialog);
