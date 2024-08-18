import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get.Accept = 'application/json';
axios.defaults.baseURL = 'http://localhost:8000/';

export class TodoApi {
  /** ToDoを全て取得する */
  readItems = async () => {
    try {
      const response = await axios.get('/api/v1/todos');
      return response.data;
    } catch (error) {
      console.error('Failed to read items:', error);
      throw new Error('Failed to read items');
    }
  };

  /** 指定したidのToDoを取得する */
  readItem = async (id) => {
    try {
      const response = await axios.get(`/api/v1/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to read item with id ${id}:`, error);
      throw new Error(`Failed to read item with id ${id}`);
    }
  };

  /** ToDoを新規作成する */
  createItem = async (item) => {
    try {
      const response = await axios.post('/api/v1/todos', item);
      return response.data;
    } catch (error) {
      console.error('Failed to create item:', error);
      throw new Error('Failed to create item');
    }
  };

  /** ToDoを更新する */
  updateItem = async (item) => {
    try {
      const response = await axios.put('/api/v1/todos', item);
      return response.data;
    } catch (error) {
      console.error('Failed to update item:', error);
      throw new Error('Failed to update item');
    }
  };

  /** 指定したidのToDoを削除する */
  deleteItem = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete item with id ${id}:`, error);
      throw new Error(`Failed to delete item with id ${id}`);
    }
  };
}
