import { ActionType } from './action';

const initialState = {
  classCodes: [],
  dashboardData: null,
  subjects: [],
  userRoles: [],
  error: null,
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_CLASS_CODES:
      return { ...state, classCodes: action.payload.classCodes, error: null };
    case ActionType.RECEIVE_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload.dashboardData,
        error: null,
      };
    case ActionType.RECEIVE_SUBJECTS:
      return { ...state, subjects: action.payload.subjects, error: null };
    case ActionType.RECEIVE_USER_ROLES:
      return { ...state, userRoles: action.payload.userRoles, error: null };
    case ActionType.SET_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}

export default commonReducer;
