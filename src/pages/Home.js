// src/pages/Home.js
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { items: products, status, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get('search') || '';
    setSearchTerm(term);
  }, [location.search]);

  if (status === 'loading') return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
  if (status === 'failed') return <Typography color="error" align="center" style={{ marginTop: '20%' }}>Error: {error}</Typography>;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;