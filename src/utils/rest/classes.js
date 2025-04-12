import useApi from './api.js';

const useClassesApi = (() => {
  const getAllClasses = async ({
    page = 1,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/class/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const modifyClasses = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate ? '/academic/class/create' : `/academic/class/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/class/detail/${id}`, {
      method: 'GET',
    });
  };

  return {
    allClasses: getAllClasses,
    modifyClasses: modifyClasses,
    detailClasses: getDetail,
  };
})();

export default useClassesApi;
