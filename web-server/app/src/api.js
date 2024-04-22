import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';
axios.defaults.baseURL = 'http://localhost:8000/';

export class TodoApi {
  /** ToDoを全て取得する */
  readItems = async () => {
    return axios
      .get('/api/todo/get/all')
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  /** 指定したidのToDoを取得する */
  readItem = async (id) => {
    return axios
      .get(`/api/todo/get/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  /** ToDoを新規作成する */
  createItem = async (item) => {
    return axios
      .post('/api/todo/create', item)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  /** ToDoを更新する */
  updateItem = async (item) => {
    return axios
      .put('/api/todo/update', item)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  /** 指定したidのToDoを削除する */
  deleteItem = async (id) => {
    return axios
      .delete(`/api/todo/delete/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };
}
