import { ActionType } from './action';

function classesReducer(classes = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CLASSES:
      return action.payload.classes;
    default:
      return classes;
  }
}

export default classesReducer;
