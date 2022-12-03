import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    isOpen: false,
    message: '',
    order: null,
  },
  isLoading: false,
  alert: {
    showAlert: false,
    message: '',
  },
  orderAlert: {
    alert: false,
    message: '',
  },
  orders: null,
  orderStatus: '',
  orderId: '',
  page: 1,
  showSearchOrderById: false,
  singleOrder: {
    isShown: false,
    order: null,
  },
  isSidebarOpen: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modal = action.payload;
    },
    toggleIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleAlert: (state, action) => {
      state.alert = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    toggleOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    toggleShowSearchOrderById: (state, action) => {
      state.showSearchOrderById = action.payload;
    },
    toggleOrderAlert: (state, action) => {
      state.orderAlert = action.payload;
    },
    updateSingleOrder: (state, action) => {
      state.singleOrder = action.payload;
    },
    updateOrders: (state, action) => {
      state.orders = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const {
  toggleModal,
  toggleIsLoading,
  toggleAlert,
  toggleShowSearchOrderById,
  updateSingleOrder,
  toggleSidebar,
  toggleOrderStatus,
  updateOrders,
  updatePage,
  updateOrderId,
  toggleOrderAlert,
} = orderSlice.actions;
export default orderSlice.reducer;
