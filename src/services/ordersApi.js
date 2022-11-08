import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { url } from "../utils.";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
      });
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
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (body) => {
        return {
          url: "/",
          method: "post",
          data: body,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: build.mutation({
      query: ({ ...rest }) => {
        return {
          url: `/?filter=${rest.orderStatus}&page=${rest.page}`,
          method: "get",
        };
      },
      providesTags: "Orders",
    }),

    getSingleOrder: build.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "get",
        };
      },
    }),

    updateOrderStatus: build.mutation({
      query: ({ id, orderStatus }) => {
        return {
          url: `/${id}`,
          method: "patch",
          data: { orderStatus },
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersMutation,
  useGetSingleOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
