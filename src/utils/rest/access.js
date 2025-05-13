import useApi from './api.js';

const useAccessApi = (() => {
  const getAllAccess = async ({
    page = 1,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/teacher/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const modifyAccess = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate ? '/academic/user/create' : `/academic/user/${id}/update`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/user/${id}/detail`, {
      method: 'GET',
    });
  };

  return {
    allAccess: getAllAccess,
    modifyAccess: modifyAccess,
    detailAccess: getDetail,
  };
})();

export default useAccessApi;
