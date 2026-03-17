import React from 'react';
import { render } from '@testing-library/react';

describe('QuestionCard', () => {
  test('dummy snapshot test', () => {
    const { container } = render(<div>Question Card</div>);
    expect(container).toMatchSnapshot();
  });
});
