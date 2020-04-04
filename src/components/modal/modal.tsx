import * as React from "react";
import { connect } from "react-redux";
import SetEditingDialog from "Components/dialogs/set-editing-dialog";
import { ModalComponent, CommonDialogActions } from "./types";
import { ApplicationState } from "Store/index";
import { hideModal } from "Store/modal/actions";
import { ModalState, DialogStateProps } from "Store/modal/types";

type OwnProps = CommonDialogActions & {
  type: string;
  props: DialogStateProps;
};

export const ModalType = {
  SetEditingDialog: "SET_EDITING_DIALOG"
};

const MODAL_COMPONENTS: { [key: string]: ModalComponent } = {
  [ModalType.SetEditingDialog]: SetEditingDialog
};

const Modal = ({ type, props, hide }: OwnProps): React.FunctionComponentElement<ModalComponent> => {
  if (!type) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[type];
  return <SpecificModal {...props} hide={hide} />;
};

const mapStateToProps = (state: ApplicationState): ModalState => state.modal;

const mapDispatchToProps = {
  hide: hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
