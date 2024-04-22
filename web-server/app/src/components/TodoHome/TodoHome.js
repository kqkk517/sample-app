import { useState } from 'react';

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
  const [keyword, setKeyword] = useState('');
  const [showingDone, setShowingDone] = useState(true);

  const reloadTodoItems = async () => {
    setTodoItems(null);
    setTodoItems(await todoApi.readItems());
  };

  const filteredTodoItems = todoItems?.filter((item) => {
    if (!showingDone && item.done) {
      return false;
    }
    return item.text.includes(keyword);
  });

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
        <button onClick={() => reloadTodoItems()}>更新</button>
      </div>

      {filteredTodoItems === undefined ? (
        <div className="dimmed">データを取得中です...</div>
      ) : filteredTodoItems?.length === 0 ? (
        <div className="dimmed">該当するToDoはありません</div>
      ) : (
        <div className="todo-list">
          {filteredTodoItems?.map((item) => (
            <TodoListItem
              key={item.id}
              item={item}
              onCheck={async (checked) => {
                await todoApi.updateItem({ ...item, done: checked });
                reloadTodoItems();
              }}
              onDelete={async () => {
                await todoApi.deleteItem(item.id);
                reloadTodoItems();
              }}
            />
          ))}
        </div>
      )}

      <CreateTodoForm
        onSubmit={async (text) => {
          await todoApi.createItem({ text, done: false });
          reloadTodoItems();
        }}
      />

      <ValueViewer
        value={{ keyword, todoItems, filteredTodoItems }}
      ></ValueViewer>
    </div>
  );
};

export default TodoHome;