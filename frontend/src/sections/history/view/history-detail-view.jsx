import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { List, Divider, ListItem, ListItemText } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import historyService from 'src/services/history.service';

// ----------------------------------------------------------------------

export default function HistoryDetail() {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      await historyService.historyDetail({ id }).then((res) => {
        setCart(res.data.order_details);
        setData(res.data);
      });
    };
    loadProduct();
  });

  return (
    <Container>
      <Typography variant="h4">History Detail</Typography>
      <Typography>
        ID: {id} | Purchased at: {data === null ? '' : new Date(data.updated_at).toLocaleString()}
      </Typography>
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
    </Container>
  );
}
