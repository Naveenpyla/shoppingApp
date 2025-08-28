// src/pages/ProductDetails.js
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../slices/cartSlice';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );
  const dispatch = useDispatch();

  if (!product) return <Typography variant="h6">Product not found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          padding: 2,
          maxWidth: 800,
          margin: '0 auto',
          boxShadow: 3
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            width: { xs: '100%', md: 300 },
            height: 300,
            objectFit: 'contain',
            borderRadius: 2
          }}
        />
        <Box sx={{ ml: { md: 3 }, mt: { xs: 2, md: 0 }, flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="primary">
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {product.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="success"
              onClick={() => dispatch(addItem(product))}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Container>
  );
};

export default ProductDetails;