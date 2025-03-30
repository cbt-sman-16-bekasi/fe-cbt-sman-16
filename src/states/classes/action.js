import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_CLASSES: 'RECEIVE_CLASSES',
};

function receiveClassesActionCreator(classes) {
  return {
    type: ActionType.RECEIVE_CLASSES,
    payload: {
      classes,
    },
  };
}

function asyncRecieveClasses() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const classes = await api.getAllClasses();
      dispatch(receiveClassesActionCreator(classes));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, receiveClassesActionCreator, asyncRecieveClasses };
