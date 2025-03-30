import { ActionType } from './action';

function isPreloadReducer(isPreload = true, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
}

// function isPreloadReducer(isPreLoad = true, action = {}) {
//   switch (ActionType) {
//     case ActionType.SET_IS_PRELOAD:
//       return action.payload.isPreLoad;
//     default:
//       return isPreLoad;
//   }
// }

export default isPreloadReducer;
