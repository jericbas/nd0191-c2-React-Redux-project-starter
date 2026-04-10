import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authReducer from '../reducers/auth';
import usersReducer from '../reducers/users';

// Mock store with test data here
const createMockStore = () => {
  return configureStore({
    reducer: {
      authedUser: authReducer,
      users: usersReducer,
    },
    preloadedState: {
      authedUser: null,
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: '/avatars/sarah.jpg',
          answers: {},
          questions: [],
        },
        johndoe: {
          id: 'johndoe',
          name: 'John Doe',
          avatarURL: '/avatars/john.jpg',
          answers: {},
          questions: [],
        },
      },
    },
  });
};

describe('Login', () => {
  test('renders login form with heading', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Employee Polls')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders user select dropdown with option', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const selectElement = screen.getByTestId('user-select');
    expect(selectElement).toBeInTheDocument();
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('renders submit button that are disabled initially', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = screen.getByTestId('login-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button when user are selected', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const selectElement = screen.getByTestId('user-select');
    const submitButton = screen.getByTestId('login-button');

    fireEvent.change(selectElement, { target: { value: 'sarahedo' } });
    expect(submitButton).not.toBeDisabled();
  });

  test('Login form match snapshot', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(container.querySelector('.login-container')).toMatchSnapshot();
  });
});
