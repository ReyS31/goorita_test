import { configureStore } from '@reduxjs/toolkit';

// Import the API object
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    // Add the generated RTK Query "API slice" caching reducer
    cart: cartReducer,
  },
  // Add the RTK Query API middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
