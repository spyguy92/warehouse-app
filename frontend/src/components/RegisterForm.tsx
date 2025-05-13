import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/authApi';
import { Button, TextField, Typography, Card, CardContent } from '@mui/material';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register({ email, password }).unwrap();
      console.log('RegisterPage: Storing credentials:', response);
      localStorage.setItem('token', response.access_token);
      navigate('/goods');
    } catch (err) {
      console.error('RegisterPage: Registration failed:', err);
    }
  };

  return (
    <div className="page-container">
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h4" className="title">
            Register
          </Typography>
          {error && (
            <Typography color="error" className="subtitle">
              Error: {JSON.stringify(error)}
            </Typography>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;