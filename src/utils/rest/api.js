import {asyncUnsetAuthUser} from "../../states/authUser/action.js";

const useApi = (() => {
  // @ts-ignore
  const BASE_URL = import.meta.env.VITE_BASE_API;

  const accessToken = () => {
    return localStorage.getItem('accessToken');
  }

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
  }

  // @ts-ignore
  const logout = async () => {
    removeAccessToken();
    window.location.href = '/login';
  }

  const _fetchWithAuth = async (url, options = {}, dispatch) => {
    const fullUrl = `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken()}`,
      },
    });

    if (response.status === 401) {
      if (dispatch) {
        dispatch(asyncUnsetAuthUser());
      }
      await logout()
    }

    return await response.json();
  }

  const _fetchPagination = async (url, { page = 1, size = 10, searchKey, searchValue, filter } = {}) => {
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

    return await _fetchWithAuth(
      `${url}?${params.toString()}`,
      {}
    );
  }

  return {
    fetch: _fetchWithAuth,
    fetchPagination: _fetchPagination,
  }
})()

export default useApi;