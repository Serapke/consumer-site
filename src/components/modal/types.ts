import { DialogStateProps } from "Store/modal/types";
import { updateTaskRequest } from "Store/active-item/thunks";
import { hideModal } from "Store/modal/actions";

export interface CommonDialogActions {
  hide: typeof hideModal;
}

export type AllDialogProps = DialogStateProps & CommonDialogActions;

export interface AllSetEditingDialogProps extends AllDialogProps {
  updateTask: typeof updateTaskRequest;
}

export type ModalComponent = React.FunctionComponent<AllDialogProps>;
