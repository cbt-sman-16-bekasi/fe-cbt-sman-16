import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_CLASSES: 'RECEIVE_CLASSES',
  CREATE_CLASS: 'CREATE_CLASS',
  DELETE_CLASS: 'DELETE_CLASS',
  UPDATE_CLASS: 'UPDATE_CLASS',
  RECEIVE_CLASS_DETAIL: 'RECEIVE_CLASS_DETAIL',
  SET_ERROR: 'SET_ERROR',
};

function receiveClassesActionCreator(classes) {
  return {
    type: ActionType.RECEIVE_CLASSES,
    payload: { classes },
  };
}

function createClassActionCreator(newClass) {
  return {
    type: ActionType.CREATE_CLASS,
    payload: { newClass },
  };
}

function deleteClassActionCreator(id) {
  return {
    type: ActionType.DELETE_CLASS,
    payload: { id },
  };
}

function updateClassActionCreator(updatedClass) {
  return {
    type: ActionType.UPDATE_CLASS,
    payload: { updatedClass },
  };
}

function receiveClassDetailActionCreator(classDetail) {
  return {
    type: ActionType.RECEIVE_CLASS_DETAIL,
    payload: { classDetail },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: { error: error?.message || 'Something went wrong' },
  };
}

function asyncReceiveClasses({
  page = 1,
  size = 10,
  searchKey,
  searchValue,
  filter,
} = {}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const classes = await api.getAllClasses({
        page,
        size,
        searchKey,
        searchValue,
        filter,
      });
      dispatch(receiveClassesActionCreator(classes));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateClass(classData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newClass = await api.createClass(classData);
      dispatch(createClassActionCreator(newClass));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteClass(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteClass(id);
      dispatch(deleteClassActionCreator(id));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(asyncReceiveClasses());
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateClass({ id, class_code, class_name }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedClass = await api.updateClass({
        id,
        class_code,
        class_name,
      });
      dispatch(updateClassActionCreator(updatedClass));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(asyncReceiveClasses());
      dispatch(hideLoading());
    }
  };
}

function asyncGetClassDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const classDetail = await api.getClassDetail(id);
      dispatch(receiveClassDetailActionCreator(classDetail));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveClassesActionCreator,
  createClassActionCreator,
  deleteClassActionCreator,
  updateClassActionCreator,
  receiveClassDetailActionCreator,
  setErrorActionCreator,
  asyncReceiveClasses,
  asyncCreateClass,
  asyncDeleteClass,
  asyncUpdateClass,
  asyncGetClassDetail,
};
