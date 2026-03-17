import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const dummy = 1;

describe('Login', () => {
  test('dummy test for fireEvent', () => {
    const button = document.createElement('button');
    button.addEventListener('click', () => { dummy = 2; });
    fireEvent.click(button);
    expect(dummy).toBe(1);
  });
});
