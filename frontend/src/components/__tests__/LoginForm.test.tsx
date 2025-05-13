import { render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('renders login form', () => {
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});