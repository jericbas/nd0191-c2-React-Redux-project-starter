import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuestionCard from './QuestionCard';

const mockQuestion = {
  id: 'q1',
  optionOne: {
    text: 'Learn React',
    votes: ['user1'],
  },
  optionTwo: {
    text: 'Learn Vue',
    votes: ['user2'],
  },
  author: 'sarahedo',
  timestamp: 1775839478000,
};

const mockAuthor = {
  id: 'sarahedo',
  name: 'Sarah Edo',
  avatarURL: 'https://avatars.miraheze.org/avatar/SarahEdo.jpg',
  answers: {},
  questions: [],
};

describe('QuestionCard', () => {
  test('renders the question card', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    const card = screen.getByTestId('question-card');
    expect(card).toBeInTheDocument();
  });

  test('displays author name', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
  });

  test('displays "Would you rather..." text', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(screen.getByText('Would you rather...')).toBeInTheDocument();
  });

  test('displays both question options in preview', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Learn React/)).toBeInTheDocument();
    expect(screen.getByText(/Learn Vue/)).toBeInTheDocument();
  });

  test('renders "Show" button linking to question details', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    const showButton = screen.getByTestId('show-button');
    expect(showButton).toBeInTheDocument();
    expect(showButton).toHaveAttribute('href', '/questions/q1');
  });

  test('QuestionCard matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(container.querySelector('.question-card')).toMatchSnapshot();
  });
});
