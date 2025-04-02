import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TEACHERS: 'RECEIVE_TEACHERS',
  CREATE_TEACHER: 'CREATE_TEACHER',
  DELETE_TEACHER: 'DELETE_TEACHER',
  UPDATE_TEACHER: 'UPDATE_TEACHER',
  RECEIVE_TEACHER_DETAIL: 'RECEIVE_TEACHER_DETAIL',
  SET_ERROR: 'SET_ERROR',
};

// Action Creators
function receiveTeachersActionCreator(teachers) {
  return { type: ActionType.RECEIVE_TEACHERS, payload: { teachers } };
}

function createTeacherActionCreator(newTeacher) {
  return { type: ActionType.CREATE_TEACHER, payload: { newTeacher } };
}

function deleteTeacherActionCreator(id) {
  return { type: ActionType.DELETE_TEACHER, payload: { id } };
}

function updateTeacherActionCreator(updatedTeacher) {
  return { type: ActionType.UPDATE_TEACHER, payload: { updatedTeacher } };
}

function receiveTeacherDetailActionCreator(teacherDetail) {
  return {
    type: ActionType.RECEIVE_TEACHER_DETAIL,
    payload: { teacherDetail },
  };
}

function setErrorActionCreator(error) {
  return { type: ActionType.SET_ERROR, payload: { error } };
}

// 🔹 Async Functions
function asyncReceiveTeachers({
  page = 1,
  size = 10,
  searchKey,
  searchValue,
  filter,
} = {}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const teachers = await api.getAllTeachers({
        page,
        size,
        searchKey,
        searchValue,
        filter,
      });
      dispatch(receiveTeachersActionCreator(teachers));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateTeacher(teacherData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newTeacher = await api.createTeacher(teacherData);
      console.log(newTeacher);
      dispatch(createTeacherActionCreator(newTeacher));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(asyncReceiveTeachers);
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteTeacher(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteTeacher(id);
      dispatch(deleteTeacherActionCreator(id));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(asyncReceiveTeachers);
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateTeacher(teacherData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      console.log(teacherData);
      const updatedTeacher = await api.updateTeacher(teacherData);
      dispatch(updateTeacherActionCreator(updatedTeacher));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetTeacherDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const teacherDetail = await api.getTeacherDetail(id);
      dispatch(receiveTeacherDetailActionCreator(teacherDetail));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

// 🔹 Export semua actions & async functions
export {
  ActionType,
  receiveTeachersActionCreator,
  createTeacherActionCreator,
  deleteTeacherActionCreator,
  updateTeacherActionCreator,
  receiveTeacherDetailActionCreator,
  setErrorActionCreator,
  asyncReceiveTeachers,
  asyncCreateTeacher,
  asyncDeleteTeacher,
  asyncUpdateTeacher,
  asyncGetTeacherDetail,
};
