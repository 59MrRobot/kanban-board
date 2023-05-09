import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

test('App renders correctly', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const inputElement = screen.getByLabelText('Enter repo URL');
  expect(inputElement).toBeInTheDocument();
})