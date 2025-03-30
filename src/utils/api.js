import { unsetAuthUserActionCreator } from '../states/authUser/action';

const api = (() => {
  const BASE_URL = import.meta.env.VITE_BASE_API;

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}, dispatch) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (response.status === 401) {
      if (dispatch) {
        dispatch(unsetAuthUserActionCreator());
      }
      removeAccessToken();
      window.location.href = '/login';
    }

    return response;
  }

  async function login({ password, username }) {
    try {
      const response = await fetch(`${BASE_URL}/academic/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, username }),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || 'Login gagal!');
      }

      const { data } = responseJson;

      return data;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  }

  async function logout() {
    removeAccessToken();
    window.location.href = '/login';
  }

  async function getClassCode() {
    return _fetchWithAuth('/academic/class-code');
  }

  async function coba() {
    return _fetchWithAuth('/academic/user/roles');
  }

  async function getAllClasses(
    { page = 1, size = 10, searchKey, searchValue, filter } = {},
    dispatch
  ) {
    const params = new URLSearchParams({ page, size });

    if (searchKey && searchValue) {
      params.append('search.key', searchKey);
      params.append('search.value', searchValue);
    }

    if (filter) {
      Object.keys(filter).forEach((key) =>
        params.append(`filter[${key}]`, filter[key])
      );
    }

    const response = await _fetchWithAuth(
      `/academic/class/all?${params.toString()}`,
      {},
      dispatch
    );
    const responseJson = await response.json();
    return responseJson.data;
  }

  return {
    putAccessToken,
    getAccessToken,
    removeAccessToken,
    login,
    logout,
    getClassCode,
    getAllClasses,
    coba,
  };
})();

export default api;
