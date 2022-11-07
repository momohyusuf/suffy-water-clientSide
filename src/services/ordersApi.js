import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { url } from "../utils.";

axios.defaults.withCredentials = true;
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export const ordersApi = createApi({
  reducerPath: "orderApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${url}/api/v1/orders`,
  }),
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (body) => {
        return {
          url: "/",
          method: "post",
          data: body,
        };
      },
    }),
    getAllOrders: build.mutation({
      query: ({ ...rest }) => {
        return {
          url: `/?filter=${rest.orderStatus}&page=${rest.page}`,
          method: "GET",
        };
      },
    }),

    getSingleOrder: build.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
    }),

    updateOrderStatus: build.mutation({
      query: ({ id, orderStatus }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          data: { orderStatus },
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersMutation,
  useGetSingleOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
