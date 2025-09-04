import http from "./http";

const BASE_URL = "https://kdt-api.fe.dev-cos.com/documents";
const HEADERS = {
  "x-username": "update_notion",
};

const getList = () => http.get(BASE_URL, HEADERS);

const get = (id) => http.get(`${BASE_URL}/${id}`, HEADERS);

const create = ({ title = "새 페이지", parent = null }) =>
  http.post(BASE_URL, HEADERS, { title, parent });

const update = () => {};

const del = (id) => http.delete(`${BASE_URL}/${id}`, HEADERS);

export default { getList, get, create, update, del };
