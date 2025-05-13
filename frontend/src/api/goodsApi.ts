import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Goods {
  id: number;
  name: string;
  quantity: number;
  price: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

console.log('goodsApi: Initializing with REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://backend:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      console.log('Goods API: Preparing headers', {
        baseUrl: process.env.REACT_APP_API_URL || 'http://backend:3000',
        token: token ? token.slice(0, 10) + '...' : null,
      });
      if (!process.env.REACT_APP_API_URL) {
        console.error('Goods API: REACT_APP_API_URL is undefined, using fallback: http://backend:3000');
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.log('Goods API: No token found');
      }
      return headers;
    },
    timeout: 10000,
  }),
  endpoints: (builder) => ({
    createGoods: builder.mutation({
      query: (goods) => ({
        url: '/goods',
        method: 'POST',
        body: goods,
      }),
    }),
    updateGoods: builder.mutation({
      query: ({ id, ...goods }) => ({
        url: `/goods/${id}`,
        method: 'PUT',
        body: goods,
      }),
    }),
    deleteGoods: builder.mutation({
      query: (id) => ({
        url: `/goods/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateGoodsMutation, useUpdateGoodsMutation, useDeleteGoodsMutation } = goodsApi;