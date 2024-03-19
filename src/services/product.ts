import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SalesRow = {
  weekEnding: string,
  retailSales: number,
  wholesaleSales: number,
  unitsSold: number,
  retailerMargin: number,
}

export type Product = {
  image: string,
  title: string,
  tags: string[],
  sales: SalesRow[],
  subtitle: string
}

export const productApi = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProductById: builder.query<Product[], string>({
      query: id => `product/${id}.json`,
    }),
  }),
})

export const { useGetProductByIdQuery } = productApi;
