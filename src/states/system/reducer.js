import {ActionType} from "./action.js";

const initialState = {
  configSlash: null,
  categorySchool: null,
};

function systemConfigReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SYSTEM_CONFIG_SLASH:
      return {
        ...state,
        configSlash: action?.payload?.result,
      };
    case ActionType.SYSTEM_CONFIG_CATEGORY_SCHOOL:
      return {
        ...state,
        categorySchool: action?.payload?.result,
      };

    default:
      return state;
  }
}

export default systemConfigReducer;