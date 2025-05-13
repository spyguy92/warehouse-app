import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card, CardContent } from '@mui/material';

const LandingPage = () => {
  const navigate = useNavigate();

  console.log('LandingPage: Component rendered');

  return (
    <div className="page-container">
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h4" className="title">
            Welcome to Warehouse
          </Typography>
          <Typography variant="body1" className="subtitle">
            Manage your inventory with ease. Login or register to get started.
          </Typography>
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log('LandingPage: Navigating to /login');
                navigate('/login');
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                console.log('LandingPage: Navigating to /register');
                navigate('/register');
              }}
            >
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;