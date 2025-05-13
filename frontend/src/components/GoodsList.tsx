import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteGoodsMutation } from '../api/goodsApi';
import { Button, Typography, Card, CardContent } from '@mui/material';

interface Goods {
  id: number;
  name: string;
  quantity: number;
  price: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const GoodsList = () => {
  console.log('GoodsList: Component mounted');
  const [manualGoods, setManualGoods] = useState<Goods[]>([]);
  const [manualError, setManualError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteGoods] = useDeleteGoodsMutation();
  const navigate = useNavigate();

  const fetchGoods = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('GoodsList: No token found, redirecting to login');
      navigate('/login');
      return;
    }
    setIsLoading(true);
    console.log('GoodsList: Starting manual fetch', {
      apiUrl: process.env.REACT_APP_API_URL || 'http://backend:3000',
      token: token.slice(0, 10) + '...',
    });
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://backend:3000'}/goods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('GoodsList: Manual fetch response', {
        status: res.status,
        ok: res.ok,
      });
      if (res.status === 401) {
        console.error('GoodsList: Unauthorized, redirecting to login');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const data = await res.json();
      console.log('GoodsList: Manual fetch result:', data);
      if (Array.isArray(data)) {
        setManualGoods(data);
        setManualError(null);
      } else {
        setManualError('Invalid data format');
      }
    } catch (err: any) {
      console.error('GoodsList: Manual fetch error:', err.message);
      setManualError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoods();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    try {
      await deleteGoods(id).unwrap();
      console.log('GoodsList: Successfully deleted good with id:', id);
      window.location.reload();
    } catch (err) {
      console.error('GoodsList: Failed to delete good:', err);
      setManualError('Failed to delete good');
    }
  };

  console.log('GoodsList state:', { isLoading, manualGoods, manualError });

  return (
    <div className="page-container">
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h4" className="title">
            Goods List
          </Typography>
          {isLoading && (
            <div className="form">
              <Typography className="subtitle">Loading goods...</Typography>
              <Button variant="contained" color="primary" onClick={fetchGoods}>
                Retry
              </Button>
            </div>
          )}
          {manualError && (
            <div className="form">
              <Typography color="error" className="subtitle">
                Error: {manualError}
              </Typography>
              <Button variant="contained" color="primary" onClick={fetchGoods}>
                Retry
              </Button>
            </div>
          )}
          {!isLoading && !manualError && (
            <div className="list">
              {manualGoods.length === 0 && (
                <Typography className="subtitle">No goods available.</Typography>
              )}
              {manualGoods.map((item) => (
                <div key={item.id} className="list-item">
                  <Typography className="subtitle">
                    {item.name} - {item.quantity} units, ${item.price}
                  </Typography>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate(`/goods/edit/${item.id}`, { state: { good: item } })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/goods/create')}
              >
                Create New
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoodsList;