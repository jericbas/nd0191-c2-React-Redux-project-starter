import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import NewPoll from './NewPoll';
import authReducer from '../reducers/auth';
import usersReducer from '../reducers/users';
import questionsReducer from '../reducers/questions';

// Mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      authedUser: authReducer,
      users: usersReducer,
      questions: questionsReducer,
    },
    preloadedState: {
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: '/avatars/sarah.jpg',
          answers: {},
          questions: [],
        },
      },
      questions: {},
    },
  });
};

describe('NewPoll', () => {
  test('renders the NewPoll form with heading', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Would You Rather')).toBeInTheDocument();
    expect(screen.getByText('Create Your Own Poll')).toBeInTheDocument();
  });

  test('renders form with two input fields', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('option-one-input')).toBeInTheDocument();
    expect(screen.getByTestId('option-two-input')).toBeInTheDocument();
  });

  test('renders submit button that is disabled initially', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = screen.getByTestId('submit-poll');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button when both options are filled in', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    const optionOneInput = screen.getByTestId('option-one-input');
    const optionTwoInput = screen.getByTestId('option-two-input');
    const submitButton = screen.getByTestId('submit-poll');

    fireEvent.change(optionOneInput, { target: { value: 'Build with React' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Build with Vue' } });

    expect(submitButton).not.toBeDisabled();
  });

  test('keeps submit button disabled if only one option is filled', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    const optionOneInput = screen.getByTestId('option-one-input');
    const submitButton = screen.getByTestId('submit-poll');

    fireEvent.change(optionOneInput, { target: { value: 'Build with React' } });

    expect(submitButton).toBeDisabled();
  });

  test('NewPoll form matches snapshot', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(container.querySelector('.new-poll')).toMatchSnapshot();
  });
});
