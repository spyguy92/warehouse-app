import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoodsPage from './pages/GoodsPage';
import GoodsFormPage from './pages/GoodsFormPage';
import EditGoods from './components/EditGoods';
import LandingPage from './components/LandingPage';
import './styles/global.css';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Dark blue
    },
    secondary: {
      main: '#455a64', // Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    body1: {
      color: '#455a64',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '12px 24px',
          fontSize: '1.1rem',
          transition: 'transform 0.2s ease, background-color 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/goods/create" element={<GoodsFormPage />} />
        <Route path="/goods/edit/:id" element={<EditGoods />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;