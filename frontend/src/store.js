import { configureStore } from '@reduxjs/toolkit'

// Import the API object
import { api } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    // Add the generated RTK Query "API slice" caching reducer
    [api.reducerPath]: api.reducer,
  },
  // Add the RTK Query API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})