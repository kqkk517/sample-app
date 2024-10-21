import { render, screen } from '@testing-library/react';
import { Home } from '../components';

const mockTodoApi = () => {
  const items = [
    { id: 1, text: 'Todo Task', done: false },
    { id: 2, text: 'Done Task', done: true },
  ];

  jest.mock('../utils/api', () => {
    return {
      TodoApi: jest.fn().mockImplementation(() => ({
        readItems: jest.fn(() => Promise.resolve(items)),
        readItem: jest.fn((id) =>
          Promise.resolve(items.find((item) => item.id === id))
        ),
        createItem: jest.fn((item) => Promise.resolve({ id: 3, ...item })),
        updateItem: jest.fn((item) => Promise.resolve(item)),
        deleteItem: jest.fn((id) =>
          Promise.resolve(items.find((item) => item.id === id))
        ),
      })),
    };
  });
};

describe('Test TodoHome Component', () => {
  beforeEach(() => {
    mockTodoApi();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render update button', async () => {
    render(<Home />);

    const buttons = screen.getAllByRole('button');

    const updateButton = buttons.find(
      (button) => button.textContent === '更新'
    );
    expect(updateButton).toBeInTheDocument();
  });
});
