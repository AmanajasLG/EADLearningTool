import { playSessionControlConstants } from "../_constants";

const createNew = (create_new) => {
  return { type: playSessionControlConstants.CREATE_NEW, create_new };
};
const ended = (ended) => ({ type: playSessionControlConstants.ENDED, ended });

export const playSessionControlActions = {
  createNew,
  ended,
};
