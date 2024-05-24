import { useEffect, useState } from 'react';

import './TodoHome.css';
import { TodoApi } from '../../api';

const todoApi = new TodoApi();

const TodoListItem = ({ item, onCheck, onDelete }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={item.done}
        onChange={(event) => onCheck(event.currentTarget.checked)}
      />
      <p style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
        {item.text}
      </p>
      <button className="button-small" onClick={() => onDelete()}>
        x
      </button>
    </div>
  );
};

const CreateTodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  return (
    <div className="create-todo-form">
      <input
        placeholder="新しいTodo"
        size={60}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <button onClick={() => onSubmit(text)}>追加</button>
    </div>
  );
};

const ValueViewer = ({ value }) => {
  return (
    <pre className="value-viewer">{JSON.stringify(value, undefined, 2)}</pre>
  );
};

const TodoHome = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [showingDone, setShowingDone] = useState(true);

  const readTodoItems = async () => {
    setLoading(true);
    try {
      const items = await todoApi.readItems();
      setTodoItems(items);
    } catch (error) {
      console.error('Failed to read todo items:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTodoItem = async (text) => {
    try {
      await todoApi.createItem({ text, done: false });
      readTodoItems();
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  const updateTodoItem = async (newItem) => {
    try {
      await todoApi.updateItem(newItem);
      readTodoItems();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const deleteTodoItem = async (item) => {
    try {
      await todoApi.deleteItem(item.id);
      readTodoItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const filteredTodoItems = todoItems?.filter((item) => {
    if (!showingDone && item.done) {
      return false;
    }
    return item.text.includes(keyword);
  });

  useEffect(() => {
    (async () => await readTodoItems())();
  }, []);

  return (
    <div className="todo-container">
      <h1>ToDo</h1>

      <div className="todo-list-control">
        <input
          placeholder="キーワードフィルタ"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <input
          id="showing-done"
          type="checkbox"
          checked={showingDone}
          onChange={(event) => setShowingDone(event.target.checked)}
        />
        <label htmlFor="showing-done">完了したものも表示する</label>
        <button onClick={() => readTodoItems()}>更新</button>
      </div>

      {loading ? (
        <div className="dimmed">データを取得中です...</div>
      ) : filteredTodoItems?.length === 0 ? (
        <div className="dimmed">該当するToDoはありません</div>
      ) : (
        <div className="todo-list">
          {filteredTodoItems?.map((item) => (
            <TodoListItem
              key={item.id}
              item={item}
              onCheck={(checked) => updateTodoItem({ ...item, done: checked })}
              onDelete={() => deleteTodoItem(item)}
            />
          ))}
        </div>
      )}

      <CreateTodoForm onSubmit={(text) => createTodoItem(text)} />

      <ValueViewer
        value={{ keyword, todoItems, filteredTodoItems }}
      ></ValueViewer>
    </div>
  );
};

export default TodoHome;
