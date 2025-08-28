// src/components/ProductCard.js
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { addItem } from '../slices/cartSlice';
import { useThemeContext } from '../context/ThemeContext';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const { isDarkMode } = useThemeContext();

  // Debug log to check user state
  console.log('User state in ProductCard:', { user, loading });

  const handleAddToCart = () => {
    if (loading) {
      alert('Loading authentication state, please wait...');
      return;
    }
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    if (window.confirm('Are you sure you want to add this item to your cart?')) {
      dispatch(addItem(product));
      alert('Item added to cart!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card sx={{ height: '450px', width: '250px', display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: 2, backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="270px"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', padding: 1 }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, color: isDarkMode ? '#fff' : '#000' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap sx={{ textAlign: 'center' }}>
            {product.title}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ textAlign: 'center', mb: 1 }}>
            Price: ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ p: 1 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          fullWidth
          sx={{
            borderRadius: 1,
            backgroundColor: isDarkMode ? '#90caf9' : '#1976d2',
            '&:hover': {
              backgroundColor: isDarkMode ? '#bbdefb' : '#42a5f5',
            },
            color: isDarkMode ? '#000' : '#fff',
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;