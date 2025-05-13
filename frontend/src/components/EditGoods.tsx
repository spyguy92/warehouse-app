import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateGoodsMutation } from '../api/goodsApi';
import { Button, TextField, Typography, Card, CardContent } from '@mui/material';

interface Goods {
  id: number;
  name: string;
  quantity: number;
  price: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const EditGoods = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [updateGoods, { isLoading, error }] = useUpdateGoodsMutation();
  const good: Goods | undefined = location.state?.good;
  const [formData, setFormData] = useState({
    name: good?.name || '',
    quantity: good?.quantity || 0,
    price: good?.price || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateGoods({ id: Number(id), ...formData }).unwrap();
      console.log('EditGoods: Successfully updated good:', id);
      navigate('/goods');
    } catch (err) {
      console.error('EditGoods: Failed to update good:', err);
    }
  };

  if (!good) {
    return (
      <div className="page-container">
        <Card className="card">
          <CardContent className="card-content">
            <Typography color="error" className="subtitle">
              No good data found. Please select a good to edit from the list.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h4" className="title">
            Edit Good
          </Typography>
          {error && (
            <Typography color="error" className="subtitle">
              Error: {JSON.stringify(error)}
            </Typography>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
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
                {isLoading ? 'Updating...' : 'Update'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/goods')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditGoods;