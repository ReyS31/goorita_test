import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import useCart from 'src/hooks/use-cart';

// import { products } from 'src/_mock/products';
import productService from 'src/services/product.service';

import ProductCard from '../product-card';
import ProductCartWidget from '../product-cart-widget';
// ----------------------------------------------------------------------

export default function ProductsView() {
  // const [openFilter, setOpenFilter] = useState(false);
  // const [currLink, setCurrLink] = useState('');
  const [, refreshCart] = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.products({}).then((data) => {
      setProducts(data.data);
      refreshCart();
      // console.log(data.data);
    });
  }, [refreshCart]);

  // useEffect(() => {
  //   productService.products({ link: currLink }).then((data) => {
  //     setProducts(data.data);
  //   });
  // }, [currLink]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
