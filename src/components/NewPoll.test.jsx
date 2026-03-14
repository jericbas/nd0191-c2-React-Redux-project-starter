import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import NewPoll from './NewPoll';
import reducers from '../reducers';

const store = createStore(reducers, {
  authedUser: 'sarahedo',
  users: {},
  questions: {},
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('NewPoll', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders form with two inputs', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('option-one-input')).toBeInTheDocument();
    expect(screen.getByTestId('option-two-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-poll')).toBeInTheDocument();
  });

  it('updates inputs on change using fireEvent', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    const optionOne = screen.getByTestId('option-one-input');
    const optionTwo = screen.getByTestId('option-two-input');

    fireEvent.change(optionOne, { target: { value: 'Learn React' } });
    fireEvent.change(optionTwo, { target: { value: 'Learn Vue' } });

    expect(optionOne).toHaveValue('Learn React');
    expect(optionTwo).toHaveValue('Learn Vue');
  });

  it('disables submit when inputs are empty', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('submit-poll')).toBeDisabled();
  });

  it('enables submit when both inputs have values', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    const optionOne = screen.getByTestId('option-one-input');
    const optionTwo = screen.getByTestId('option-two-input');

    fireEvent.change(optionOne, { target: { value: 'Option A' } });
    fireEvent.change(optionTwo, { target: { value: 'Option B' } });

    expect(screen.getByTestId('submit-poll')).not.toBeDisabled();
  });
});
