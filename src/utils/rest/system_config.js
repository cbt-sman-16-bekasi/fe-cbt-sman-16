import useApi from "./api.js";

const useSystemConfigApi = (() => {
  const retrieveConfigModule = async (module) => {
    return await useApi.fetch(`/config/${module}`, {
      method: 'GET',
    });
  };

  return {
    retrieveConfigModule: retrieveConfigModule
  }
})()

export default useSystemConfigApi