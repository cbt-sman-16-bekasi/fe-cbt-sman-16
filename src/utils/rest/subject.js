import useApi from './api.js';

const useSubjectApi = (() => {
  const getAllSubject = async ({
    page = 1,
    size = 10,
    searchKey,
    searchValue,
    filter,
  } = {}) => {
    return await useApi.fetchPagination(`/academic/class/subject/all`, {
      page,
      size,
      searchKey,
      searchValue,
      filter,
    });
  };

  const modifySubject = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate
        ? '/academic/class/subject/create'
        : `/academic/class/subject/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/class/subject/detail/${id}`, {
      method: 'GET',
    });
  };

  return {
    allSubject: getAllSubject,
    modifySubject: modifySubject,
    detailSubject: getDetail,
  };
})();

export default useSubjectApi;
