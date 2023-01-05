import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useGetAllOrdersMutation,
  useGetSingleOrderMutation,
} from '../../services/ordersApi';
import {
  updateSingleOrder,
  updateOrders,
  toggleOrderAlert,
} from '../../features/order/orderSlice';
import SingleOrder from './single-order-details/SingleOrder';
import PreloaderLarge from '../preloaders/PreloaderLarge';

import Pagination from './pagination/Pagination';
import SearchOrderWithID from './search-for-order/SearchOrderWithID';
import FetchingSingleOrderInformationAlert from '../FetchingSingleOrderInformationAlert';
import OrderStats from './order-stats/OrderStats';
import OrdersTable from './ordersTable/OrdersTable';

// import useSWR from 'swr';
// import { url } from '../../utils.';
// import axios from 'axios';
// const fetcher = async (endpoint) => {
//   const { data } = await axios.get(`${url}/api/v1/orders/${endpoint}`, {
//     withCredentials: true,
//   });

//   return data;
// };

const AdminPageContent = () => {
  const [ordersStats, setOrdersStats] = useState(null);
  const { orderAlert } = useSelector((state) => state.order);
  const { singleOrder, orderStatus, orders, page, showSearchOrderById } =
    useSelector((state) => state.order);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [getAllOrdersMutation] = useGetAllOrdersMutation();
  const [getSingleOrderMutation] = useGetSingleOrderMutation();
  const dispatch = useDispatch();

  // ++++++++++++++++++++++++++++
  const getAllOrders = async () => {
    setLoadingOrders(true);
    const { data } = await getAllOrdersMutation({
      orderStatus,
      page,
    });

    dispatch(updateOrders(data));
    setLoadingOrders(false);

    setOrdersStats(data?.orderStatsNumbers);
  };

  useEffect(() => {
    document.title = 'Suffy Water | Admin Dashboard';
    getAllOrders();
  }, [page, orderStatus]);
  // +===========================

  const getSingleOrder = async (id) => {
    dispatch(
      toggleOrderAlert({
        alert: true,
        message: 'Fetching order information...',
      })
    );
    const result = await getSingleOrderMutation(id);
    if (result.data) {
      dispatch(
        updateSingleOrder({
          isShown: true,
          order: result?.data?.order,
        })
      );
      dispatch(
        toggleOrderAlert({
          alert: false,
          message: '',
        })
      );
    } else {
      dispatch(
        toggleOrderAlert({
          alert: false,
          message: '',
        })
      );
      console.log('error occurred');
    }
  };

  return (
    <div className="admin--page--content">
      {orderAlert.alert && <FetchingSingleOrderInformationAlert />}
      {loadingOrders ? (
        <PreloaderLarge />
      ) : showSearchOrderById ? (
        <SearchOrderWithID />
      ) : !singleOrder.isShown ? (
        <>
          {orders?.orders?.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '10rem',
              }}
            >
              <h3>Sorry No {orderStatus} orders</h3>
            </div>
          ) : (
            <>
              {orderStatus === '' && <OrderStats ordersStats={ordersStats} />}
              <OrdersTable orders={orders} getSingleOrder={getSingleOrder} />
            </>
          )}
        </>
      ) : (
        <SingleOrder getAllOrders={getAllOrders} />
      )}

      {orders?.totalOrders <= 20 || (!singleOrder.isShown && <Pagination />)}
    </div>
  );
};

export default AdminPageContent;
