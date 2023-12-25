import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { updateData } from 'src/slices/cartSlice';
import cartService from 'src/services/cart.service';

// Define your custom hook
const useCart = () => {
  // {
  //     id: 0,
  //     amount: 0,
  //     total: 0,
  //     product: {
  //       id: 24,
  //       name: 'Zella Shanahan',
  //       price: 82793,
  //       image: 'https://picsum.photos/200',
  //     },
  //   },

  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (refresh) {
      // Function to fetch the cart token from AsyncStorage
      const getCart = async () => {
        const cartRaw = localStorage.getItem('cart');
        if (cartRaw !== null) {
          setCart(JSON.parse(cartRaw));
        }
      };
      getCart();
      setRefresh(false);
    }
  }, [refresh]);

  const refreshCart = async () => {
    const cartRaw = await cartService.cart();
    localStorage.setItem('cart', JSON.stringify(cartRaw.data));
    dispatch(updateData(cartRaw.data));
    setRefresh(true);
  };

  return [cart, refreshCart];
};

export default useCart;
