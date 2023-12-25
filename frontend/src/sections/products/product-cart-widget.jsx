import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { getCart } from 'src/slices/cartSlice';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const cart = useSelector(getCart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      setTotal(cart.reduce((a, b) => a + b.amount, 0));
    }
  }, [cart]);

  return (
    <StyledRoot>
      <Badge showZero badgeContent={total} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </StyledRoot>
  );
}
