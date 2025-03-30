import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveClassesActionCreator } from '../classes/action';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        const authUser = JSON.parse(storedUser);
        dispatch(setAuthUserActionCreator(authUser));
      }
    } catch (error) {
      dispatch(receiveClassesActionCreator([]));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
