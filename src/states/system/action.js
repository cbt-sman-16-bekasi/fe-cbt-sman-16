import useSystemConfigApi from "../../utils/rest/system_config.js";

const ActionType = {
  SYSTEM_CONFIG_SLASH: 'SYSTEM_CONFIG_SLASH',
  SYSTEM_CONFIG_CATEGORY_SCHOOL: 'SYSTEM_CONFIG_CATEGORY_SCHOOL',
};

function setAction(type, result, error) {
  return {
    type,
    payload: { result }
  };
}

function asyncRetrieveSystemConfigSlash() {
  return async (dispatch) => {
    try {
      const {data} = await useSystemConfigApi.retrieveConfigModule("slash_screen");
      dispatch(setAction(ActionType.SYSTEM_CONFIG_SLASH, data, null));
    } catch (error) {
      dispatch(setAction(ActionType.SYSTEM_CONFIG_SLASH, null, error));
    }
  };
}

function asyncRetrieveSystemConfigCategorySchool() {
  return async (dispatch) => {
    try {
      const {data} = await useSystemConfigApi.retrieveConfigModule("category_school");
      dispatch(setAction(ActionType.SYSTEM_CONFIG_CATEGORY_SCHOOL, data, null));
    } catch (error) {
      dispatch(setAction(ActionType.SYSTEM_CONFIG_CATEGORY_SCHOOL, null, error));
    }
  };
}

export {
  ActionType,
  asyncRetrieveSystemConfigSlash,
  asyncRetrieveSystemConfigCategorySchool
}