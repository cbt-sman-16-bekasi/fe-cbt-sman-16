import useApi from "./api.js";

const useCurriculumSubjectApi = (() => {
  const modifySubject = async ({ body, id = null, isCreate = false }) => {
    return await useApi.fetch(
      isCreate
        ? '/academic/curriculum/subject/create'
        : `/academic/curriculum/subject/update/${id}`,
      {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  };

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/curriculum/subject/detail/${id}`, {
      method: 'GET',
    });
  };

  return {
    modifySubject: modifySubject,
    detail: getDetail
  }
})()

export default useCurriculumSubjectApi