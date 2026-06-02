import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllOrdersResponse, MessageResponse, NewOrderRequest, updateOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({ url: "new", method: "POST", body: order }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation<MessageResponse, updateOrderRequest>({
  query: ({ userId, orderId }) => ({
    url: `${userId}/${orderId}`,
    method: "PUT",
  }),
  invalidatesTags: ["Order"],
}),
     myOrder: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Order"],
    }),
    orderDetails: builder.query<AllOrdersResponse, string>({
      query: (id) => id,
      providesTags: ["Order"],
    }),
  }),
});

export const { useNewOrderMutation, useMyOrderQuery, useOrderDetailsQuery } = orderApi;
