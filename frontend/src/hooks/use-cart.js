import { useState, useEffect } from 'react';

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
  const cartItemsAmnt = cart.reduce((a, b) => a + b.amount, 0);

  useEffect(() => {
    if (refresh) {
      // Function to fetch the cart token from AsyncStorage
      const getCart = async () => {
        const cartRaw = await cartService.cart();
        if (cartRaw !== null) {
          console.log(cartRaw);
          setCart(cartRaw.data);
        }
      };
      getCart();
      setRefresh(false);
    }
  }, [refresh]);

  const refreshCart = async () => {
    setRefresh(true);
  };

  return [cart, refreshCart, cartItemsAmnt];
};

export default useCart;
