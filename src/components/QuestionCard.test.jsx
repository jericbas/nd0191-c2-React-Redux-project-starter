import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuestionCard from './QuestionCard';

describe('QuestionCard', () => {
  const mockQuestion = {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'Build with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build with Typescript',
    },
  };

  const mockAuthor = {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: '/avatars/sarahedo.jpg',
  };

  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders question author name', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
  });

  it('renders question preview text', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Would you rather/)).toBeInTheDocument();
    expect(screen.getByText(/Build with Javascript/)).toBeInTheDocument();
    expect(screen.getByText(/Build with Typescript/)).toBeInTheDocument();
  });

  it('has link to question detail', () => {
    render(
      <BrowserRouter>
        <QuestionCard question={mockQuestion} author={mockAuthor} />
      </BrowserRouter>
    );
    const link = screen.getByTestId('show-button');
    expect(link).toHaveAttribute('href', '/questions/8xf0y6ziyjabvozdd253nd');
  });
});
