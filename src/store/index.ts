import { combineReducers, Reducer } from "redux";
import { ContentState } from "./content/types";
import { ActiveItemState } from "./active-item/types";
import { ModalState } from "./modal/types";
import contentReducer from "./content/reducer";
import activeItemReducer from "./active-item/reducer";
import modalReducer from "./modal/reducer";

export interface ApplicationState {
  content: ContentState;
  activeItem: ActiveItemState;
  modal: ModalState;
}
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  content: contentReducer,
  activeItem: activeItemReducer,
  modal: modalReducer
});
