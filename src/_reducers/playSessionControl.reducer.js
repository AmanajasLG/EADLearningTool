import { playSessionControlConstants } from "../_constants/playSessionControl.constants";

export function playSessionControl(
  state = { create_new: false, ended: false },
  action
) {
  switch (action.type) {
    case playSessionControlConstants.CREATE_NEW:
      return { ...state, create_new: action.create_new };
    case playSessionControlConstants.ENDED:
      return { ...state, ended: action.ended };
    default:
      return state;
  }
}
