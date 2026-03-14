import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import Login from './Login';
import reducers from '../reducers';

const preloadedState = {
  users: {
    sarahedo: { id: 'sarahedo', name: 'Sarah Edo' },
    tylermcginnis: { id: 'tylermcginnis', name: 'Tyler McGinnis' },
  },
  authedUser: null,
};

const store = createStore(reducers, preloadedState);

describe('Login', () => {
  it('renders login form with user select', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Employee Polls')).toBeInTheDocument();
    expect(screen.getByTestId('user-select')).toBeInTheDocument();
  });
});
