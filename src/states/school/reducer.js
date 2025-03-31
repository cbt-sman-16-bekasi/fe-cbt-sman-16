import { ActionType } from './action';

const initialState = {
  schoolInfo: null,
  error: null,
};

function schoolReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_SCHOOL_INFO:
      return {
        ...state,
        schoolInfo: action.payload.schoolInfo,
        error: null,
      };

    case ActionType.UPDATE_SCHOOL_INFO:
      return {
        ...state,
        schoolInfo: action.payload.updatedSchoolInfo,
        error: null,
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

export default schoolReducer;
