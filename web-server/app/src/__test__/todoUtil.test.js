import { todoUtil } from '../utils/todoUtil';

const todoItems = [
  { id: 1, text: 'メモリーズ', done: false },
  { id: 2, text: 'メモリーズ・カスタム', done: true },
  { id: 3, text: '三日月ロック その3', done: false },
  { id: 4, text: '夜を駆ける', done: false },
];

describe('Test filterTodoItems', () => {
  test('filter todo items by the keyword', () => {
    const result = todoUtil.filterTodoItems(todoItems, 'メモリーズ', true);
    expect(result).toEqual([
      { id: 1, text: 'メモリーズ', done: false },
      { id: 2, text: 'メモリーズ・カスタム', done: true },
    ]);
  });

  test('remove done tasks', () => {
    const result = todoUtil.filterTodoItems(todoItems, '', false);
    expect(result).toEqual([
      { id: 1, text: 'メモリーズ', done: false },
      { id: 3, text: '三日月ロック その3', done: false },
      { id: 4, text: '夜を駆ける', done: false },
    ]);
  });

  test('return an empty array when no item including the keyword exists', () => {
    const result = todoUtil.filterTodoItems(todoItems, '夜に駆ける', true);
    expect(result).toEqual([]);
  });

  test('return all tasks', () => {
    const result = todoUtil.filterTodoItems(todoItems, '', true);
    expect(result).toEqual([
      { id: 1, text: 'メモリーズ', done: false },
      { id: 2, text: 'メモリーズ・カスタム', done: true },
      { id: 3, text: '三日月ロック その3', done: false },
      { id: 4, text: '夜を駆ける', done: false },
    ]);
  });
});
