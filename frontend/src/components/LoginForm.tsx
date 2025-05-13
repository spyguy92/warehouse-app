import { useLoginMutation } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 300px;
  margin: 0 auto;
`;

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ access_token: response.access_token, user: { email } }));
      navigate('/goods');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField label="Email" name="email" type="email" required />
      <TextField label="Password" name="password" type="password" required />
      <Button type="submit" variant="contained" disabled={isLoading}>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;