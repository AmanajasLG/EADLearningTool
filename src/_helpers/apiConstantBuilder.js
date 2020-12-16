export const apiConstantBuilder = apiDataType => {
  return {
    UPDATE_REQUEST: `${apiDataType}_UPDATE_REQUEST`,
    UPDATE_SUCCESS: `${apiDataType}_UPDATE_SUCCESS`,
    UPDATE_FAILURE: `${apiDataType}_UPDATE_FAILURE`,

    CREATE_REQUEST: `${apiDataType}_CREATE_REQUEST`,
    CREATE_SUCCESS: `${apiDataType}_CREATE_SUCCESS`,
    CREATE_FAILURE: `${apiDataType}_CREATE_FAILURE`,

    GETALL_REQUEST: `${apiDataType}_GETALL_REQUEST`,
    GETALL_SUCCESS: `${apiDataType}_GETALL_SUCCESS`,
    GETALL_FAILURE: `${apiDataType}_GETALL_FAILURE`,

    GETBYID_REQUEST: `${apiDataType}_GETBYID_REQUEST`,
    GETBYID_SUCCESS: `${apiDataType}_GETBYID_SUCCESS`,
    GETBYID_FAILURE: `${apiDataType}_GETBYID_FAILURE`,

    DELETE_REQUEST: `${apiDataType}_DELETE_REQUEST`,
    DELETE_SUCCESS: `${apiDataType}_DELETE_SUCCESS`,
    DELETE_FAILURE: `${apiDataType}_DELETE_FAILURE`,
  }
}
