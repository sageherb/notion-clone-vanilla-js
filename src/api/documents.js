import http from "./http";

const BASE_URL = "https://kdt-api.fe.dev-cos.com/documents";
const HEADERS = {
  "x-username": "update_notion",
};

const getList = () => http.get(BASE_URL, HEADERS);

const get = () => {};

const create = () => {};

const update = () => {};

const del = () => {};

export default { getList, get, create, update, del };
