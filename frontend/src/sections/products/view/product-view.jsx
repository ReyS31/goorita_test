import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import useCart from 'src/hooks/use-cart';

import { fCurrency } from 'src/utils/format-number';

import cartService from 'src/services/cart.service';

import ProductCard from '../product-card';
import ProductCartWidget from '../product-cart-widget';
// ----------------------------------------------------------------------

ProductView.propTypes = {
  product: PropTypes.any,
  suggested: PropTypes.any,
};

export default function ProductView({ product, suggested }) {
  const [cart, refreshCart] = useCart();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (cart.length > 0) {
      const cartItem = cart.find((item) => item.product.id === product.id);
      if (cartItem) {
        setAmount(cartItem.amount);
      }
    }
  }, [cart, product]);

  const addToCart = async () => {
    cartService
      .addToCart({ amount, product_id: product.id })
      .then((res) => refreshCart({}))
      .catch((e) => alert(e.response.data.msg));
  };

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'relative',
      }}
    />
  );

  const renderName = <Typography variant="h4">{product.name}</Typography>;

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  const renderButton = (
    <Stack direction="row" sx={{ mt: 5 }}>
      <Button onClick={(e) => setAmount((a) => (a > 1 ? a - 1 : 1))}>-</Button>
      <Button>{amount}</Button>
      <Button onClick={(e) => setAmount((a) => a + 1)}>+</Button>
    </Stack>
  );

  const renderAddToCart = (
    <Button variant="contained" sx={{ mt: 2 }} onClick={addToCart}>
      Add to cart
    </Button>
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Product
      </Typography>

      <Stack direction="row" sx={{ mb: 5 }}>
        <Box sx={{ position: 'relative' }}>{renderImg}</Box>

        <Stack
          direction="column"
          sx={{
            ml: 10,
          }}
        >
          {renderName}
          {renderPrice}

          {renderButton}
          {renderAddToCart}
        </Stack>
      </Stack>

      <Typography variant="h6" sx={{ mt: 5 }}>
        Suggested
      </Typography>
      <Grid container spacing={3}>
        {suggested.map((sgsd) => (
          <Grid key={sgsd.id} xs={12} md={4}>
            <ProductCard product={sgsd} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
