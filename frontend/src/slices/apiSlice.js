import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: 'http://localhost:8000/api/user',
  }),
  endpoints: (build) => ({
    getCart: build.query({
      query: () => '/cart',
    }),
  }),
});

export const { useGetCartQuery } = api;
