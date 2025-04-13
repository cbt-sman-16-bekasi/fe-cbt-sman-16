import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

// 🔹 Action Creators
function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

// 🔹 Async Functions
function asyncSetAuthUser({ password, username }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { token, user, detail } = await api.login({ password, username });

      api.putAccessToken(token);
      const safeDetail = {
        ...detail,
        name: 'Super Admin',
      };
      const mergedUser = { ...user, detail: safeDetail };

      localStorage.setItem('authUser', JSON.stringify(mergedUser));
      dispatch(setAuthUserActionCreator(mergedUser));
    } catch (error) {
      dispatch(unsetAuthUserActionCreator());
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
    localStorage.removeItem('authUser');
    window.location.href = '/login';
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
