import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGoodsMutation } from '../api/goodsApi';
import { Button, TextField, Typography, Card, CardContent } from '@mui/material';

const CreateGoods = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });
  const [createGoods, { isLoading, error }] = useCreateGoodsMutation();
  const navigate = useNavigate();

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
      await createGoods(formData).unwrap();
      console.log('CreateGoods: Successfully created good');
      navigate('/goods');
    } catch (err) {
      console.error('CreateGoods: Failed to create good:', err);
    }
  };

  return (
    <div className="page-container">
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h4" className="title">
            Create New Good
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
                {isLoading ? 'Creating...' : 'Create'}
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

export default CreateGoods;