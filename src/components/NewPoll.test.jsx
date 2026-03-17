import React from 'react';
import { render } from '@testing-library/react';

describe('NewPoll', () => {
  test('dummy snapshot test', () => {
    const { container } = render(<div>New Poll</div>);
    expect(container).toMatchSnapshot();
  });
});
