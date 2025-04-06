import useApi from "./api.js";

const useExamSessionController = (() => {

  const getAllExamSession = async ({ page = 1, size = 10, searchKey, searchValue, filter } = {}) => {
    return await useApi.fetchPagination(`/academic/exam/session/all`, {
      page,
      size, searchKey,searchValue, filter
    })
  }

  const modifyExamSession = async ({body, id = null, isCreate = false}) => {
    return await useApi.fetch(isCreate ? '/academic/exam/session/create' : `/academic/exam/session/update/${id}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
  }

  const getDetail = async ({ id } = {}) => {
    return await useApi.fetch(`/academic/exam/session/detail/${id}`, {
      method: 'GET'
    })
  }

  const generateToken = async ({body}) => {
    return await useApi.fetch(`/academic/exam/session/token/generate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
  }


  return {
    modify: modifyExamSession,
    retrieveDetail: getDetail,
    generateToken: generateToken,
    allExamSession: getAllExamSession
  }
})()

export default useExamSessionController;