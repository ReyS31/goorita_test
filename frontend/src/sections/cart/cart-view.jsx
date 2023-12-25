import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { List, Stack, Button, Divider, ListItem, ListItemText } from '@mui/material';

import useCart from 'src/hooks/use-cart';

import { fCurrency } from 'src/utils/format-number';

import { getCart } from 'src/slices/cartSlice';
import cartService from 'src/services/cart.service';

// ----------------------------------------------------------------------

export default function CartView() {
  const [, refreshCart] = useCart();
  const cart = useSelector(getCart);

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkOut = () => {
    cartService.checkout().then(() => refreshCart());
  };

  const renderCheckoutBtn = (
    <Button variant="contained" sx={{ mt: 2 }} onClick={checkOut}>
      Checkout
    </Button>
  );

  return (
    <Container>
      <Typography variant="h4">Cart</Typography>
      <List aria-label="cart list">
        {cart.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={<Typography>{fCurrency(item.total)}</Typography>}
          >
            <ListItemText primary={`${item.product.name} x ${item.amount}`} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem
        secondaryAction={
          <Typography>{fCurrency(cart.reduce((a, b) => a + b.total, 0))}</Typography>
        }
      >
        <ListItemText primary="Total" />
      </ListItem>
      <Stack direction="row" justifyContent="end">
        {renderCheckoutBtn}
      </Stack>
    </Container>
  );
}
