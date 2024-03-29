import axios from "axios";
import { authHeader } from "../_helpers";
import apiValues from "../apiValues";

const baseURL = "https://learning-tool-backend.herokuapp.com";
//const baseURL =  "http://localhost:1337"
const api = axios.create({ baseURL });

const getAllBuilder = (routeName) =>
  function getAll() {
    // pegar rota
    return api({
      method: "get",
      url: `/${routeName.toLowerCase().replace(/_/g, "-")}`,
      headers: authHeader(),
    }).then(handleResponse);
  };

const getByIdBuilder = (routeName) =>
  function getById(id) {
    return api({
      method: "get",
      url: `/${routeName.toLowerCase().replace(/_/g, "-")}/${id}`,
      headers: authHeader(),
    }).then(handleResponse);
  };

const findBuilder = (routeName) =>
  function find(data) {
    return api({
      method: "get",
      url: `/${routeName.toLowerCase().replace(/_/g, "-")}`,
      headers: authHeader(),
      query: data,
    }).then(handleResponse);
  };

const createBuilder = (routeName) =>
  function create(data) {
    return api({
      method: "post",
      url: `/${routeName.toLowerCase().replace(/_/g, "-")}`,
      headers: authHeader(),
      data: data,
    }).then(handleResponse);
  };

const updateBuilder = (routeName) =>
  function update(data) {
    return api({
      method: "put",
      url: `/${routeName.toLowerCase().replace(/_/g, "-")}/${data.id}`,
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      data: data,
    }).then(handleResponse);
  };

const deleteBuilder = (routeName) =>
  function _delete(id) {
    return api({
      method: "delete",
      url: `/${routeName.toLowerCase().replace(/_/g, "-")}/${id}`,
      headers: authHeader(),
    }).then(handleResponse);
  };

function handleResponse(response) {
  if (response.status !== 200) {
    if (response.status === 401) {
      window.location.reload();
    }
    return Promise.reject(response.statusText);
  }

  return response.data;
}

let apiServices = {};

apiValues.map(
  (apiDataType) =>
    (apiServices[`${apiDataType}`] = {
      getAll: getAllBuilder(apiDataType),
      getById: getByIdBuilder(apiDataType),
      find: findBuilder(apiDataType),
      create: createBuilder(apiDataType),
      update: updateBuilder(apiDataType),
      delete: deleteBuilder(apiDataType),
    })
);

export { apiServices, baseURL };
export default api;
